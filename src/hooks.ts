/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useMemo, useState, useContext, createContext } from "react";
import { Settings, ReceiveMessage, SendMessage } from "./message";

/**
 * The context for providing the window object to the hooks.
 * @category React context
 */
export const WindowContext = createContext<Window>(window);

/**
 * Returns the data of the last message received,
 * or `null` if no message has been sent yet.
 *
 * Component rerenders on receiving a new message.
 * 
 * @category React hooks
 *
 * @param typeFilter The type of messages to listen for.
 * @internal
 */
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"],
>(typeFilter: TFilter) : TData | undefined;
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"],
>(typeFilter: TFilter, start: TData) : TData;
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"],
>(typeFilter: TFilter, start?: TData) {
  const window = useContext(WindowContext);
  const [message, setMessage] = useState(start);

  function updateMessage(e: MessageEvent<ReceiveMessage>) {
    const data = e.data;

    if (data.type === typeFilter) {
      setMessage(data.data as TData);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps -- dependency cannot change */
  useEffect(() => {
    window.addEventListener("message", updateMessage);
    return () => window.removeEventListener("message", updateMessage);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return useMemo(() => message, [message]);
}

/**
 * Sends a message to the parent window.
 */
function sendMessage(message: SendMessage) {
  window.top?.postMessage(message, "*");
}

/**
 * Returns the data of the last message containing graph data.
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 * 
 * @category React hooks
 */
export function useGraphData() {
  return useMessage("GraphData");
}

/**
 * Returns the data of the last message containing machine learning data
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 * 
 * @category React hooks
 */
export function useMLData() {
  return useMessage("MLData");
}

/**
 * A react hook that fetches the configuration for this addon's instance from the GraphPolaris session. Component rerenders on receiving a new configuration.
 * 
 * @remarks
 * This hook should only be used for the visualization component. For setting components use the {@link useSettings} hook that can also push a new configuration to GraphPolaris.
 * 
 * @example
 * ```tsx
 * type VisSettings = { theme: "dark" | "light" };
 * export default function Visualisation() {
 *   const { theme } = useSettingsData<VisSettings>();
 *   return (<div className={`theme-${theme}`}>...</div>);
 * }
 * ```
 *
 * @template T
 * The type of the configuration which must adhere to the configuration requirements.
 * 
 * @returns
 * Returns the last message containing visualization settings
 * that has been sent, or `null` if no configuration has yet been sent.
 * 
 * @category React hooks
 * @category Settings
 */
export function useSettingsData<T extends Settings>(): T | undefined {
  return useMessage("Settings");
}

/**
 * Returns the currently used settings and a function to update the used settings.
 *
 * @remarks
 * This hook should only be used for the settings component. The update function's messages are ignored by GraphPorlaris if it is called from the visualisation component, use the {@link useSettingsData} hook instead.
 * 
 * @example
 * ```tsx
 * type VisSettings = { theme: "dark" | "light" };
 * export default function Settings() {
 *   const [config, updateConfig] = useSettings<VisSettings>({ theme: "dark" });
 *   return (<>
 *     <label htmlFor="theme">Dark theme:</label>
 *     <input
 *       id="theme"
 *       type="checkbox"
 *       value={config.theme === "dark"}
 *       onChange={e => updateConfig({ theme: e.target.value ? "dark" : "light" })} />
 *   </>);
 * }
 * ```
 * 
 * @category React hooks
 * @category Settings
 * 
 * @template T
 * The type of the configuration which must adhere to the configuration requirements.
 *
 * @param start
 * The default configuration to start with. This configuration is shown when there is no existing configuration found in the user's save state, for instance when on the first ever install of the addon.
 * @returns
 * The current settings, and a function to update them. The function accepts a partial version of the settings, and GraphPolaris will merge the current configuration with the partially sent configuration.
 */
export function useSettings<T extends Settings>(
  start: T
): readonly [T, UpdateFunction<T>] {
  const settingsData = useMessage("Settings", start);
  const sendSettings: UpdateFunction<T> = changes =>
    sendMessage({
      type: "Settings",
      data: changes
    });

  useEffect(() => {
    sendSettings(start);
  }, [start]);

  return [settingsData, sendSettings];
}

/**
 * A function to send an update to the visualisation's configuration.
 * @see {@link useSettings}
 * @category Settings
 */
export type UpdateFunction<T> = (changes: Partial<T>) => void;

/** Returns the data of the last message containing the schema graph
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 * 
 * @category React hooks
 *
 * @returns A `SchemaGraph` containing the schema of the currently selected data.
 */
export function useSchema() {
  return useMessage("Schema");
}
