export interface FormState {
  [key: string]: string;
}

export interface Metadata {
  epoch: string;
  extent_type_code: boolean;
  geographicIdentifier: string;
  horizontalDatumReference: string;
  horizontalDatumValue: number;
  issueDate: string;
  issueTime: string;
  file_name: string;
  metadata: string;
}

export interface FormatData {
  common_point_rule_dt_type: number;
  data_coding_format_dt_type: number;
  interpolation_type_dt_type: number;
  sequencing_rule_type_dt_type: number;
  vertical_datum_dt_type: number;
}
