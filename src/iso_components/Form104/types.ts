export interface Metadata {
  epoch: string;
  file_name: string;
  geographicIdentifier: string;
  horizontalDatumReference: string;
  horizontalDatumValue: number;
  horizontalPositionUncertainty: number;
  issueDate: string;
  issueTime: string;
  metadata: string;
  methodCurrentsProduct: string;
  timeUncertainty: number;
  verticalCS: number;
  verticalDatum: number;
  verticalDatumReference: number;
  verticalUncertainty: number;
  waterLevelTrendThreshold: number;
}

export interface FormatData {
  data_dynamicity_dt_type: number;
  interpolation_type_dt_type: number;
  sequencing_rule_type_dt_type: number;
}

export interface ApiContract104 {
  user_id: string;
  metadata: Metadata;
  format_data: FormatData;
  dataset_ncdf: string;
  water_level_band_name: string;
}
