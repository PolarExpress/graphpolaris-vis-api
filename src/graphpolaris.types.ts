/* eslint-disable custom/enforce-copyright-comment -- Not our code. */

/*
Contains types from GraphPolaris frontend-v2.
TODO: use a shared library instead.
*/

// ------------------------------------
// Data
// ------------------------------------

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

// ------------------------------------
// Machine Learning
// ------------------------------------

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

// ------------------------------------
// Settings
// ------------------------------------

type SliderProps = {
  label: string;
  type: "slider";
  value: number;
  min: number;
  max: number;
  step: number;
  showValue?: boolean;
  unit?: string;
  tooltip?: string;
  onChange?: (value: number) => void;
};

type TextProps = {
  label: string;
  type: "text";
  placeholder?: string;
  value: string;
  required?: boolean;
  errorText?: string;
  visible?: boolean;
  disabled?: boolean;
  tooltip?: string;
  info?: string;
  validate?: (value: any) => boolean;
  onChange?: (value: string) => void;
};

type CheckboxProps = {
  label?: string;
  type: "checkbox";
  options: Array<string>;
  value: Array<string>;
  tooltip?: string;
  onChange?: (value: Array<string>) => void;
};

type BooleanProps = {
  label: string;
  type: "boolean";
  options?: any;
  value: boolean;
  tooltip?: string;
  onChange?: (value: boolean) => void;
};

type RadioProps = {
  label?: string;
  type: "radio";
  options: Array<string>;
  value: string;
  tooltip?: string;
  onChange?: (value: string) => void;
};

type DropdownProps = {
  label?: string;
  value: string | number | undefined;
  type: "dropdown";
  options: any;
  tooltip?: string;
  onChange?: (value: string | number) => void;
  required?: boolean;
  info?: string;
  disabled?: boolean;
};

export type InputProps =
  | TextProps
  | SliderProps
  | CheckboxProps
  | DropdownProps
  | RadioProps
  | BooleanProps;

export type Setting = InputProps & {
  condition?: (config: Record<string, any>) => boolean;
  description?: string;
};

export type SettingTypes = { [id: string]: Setting };

export type SettingProps = { [K in keyof SettingTypes]: any };
