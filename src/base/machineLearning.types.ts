/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

export enum MLTypesEnum {
  CENTRALITY = "centrality",
  LINK_PREDICTION = "linkPrediction",
  COMMUNITY_DETECTION = "communityDetection",
  SHORTEST_PATH = "shortestPath"
}

export type ML = {
  [MLTypesEnum.LINK_PREDICTION]: MLInstance<LinkPredictionInstance[]>;
  [MLTypesEnum.CENTRALITY]: MLInstance<Record<string, number>>;
  [MLTypesEnum.COMMUNITY_DETECTION]: CommunityDetection;
  [MLTypesEnum.SHORTEST_PATH]: ShortestPath;
};

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
