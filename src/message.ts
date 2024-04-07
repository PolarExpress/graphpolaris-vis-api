import type { GraphQueryResult, ML } from "./graphpolaris.types";

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

/**
 * The types of messages that an add-on can receive.
 */
export type Message = GraphMessage | MLMessage;
