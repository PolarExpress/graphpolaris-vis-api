/*
Contains types from GraphPolaris frontend-v2.
TODO: use a shared library instead.
*/

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

export type DimensionType =
  | "categorical"
  | "numerical"
  | "temporal"
  | "spatial";

export type NodeAttributes = { [key: string]: unknown };

export type ML = {
  [MLTypesEnum.LINK_PREDICTION]: MLInstance<LinkPredictionInstance[]>;
  [MLTypesEnum.CENTRALITY]: MLInstance<Record<string, number>>;
  [MLTypesEnum.COMMUNITY_DETECTION]: CommunityDetection;
  [MLTypesEnum.SHORTEST_PATH]: ShortestPath;
};

export enum MLTypesEnum {
  CENTRALITY = "centrality",
  LINK_PREDICTION = "linkPrediction",
  COMMUNITY_DETECTION = "communityDetection",
  SHORTEST_PATH = "shortestPath"
}

export type MLInstance<T> = {
  enabled: boolean;
  result: T;
};

export type LinkPredictionInstance = {
  attributes: { jaccard_coefficient: number };
  from: string;
  to: string;
  id: string;
};

export type CommunityDetectionInstance = string[]; // set of ids

export type CommunityDetection = MLInstance<CommunityDetectionInstance[]> & {
  jaccard_threshold: number;
};

export type ShortestPath = {
  enabled: boolean;
  result: any;
  srcNode?: string;
  trtNode?: string;
};
