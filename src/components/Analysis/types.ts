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