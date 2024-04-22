/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useState } from "react";
import { Settings, ReceiveMessage, SendMessage } from "./message";

/**
 * Returns the data of the last message received,
 * or `null` if no message has been sent yet.
 *
 * Component rerenders on receiving a new message.
 *
 * @param typeFilter The type of messages to listen for.
 */
function useMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(typeFilter: TFilter): TData | null {
  const [message, setMessage] = useState<TData | null>(null);

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

  return message;
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
 */
export function useGraphData() {
  return useMessage("GraphData");
}

/**
 * Returns the data of the last message containing machine learning data
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 */
export function useMLData() {
  return useMessage("MLData");
}

/**
 * Returns the data of the last message containing visualization settings
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 *
 * Should only be used for the visualization component.
 */
export function useSettingsData<T extends Settings>(): T | null {
  return useMessage("Settings");
}

/**
 * Returns the currently used settings and a function to update the used settings.
 *
 * Should only be used for the settings component.
 *
 * @returns The current settings, and a function to update them.
 */
export function useSettings<T extends Settings>(): readonly [
  T | null,
  UpdateFunction<T>
] {
  const settingsData = useSettingsData<T>();
  const sendSettings: UpdateFunction<T> = changes =>
    sendMessage({
      type: "Settings",
      data: changes
    });

  return [settingsData, sendSettings];
}

/**
 * A function to to send an update to an object.
 */
export type UpdateFunction<T> = (changes: Partial<T>) => void;

/** Returns the data of the last message containing the schema graph
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 * 
 * @returns A `SchemaGraph` containing the schema of the currently selected data.
 */
export function useSchema() {
  return useMessage("Schema");
}
