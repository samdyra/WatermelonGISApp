export const WORDING_TUTORIAL = {
  ADD_LAYER:
    'This is a list of all the layers you have added to the map. In the meantime, you can only upload features in GEOJSON format, and on the WGS84 projection (EPSG: 4326). The features uploaded will be saved on your account.',
  REMOTE_DATA: 'This is a list of all the some data which is available to you.',
  ANALYSIS_TOOLS: 'This is a list of all the GIS analysis tools you can use.',
  BASEMAP_OPTIONS: 'This is a list of all the basemaps you can use.',
};

export const VERTICAL_DATUM_OPTIONS = [
  { text: 'Mean Low Water Springs', value: 1 },
  { text: 'Mean Lower Low Water Springs', value: 2 },
  { text: 'Mean Sea Level', value: 3 },
  { text: 'Lowest Low Water', value: 4 },
  { text: 'Mean Low Water', value: 5 },
  { text: 'Lowest Low Water Springs', value: 6 },
  { text: 'Approximate Mean Low Water Springs', value: 7 },
  { text: 'Indian Spring Low Water', value: 8 },
  { text: 'Low Water Springs', value: 9 },
  { text: 'Approximate Lowest Adtonomical Tide', value: 10 },
  { text: 'Nearly Lowest Low Water', value: 11 },
  { text: 'Mean Lower Low Water', value: 12 },
  { text: 'Low Water', value: 13 },
  { text: 'Approximate Mean Low Water', value: 14 },
  { text: 'Approximate Mean Lower Low Water', value: 15 },
  { text: 'Mean High Water', value: 16 },
  { text: 'Mean High Water Springs', value: 17 },
  { text: 'High Water', value: 18 },
  { text: 'Approximate Mean Sea Level', value: 19 },
  { text: 'High Water Springs', value: 20 },
  { text: 'Mean Higher High Water', value: 21 },
  { text: 'Equinoctial Spring Low Water', value: 22 },
  { text: 'Lowest Adtonomical Tide', value: 23 },
  { text: 'Local Datum', value: 24 },
  { text: 'International Great Lakes Datum 1985', value: 25 },
  { text: 'Mean Water Level', value: 26 },
  { text: 'Lower Low Water Large Tide', value: 27 },
  { text: 'Higher High Water Large Tide', value: 28 },
  { text: 'Nearly Highest High Water', value: 29 },
  { text: 'Highest Adtonomical Tide', value: 30 },
];

export const DATA_CODING_FORMAT_OPTIONS = [
  { text: 'Time series at fixed stations', value: 1 },
  { text: 'Regularly-gridded arrays', value: 2 },
  { text: 'Ungeorectified gridded arrays', value: 3 },
  { text: 'Moving platform', value: 4 },
  { text: 'Irregular grid', value: 5 },
  { text: 'Variable cell size', value: 6 },
  { text: 'TIN', value: 7 },
];

export const COMMON_POINT_RULE_OPTIONS = [
  { text: 'Average', value: 1 },
  { text: 'Low', value: 2 },
  { text: 'High', value: 3 },
  { text: 'All', value: 4 },
];

export const INTERPOLATION_TYPE_OPTIONS = [
  { text: 'Basic Weighted Mean', value: 1 },
  { text: 'Shoalest Depth', value: 2 },
  { text: 'TPU Weighted Mean', value: 3 },
  { text: 'Cube', value: 4 },
  { text: 'Nearest Neighbour', value: 5 },
  { text: 'Natural Neighbour', value: 6 },
  { text: 'Polynomial Tendency', value: 7 },
  { text: 'Spline', value: 8 },
  { text: 'Kriging', value: 9 },
];

export const SEQUENCING_RULE_TYPE_OPTIONS = [
  { text: 'Linear', value: 1 },
  { text: 'Boudtophedonic', value: 2 },
  { text: 'Cantor Diagonal', value: 3 },
  { text: 'Spiral', value: 4 },
  { text: 'Morton', value: 5 },
  { text: 'Hilbert', value: 6 },
];

export const GRIDDING_METHOD_OPTIONS = [
  { text: 'Nearest Neighbor', value: 1 },
  { text: 'Linear', value: 2 },
  { text: 'Quadratic', value: 3 },
  { text: 'Cubic', value: 4 },
  { text: 'Bilinear', value: 5 },
  { text: 'Biquadratic', value: 6 },
  { text: 'Bicubic', value: 7 },
  { text: 'Lost Area', value: 8 },
  { text: 'Barycentric', value: 9 },
  { text: 'Discrete', value: 10 },
];

export const IHO102 = [
  {
    text: 'Vertical Datum',
    key: 'vertical_datum_dt_type',
    value: VERTICAL_DATUM_OPTIONS,
    desc: 'Vertical datum is a reference surface for vertical positions.',
  },
  {
    text: 'Data Coding Format',
    key: 'data_coding_format_dt_type',
    value: DATA_CODING_FORMAT_OPTIONS,
    desc: 'Data coding format is a method used to encode data in a specific format. This is used to ensure that the data is readable.',
  },
  {
    text: 'Common Point Rule',
    key: 'common_point_rule_dt_type',
    value: COMMON_POINT_RULE_OPTIONS,
    desc: 'Common Point Rule: The common point rule is a standard used to ensure consistency and accuracy of data within hydrographic information systems.',
  },
  {
    text: 'Interpolation Type Datum',
    key: 'interpolation_type_dt_type',
    value: INTERPOLATION_TYPE_OPTIONS,
    desc: 'Interpolation type is a method used to calculate the values of data between known points.',
  },
  {
    text: 'Sequencing Rule Type',
    key: 'sequencing_rule_type_dt_type',
    value: SEQUENCING_RULE_TYPE_OPTIONS,
    desc: 'Sequencing rule is used to assign labels or numbers to each data with the aim of creating an organized identification.',
  },
];

export const inputNames = [
  { text: 'Epoch', key: 'epoch', desc: 'The date and time of the data collected' },
  { text: 'Location Name', key: 'geographicIdentifier', desc: 'The name of the location' },
  { text: 'Issue Date', key: 'issueDate', desc: 'The date the data was issued' },
  { text: 'Issue Time', key: 'issueTime', desc: 'The time the data was issued' },
  { text: 'File Name', key: 'file_name', desc: 'The name of the file' },
];
