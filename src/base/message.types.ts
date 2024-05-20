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
   * A unique string determining the type of the message.
   */
  type: string;
  /**
   * The data sent with the message.
   */
  data: unknown;
}

/**
 * A message containing the result from the graph query.
 *
 * @internal
 */
export interface GraphMessage extends BaseMessage {
  type: "GraphData";
  data: GraphQueryResult;
}

/**
 * A message containing the results from machine learning algorithms.
 *
 * @internal
 */
export interface MLMessage extends BaseMessage {
  type: "MLData";
  data: ML;
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
 * A message that is sent from the frontend to request the default config. The
 * response should be a {@link SettingsMessage}.
 *
 * @internal
 */
export interface SettingsRequestMessage extends BaseMessage {
  type: "SettingsRequest";
  data: undefined;
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
  | SettingsMessage
  | SettingsRequestMessage;

/**
 * The types of messages that an add-on can send.
 *
 * @internal
 */
export type SendMessage = SettingsMessage;
