export interface Metadata {
  epoch: string;
  extent_type_code: boolean;
  file_name: string;
  geographicIdentifier: string;
  horizontalDatumValue: number;
  horizontalPositionUncertainty: number;
  issueDate: string;
  issueTime: string;
  metadata: string;
  methodCurrentsProduct: string;
  surfaceCurrentDepth: number;
  timeUncertainty: number;
  verticalCS: number;
  verticalUncertainty: number;
}

export interface FormatData {
  common_point_rule_dt_type: number;
  data_dynamicity_dt_type: number;
  interpolation_type_dt_type: number;
  sequencing_rule_type_dt_type: number;
}

export interface ApiContract111 {
  user_id: string;
  metadata: Metadata;
  format_data: FormatData;
  dataset_ncdf: string;
  current_speed_band_name: string;
  current_direction_band_name: string;
}
