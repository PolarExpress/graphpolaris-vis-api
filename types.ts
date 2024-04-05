interface BaseMessage {
  /** A unique string determining the type of the message. */
  type: string,
  /** The data sent with the message. */
  data: object
}

/** A message containing the result from the graph query. */
export interface GraphMessage extends BaseMessage {
  type: "GraphData"
  data: GraphQueryResult
}

export interface MLMessage extends BaseMessage {
  type: "MLData",
  data: ML
}

/**
 * A generic message.
 * 
 */
export type Message = GraphMessage | MLMessage;

export interface GraphQueryResult {
  metaData: GraphMetaData;
  nodes: Node[];
  edges: Edge[];
  queryingBackend: boolean;
}

export interface Node {
  id: string;
  label: string;
  attributes: NodeAttributes;
  mldata?: any; // FIXME
  /* type: string[]; */
}
export interface Edge {
  attributes: NodeAttributes;
  from: string;
  to: string;
  id: string;
  label: string;
  /* type: string; */
}

export type GraphMetaData = {
  nodes: CompressedElement;
  edges: CompressedElement;
};  

export type CompressedElement = {
  count?: number;
  labels: string[];
  types: {
    [label: string]: {
      count: number;
      avgDegreeIn?: number;
      avgDegreeOut?: number;
      attributes: {
        [id: string]: {
          dimension: DimensionType;
          values?: any[];
          statistics?: any;
        };
      };
    };
  };
};

export type DimensionType = 'categorical' | 'numerical' | 'temporal' | 'spatial';

export type NodeAttributes = { [key: string]: unknown };

export type ML = {
  [MLTypesEnum.LINK_PREDICTION]: MLInstance<LinkPredictionInstance[]>;
  [MLTypesEnum.CENTRALITY]: MLInstance<Record<string, number>>;
  [MLTypesEnum.COMMUNITY_DETECTION]: CommunityDetection;
  [MLTypesEnum.SHORTEST_PATH]: ShortestPath;
};