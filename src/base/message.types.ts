/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { GraphQueryResult, ML, SchemaGraph, Settings } from ".";

/**
 * The base message type for all messages.
 */
interface BaseMessage {
  /**
   * The data sent with the message.
   */
  data: unknown;
  /**
   * A unique string determining the type of the message.
   */
  type: string;
}

/**
 * A message containing the result from the graph query.
 *
 * @internal
 */
export interface GraphMessage extends BaseMessage {
  data: GraphQueryResult;
  type: "GraphData";
}

/**
 * A message containing the results from machine learning algorithms.
 *
 * @internal
 */
export interface MLMessage extends BaseMessage {
  data: ML;
  type: "MLData";
}

/**
 * A message containing visualization settings.
 *
 * @internal
 */
export interface SettingsMessage extends BaseMessage {
  data: Settings;
  type: "Settings";
}

/**
 * A message containing the schema graph.
 *
 * @internal
 */
export interface SchemaMessage extends BaseMessage {
  data: SchemaGraph;
  type: "Schema";
}

/**
 * The types of messages that an add-on can receive.
 *
 * @internal
 */
export type ReceiveMessage =
  | GraphMessage
  | MLMessage
  | SchemaMessage
  | SettingsMessage;

/**
 * The types of messages that an add-on can send.
 *
 * @internal
 */
export type SendMessage = SettingsMessage;
