/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type {
  GraphQueryResult,
  ML,
  SchemaGraph
} from "./graphpolaris.types";

/**
 * @internal
 */
interface BaseMessage {
  /** A unique string determining the type of the message. */
  type: string;
  /** The data sent with the message. */
  data: unknown;
}

/**
 * A message containing the result from the graph query.
 * @internal
 */
export interface GraphMessage extends BaseMessage {
  type: "GraphData";
  data: GraphQueryResult;
}

/**
 * A message containing the results from machine learning algorithms.
 * @internal
 */
export interface MLMessage extends BaseMessage {
  type: "MLData";
  data: ML;
}

/**
 * A message containing visualization settings.
 * @internal
 */
export interface SettingsMessage extends BaseMessage {
  type: "Settings";
  data: Settings;
}

/**
 * A message containing the schema graph.
 * @internal
 */
export interface SchemaMessage extends BaseMessage {
  type: "Schema";
  data: SchemaGraph;
}

/**
 * The types of messages that an add-on can receive.
 * @internal
 */
export type ReceiveMessage = GraphMessage | MLMessage | SettingsMessage | SchemaMessage;

/**
 * The types of messages that an add-on can send.
 * @internal
 */
export type SendMessage = SettingsMessage;

/**
 * The type that configurations must adhere to. The keys must be strings and the values can be any JS objects that can be cloned by {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm structuredClone()}.
 * @see {@link useSettings}, {@link useSettingsData}
 * 
 * @category Settings
 */
export type Settings = Record<string, unknown>;
