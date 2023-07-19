import apiConfig from './config';

interface FormData {
  _id: string;
  metadata: {
    epoch: string;
    extent_type_code: boolean;
    geographicIdentifier: string;
    horizontalDatumReference: string;
    horizontalDatumValue: number;
    issueDate: string;
    issueTime: string;
    file_name: string;
  };
  format_data: {
    common_point_rule_dt_type: number;
    data_coding_format_dt_type: number;
    interpolation_type_dt_type: number;
    sequencing_rule_type_dt_type: number;
    vertical_datum_dt_type: number;
  };
  tiffFile: string;
}

export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await apiConfig.post(`/${endpoint}`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
