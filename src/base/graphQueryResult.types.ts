/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

/**
 * The raw graph data from the query.
 *
 * @category Graph data.
 */
export interface GraphQueryResult {
  /**
   * Lists all the edges in the graph.
   */
  edges: Edge[];
  /**
   * Metadata about the graph.
   */
  metaData: GraphMetaData;
  /**
   * Lists all the nodes in the graph.
   */
  nodes: Node[];
  /**
   * Whether or not the operation of querying for graph data is still in
   * progress.
   */
  queryingBackend: boolean;
}

/**
 * A single node inside a graph.
 *
 * @category Graph data.
 */
export interface Node {
  /**
   * Additional attributes associated with the node.
   */
  attributes: Record<string, unknown>;
  /**
   * The ID of the node. Unique within the graph it is contained in.
   */
  id: string;
  // TODO: document.
  label: string;
  // TODO: document.
  mldata?: any; // FIXME
  /* type: string[]; */
}

/**
 * A single edge inside a graph.
 */
export interface Edge {
  /**
   * Additional attributes associated with the edge.
   */
  attributes: Record<string, unknown>;
  /**
   * The ID of the source node of the edge. Refers to {@link Node.id} of a node
   * within the graph.
   */
  from: string;
  /**
   * The ID of the edge. Unique within the graph.
   */
  id: string;
  // TODO: document.
  label: string;
  /**
   * The ID of the target node of the edge. Refers to {@link Node.id} of a node
   * within the graph.
   */
  to: string;
  /* type: string; */
}

/**
 * Metadata associated with a graph.
 *
 * @category Graph data.
 */
export type GraphMetaData = {
  /**
   * Metadata about the edges in the graph.
   *
   * @see {@link GraphQueryResult.edges}
   */
  edges: CompressedElement;
  /**
   * Metadata about the nodes in the graph.
   *
   * @see {@link GraphQueryResult.nodes}
   */
  nodes: CompressedElement;
};

/**
 * Contains metadata about either nodes or edges.
 *
 * @category Graph data.
 */
// FIXME: make better different types for nodes and edges.
export type CompressedElement = {
  /**
   * The number of elements in the graph.
   */
  count?: number;
  /**
   * All unique labels present on the elements.
   */
  // TODO: check if unique or not.
  labels: string[];
  /**
   * Metadata associated with each different label.
   */
  types: Record<string, ElementTypeMetadata>;
};

/**
 * Metadata associated with a group of elements.
 *
 * @category Graph data.
 */
export interface ElementTypeMetadata {
  /**
   * Additional attributes associated with the elements.
   */
  attributes: Record<string, ElementTypeAttributes>;
  /**
   * The average in-degree of elements with this label, if applicable.
   */
  avgDegreeIn?: number;
  /**
   * The average out-degree of elements with this label, if applicable.
   */
  avgDegreeOut?: number;
  /**
   * The number of elements with this label.
   */
  count: number;
}

/**
 * Attributes associated with a group of elements.
 *
 * @category Graph data.
 */
export interface ElementTypeAttributes {
  /**
   * The type of the attribute.
   */
  dimension: DimensionType;
  /**
   * The statistics associated with the attribute, if applicable.
   */
  statistics?: unknown;
  /**
   * The values of the attribute, associated with this label, if applicable.
   */
  values?: unknown[];
}

/**
 * The type of an attribute.
 *
 * @category Graph data.
 */
export type DimensionType =
  | "categorical"
  | "numerical"
  | "spatial"
  | "temporal";
