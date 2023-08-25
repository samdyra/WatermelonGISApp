const now: Date = new Date();

const year: number = now.getFullYear();
const month: string = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const day: string = String(now.getDate()).padStart(2, '0');

const hours: string = String(now.getHours()).padStart(2, '0');
const minutes: string = String(now.getMinutes()).padStart(2, '0');

const formattedDate = `${year}${month}${day}`;
const formattedTime = `${hours}${minutes}`;

const issueDate: string = formattedDate;
const issueTime: string = formattedTime;

export const initialApiContract111 = {
  user_id: '60a7b1b9d6b9a4a7f0a3b3a0',
  metadata: {
    epoch: 'G1762',
    extent_type_code: true,
    file_name: 'TESTING S111',
    geographicIdentifier: 'Selat Alas',
    horizontalDatumValue: 4326,
    horizontalPositionUncertainty: 0.1,
    issueDate: issueDate,
    issueTime: issueTime,
    metadata: '102ID00_ITBS100PROJECT.xml',
    methodCurrentsProduct: 'TESTING S111',
    surfaceCurrentDepth: 10,
    timeUncertainty: -1,
    verticalCS: 6499,
    verticalUncertainty: -1,
  },
  format_data: {
    common_point_rule_dt_type: 1,
    data_dynamicity_dt_type: 1,
    interpolation_type_dt_type: 1,
    sequencing_rule_type_dt_type: 1,
  },
  dataset_ncdf: 'base64',
  current_speed_band_name: 'Surface Current Speed',
  current_direction_band_name: 'Surface Current Direction',
};
