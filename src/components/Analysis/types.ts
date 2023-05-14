import {
  type Feature,
  type Point,
  type Properties,
  type BBox,
  type LineString,
  type GeometryCollection,
  type Geometry,
} from '@turf/helpers';
import LatLngTuple = L.LatLngTuple;
import type regression from 'regression';

export interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: LatLngTuple | LatLngTuple[][] | LatLngTuple[][][];
    };
    properties: object;
  }[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  name?: string;
  color: string;
  id: string;
}
export interface ITurf {
  name: string;
  type: 'FeatureCollection';
  features:
    | Feature<Point, Properties>[]
    | Feature<LineString, Properties>[]
    | Feature<Geometry | GeometryCollection, Properties>[];
  bbox?: BBox | undefined;
}

export interface GeoJsonRegression {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: LatLngTuple | LatLngTuple[][] | LatLngTuple[][][];
    };
    properties: {
      [key: string]: string | number;
    };
  }[];
  color: string;
  id: string;
}

export interface IStats {
  name: string;
  result: regression.Result;
}

export const MEAN_SPATIAL_METHOD = 'Mean Spatial';
export const WEIGHTED_MEAN_SPATIAL_METHOD = 'Weighted Mean Spatial';
export const MEAN_SPATIAL_CODE = 'MeanSpatial';
export const WEIGHTED_MEAN_SPATIAL_CODE = 'WeightedMean';
export const CLIP_METHOD = 'Clip Feature';
export const CLIP_CODE = 'Clipped';
export const REPROJECT_METHOD = 'Reproject Feature';
export const REPROJECT_CODE = 'Reprojected';
export const REGRESSION_METHOD = 'Simple Linear Regression';
export const REGRESSION_CODE = 'Regression';
export const DIRECTION_METHOD = 'Direction Automation Module';
export const DIRECTION_CODE = 'Direction-Point';
export const DIRECTION_CODE_LINE = 'Direction-Line';
export const DIRECTION_CODE_STATS = 'Direction-Stats';
export const STATS_CODE = 'Stats-Regression';
export const REGRESSION_MODULE_METHOD = 'Regression Automation Module';
export const REGRESSION_MODULE_CODE = 'Regression-Module';
export const WEIGHTED_DIRECTION_METHOD = 'Weighted Direction Module';
export const WEIGHTED_DIRECTION_CODE = 'Weighted-Direction-Module';

export const AnalysisOptions = [
  {
    name: MEAN_SPATIAL_METHOD,
    code: MEAN_SPATIAL_CODE,
    beta: false,
    position: '30px',
  },
  {
    name: WEIGHTED_MEAN_SPATIAL_METHOD,
    code: WEIGHTED_MEAN_SPATIAL_CODE,
    beta: false,
    position: '60px',
  },
  {
    name: CLIP_METHOD,
    code: CLIP_CODE,
    beta: false,
    position: '90px',
  },
  // {
  //   name: REPROJECT_METHOD,
  //   code: REPROJECT_CODE,
  //   beta: true,
  //   position: '120px',
  // },
  {
    name: REGRESSION_METHOD,
    code: REGRESSION_CODE,
    beta: false,
    position: '150px',
  },
  {
    name: DIRECTION_METHOD,
    code: DIRECTION_CODE,
    beta: false,
    position: '180px',
  },
  {
    name: REGRESSION_MODULE_METHOD,
    code: REGRESSION_MODULE_CODE,
    beta: false,
    position: '210px',
  },
  {
    name: WEIGHTED_DIRECTION_METHOD,
    code: WEIGHTED_DIRECTION_CODE,
    beta: false,
    position: '240px',
  },
];
