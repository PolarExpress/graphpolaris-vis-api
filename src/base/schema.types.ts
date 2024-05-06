/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

import type {
  Attributes as GAttributes,
  SerializedGraph
} from "graphology-types";

import { DimensionType } from "./graphQueryResult.types";

/**
 * A node inside a schema graph.
 *
 * @category Schema data.
 */
export type SchemaGraphologyNode = GAttributes & SchemaNode;
/**
 * An edge inside a schema graph.
 *
 * @category Schema data.
 */
export type SchemaGraphologyEdge = GAttributes;

/**
 * A graph containing the database schema.
 *
 * @category Schema data.
 */
export type SchemaGraph = SerializedGraph<
  SchemaGraphologyNode,
  SchemaGraphologyEdge,
  GAttributes
>;

/**
 * The possible attribute types for a schema.
 *
 * @category Schema data.
 */
export type SchemaAttributeTypes =
  | "bool"
  | "date"
  | "datetime"
  | "duration"
  | "float"
  | "int"
  | "string"
  | "time";

/**
 * A single attribute on a node in a schema graph.
 *
 * @category Schema data.
 */
export type SchemaAttribute = {
  /**
   * The dimension of the attribute, if applicable.
   */
  dimension?: DimensionType;
  /**
   * The name of the attribute.
   */
  name: string;
  /**
   * The type of the attribute.
   */
  type: SchemaAttributeTypes;
};

/**
 * A basic node inside a schema graph.
 *
 * @category Schema data.
 */
export type SchemaNode = {
  /**
   * A list of attributes of the node.
   */
  attributes: SchemaAttribute[];
  /**
   * The name of the node.
   */
  name: string;
  /**
   * The type of the node, if applicable.
   */
  type?: string;
};
