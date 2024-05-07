/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useMemo, useState, useContext, createContext } from "react";
import type { ReceiveMessage } from "../internal";
import {
  type ML,
  type SchemaGraph,
  type GraphQueryResult,
  receiveMessage,
  sendMessage,
  type Settings
} from "../base";

/**
 * The context for providing the window object to the hooks and components.
 *
 * @remarks
 *   The `windowContext` is used to provide the correct `window` object to the
 *   hooks and components in the `vis-api` package. It allows the hooks and
 *   components to access the `window` object of the frame or environment in
 *   which they are being rendered.
 *
 *   By default, the `windowContext` is set to the global `window` object.
 *   However, in certain scenarios, such as when using the `vis-api` package
 *   within a Storybook environment or an iframe, the global `window` object may
 *   not be the correct one to use for message communication or other
 *   window-related operations.
 *
 *   In such cases, the `windowContext` can be set to the appropriate `window`
 *   object using the `windowContext.Provider` component. This ensures that the
 *   hooks and components in the `vis-api` package have access to the correct
 *   `window` object for their environment.
 *
 * @example
 *   import { windowContext } from '@graphpolaris/vis-api';
 *
 *   function MyComponent() {
 *     const window = useContext(windowContext);
 *     // Use the window object from the context
 *     // ...
 *   }
 *
 *   function App() {
 *     return (
 *       <windowContext.Provider value={iframe.contentWindow}>
 *         <MyComponent />
 *       </windowContext.Provider>
 *     );
 *   };
 *
 * @category React hooks
 *
 * @internal
 */
export const windowContext = createContext<Window>(window);

/**
 * Returns the data of the last message received, or `undefined` if no message
 * has been sent yet.
 *
 * Component rerenders on receiving a new message.
 *
 * @param typeFilter The type of messages to listen for.
 *
 * @category React hooks
 *
 * @internal
 */
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(typeFilter: TFilter): TData | undefined;

/**
 * Returns the data of the last message received, or the the default value.
 *
 * Component rerenders on receiving a new message.
 *
 * @param typeFilter   The type of messages to listen for.
 * @param defaultValue The standard value for the state.
 *
 * @category React hooks
 *
 * @internal
 */
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(typeFilter: TFilter, defaultValue: TData): TData;

function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(typeFilter: TFilter, defaultValue?: TData) {
  const window = useContext(windowContext);
  const [message, setMessage] = useState(defaultValue);

  const updateMessage = (data: TData) => setMessage(data);

  /* eslint-disable -- dependency cannot change */
  useEffect(() => {
    return receiveMessage(typeFilter, updateMessage as any, window);
  }, []);
  /* eslint-enable */

  return useMemo(() => message, [message]);
}

/**
 * Returns the data of the last message containing graph data. that has been
 * sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 *
 * @category React hooks
 */
export function useGraphData(): GraphQueryResult | undefined {
  return useMessage("GraphData");
}

/**
 * Returns the data of the last message containing machine learning data that
 * has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 *
 * @category React hooks
 */
export function useMLData(): ML | undefined {
  return useMessage("MLData");
}

/**
 * A react hook that fetches the configuration for this addon's instance from
 * the GraphPolaris session. Component rerenders on receiving a new
 * configuration.
 *
 * @remarks
 *   This hook should only be used for the visualization component. For setting
 *   components use the {@link useSettings} hook that can also push a new
 *   configuration to GraphPolaris.
 *
 * @example
 *   type VisSettings = { theme: "dark" | "light" };
 *   export default function Visualisation() {
 *     const { theme } = useSettingsData<VisSettings>();
 *     return (<div className={`theme-${theme}`}>...</div>);
 *   };
 *
 * @template T The type of the configuration which must adhere to the
 *   configuration requirements.
 *
 * @returns Returns the last message containing visualization settings that has
 *   been sent, or `null` if no configuration has yet been sent.
 *
 * @category React hooks
 * @category Settings
 */
export function useSettingsData<T extends Settings>(): T | undefined {
  return useMessage("Settings");
}

/**
 * Returns the currently used settings and a function to update the used
 * settings.
 *
 * @remarks
 *   This hook should only be used for the settings component. The update
 *   function's messages are ignored by GraphPorlaris if it is called from the
 *   visualisation component, use the {@link useSettingsData} hook instead.
 *
 * @example
 *   type VisSettings = { theme: "dark" | "light" };
 *   export default function Settings() {
 *     const [config, updateConfig] = useSettings<VisSettings>({ theme: "dark" });
 *     return (<>
 *       <label htmlFor="theme">Dark theme:</label>
 *       <input
 *         id="theme"
 *         type="checkbox"
 *         value={config.theme === "dark"}
 *         onChange={e => updateConfig({ theme: e.target.value ? "dark" : "light" })} />
 *     </>);
 *   };
 *
 * @template T The type of the configuration which must adhere to the
 *   configuration requirements.
 *
 * @param   defaultValue The default configuration to start with. This
 *   configuration is shown when there is no existing configuration found in the
 *   user's save state, for instance when on the first ever install of the
 *   addon.
 *
 * @returns              The current settings, and a function to update them.
 *   The function accepts a partial version of the settings, and GraphPolaris
 *   will merge the current configuration with the partially sent
 *   configuration.
 *
 * @category React hooks
 * @category Settings
 */
export function useSettings<T extends Settings>(
  defaultValue: T
): readonly [T, UpdateFunction<T>] {
  const settingsData = useMessage("Settings", defaultValue);
  const sendSettings: UpdateFunction<T> = changes =>
    sendMessage({
      data: changes,
      type: "Settings"
    });

  useEffect(() => {
    const unsubscribe = receiveMessage("SettingsRequest", () =>
      sendSettings(defaultValue)
    );
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- default configuration should not change, so we don't facilitate it
  }, []);

  return [settingsData, sendSettings];
}

/**
 * A function to send an update to the visualisation's configuration.
 *
 * @see {@link useSettings}
 *
 * @category Settings
 */
export type UpdateFunction<T> = (changes: Partial<T>) => void;

/**
 * Returns the data of the last message containing the schema graph that has
 * been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 *
 * @returns A `SchemaGraph` containing the schema of the currently selected
 *   data.
 *
 * @category React hooks
 */
export function useSchema(): SchemaGraph | undefined {
  return useMessage("Schema");
}
