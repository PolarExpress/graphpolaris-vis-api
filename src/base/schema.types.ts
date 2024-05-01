/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

import type {
  Attributes as GAttributes,
  SerializedGraph
} from "graphology-types";
import { DimensionType } from "./graphQueryResult.types";

export type SchemaGraphologyNode = GAttributes & SchemaNode;
export type SchemaGraphologyEdge = GAttributes;

export type SchemaGraph = SerializedGraph<
  SchemaGraphologyNode,
  SchemaGraphologyEdge,
  GAttributes
>;

export type SchemaAttributeTypes =
  | "string"
  | "float"
  | "int"
  | "bool"
  | "date"
  | "time"
  | "datetime"
  | "duration";

/** Attribute type, consist of a name */
export type SchemaAttribute = {
  name: string;
  type: SchemaAttributeTypes;
  dimension?: DimensionType;
};

/** Node type, consist of a name and a list of attributes */
export type SchemaNode = {
  name: string;
  attributes: SchemaAttribute[];
  type?: string;
};
