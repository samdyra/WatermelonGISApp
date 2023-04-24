import LatLngTuple = L.LatLngTuple;

export interface GeoJson {
  type: string;
  features: {
    type: string;
    color: string;
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
[];

export interface stats {
  points: [number, number][];
  equation: [number, number];
  r2: number;
  string: string;
}
