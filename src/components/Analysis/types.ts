import {
  type Feature, type Point, type Properties, type BBox 
} from "@turf/helpers";

export interface GeoJson {
    type: string;
    features: {
      type: string;
      geometry: {
        type: string;
        coordinates: number[];
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
  }
  
export interface ITurf {
    name: string;
    type: "FeatureCollection";
    features: Feature<Point, Properties>[];
    bbox?: BBox | undefined;
  }

export const MEAN_SPATIAL_METHOD = "Mean Spatial"
export const WEIGHTED_MEAN_SPATIAL_METHOD = "Weighted Mean Spatial"
export const MEAN_SPATIAL_CODE = "MeanSpatial"
export const WEIGHTED_MEAN_SPATIAL_CODE = "WeightedMean"

export const AnalysisOptions = [
  {
    name: MEAN_SPATIAL_METHOD, 
    code: MEAN_SPATIAL_CODE
  },
  {
    name: WEIGHTED_MEAN_SPATIAL_METHOD, 
    code: WEIGHTED_MEAN_SPATIAL_CODE
  },
];

