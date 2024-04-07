/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { GraphQueryResult, ML, SettingProps } from "./graphpolaris.types";

interface BaseMessage {
  /** A unique string determining the type of the message. */
  type: string;
  /** The data sent with the message. */
  data: object;
}

/** A message containing the result from the graph query. */
export interface GraphMessage extends BaseMessage {
  type: "GraphData";
  data: GraphQueryResult;
}

/** A message containing the results from machine learning algorithms. */
export interface MLMessage extends BaseMessage {
  type: "MLData";
  data: ML;
}

/** A message containing visualization settings. */
export interface SettingsMessage extends BaseMessage {
  type: "Settings";
  data: SettingProps;
}

/**
 * The types of messages that an add-on can receive.
 */
export type Message = GraphMessage | MLMessage | SettingsMessage;
