/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { GraphQueryResult, ML, SchemaGraph, Settings } from ".";
import type { ReceiveMessage, SendMessage } from "./message.types";

/**
 * Performs an action everytime a message of the specified type is received.
 *
 * @param typeFilter The type of messages to listen for.
 * @param callback The action to perform an receiving a message.
 *
 * @returns A function to unsubscribe from the message event listener.
 *
 * @internal
 * @category Message event listeners
 */
export function receiveMessage<
  TFilter extends ReceiveMessage["type"],
  TData extends Extract<ReceiveMessage, { type: TFilter }>["data"]
>(typeFilter: TFilter, callback: (data: TData) => void): () => void {
  function updateMessage(e: MessageEvent<ReceiveMessage>) {
    const data = e.data;

    if (data.type === typeFilter) callback(data.data as TData);
  }

  window.addEventListener("message", updateMessage);

  return () => window.removeEventListener("message", updateMessage);
}

/**
 * Performs an action everytime a message with graph data is received.
 *
 * @param callback The action to perform an receiving a message.
 *
 * @returns A function to unsubscribe from the message event listener.
 *
 * @category Message event listeners
 */
export function receiveGraphData(callback: (data: GraphQueryResult) => void) {
  return receiveMessage("GraphData", callback);
}

/**
 * Performs an action everytime a message with settings is received.
 *
 * @param callback The action to perform an receiving a message.
 *
 * @returns A function to unsubscribe from the message event listener.
 *
 * @category Message event listeners
 */
export function receiveSettings(callback: (data: Settings) => void) {
  return receiveMessage("Settings", callback);
}

/**
 * Performs an action everytime a message with a schema graph is received.
 *
 * @param callback The action to perform an receiving a message.
 *
 * @returns A function to unsubscribe from the message event listener.
 *
 * @category Message event listeners
 */
export function receiveSchema(callback: (data: SchemaGraph) => void) {
  return receiveMessage("Schema", callback);
}

/**
 * Performs an action everytime a message with machine learning data is received.
 *
 * @param callback The action to perform an receiving a message.
 *
 * @returns A function to unsubscribe from the message event listener.
 *
 * @category Message event listeners
 */
export function receiveMLData(callback: (data: ML) => void) {
  return receiveMessage("MLData", callback);
}

/**
 * Sends a message to the GraphPolaris frontend.
 *
 * @param message The message to send.
 *
 * @internal
 * @category Message event listeners
 */
export function sendMessage(message: SendMessage) {
  window.top?.postMessage(message, "*");
}

/**
 * Send a message with updated settings to the GraphPolaris frontend.
 *
 * @param settings The updated settings to send. Only the modified settings need to be sent.
 *
 * @category Message event listeners
 */
export function sendSettings(settings: Settings) {
  sendMessage({
    type: "Settings",
    data: settings
  });
}