/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

export enum MLTypesEnum {
  CENTRALITY = "centrality",
  COMMUNITY_DETECTION = "communityDetection",
  LINK_PREDICTION = "linkPrediction",
  SHORTEST_PATH = "shortestPath"
}

export type ML = {
  [MLTypesEnum.CENTRALITY]: MLInstance<Record<string, number>>;
  [MLTypesEnum.COMMUNITY_DETECTION]: CommunityDetection;
  [MLTypesEnum.LINK_PREDICTION]: MLInstance<LinkPredictionInstance[]>;
  [MLTypesEnum.SHORTEST_PATH]: ShortestPath;
};

export type MLInstance<T> = {
  enabled: boolean;
  result: T;
};

export type LinkPredictionInstance = {
  id: string;
  from: string;
  to: string;
  attributes: { jaccard_coefficient: number }; // eslint-disable-line @typescript-eslint/naming-convention
};

export type CommunityDetectionInstance = string[]; // set of ids

export type CommunityDetection = {
  jaccard_threshold: number; // eslint-disable-line @typescript-eslint/naming-convention
} & MLInstance<CommunityDetectionInstance[]>;

export type ShortestPath = {
  enabled: boolean;
  result: any;
  srcNode?: string;
  trtNode?: string;
};
