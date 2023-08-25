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

export const initialMetadata = {
  epoch: '',
  file_name: '',
  geographicIdentifier: '',
  horizontalDatumReference: '',
  horizontalDatumValue: 0,
  horizontalPositionUncertainty: 0,
  issueDate: issueDate,
  issueTime: issueTime,
  metadata: '',
  methodCurrentsProduct: '',
  timeUncertainty: 0,
  verticalCS: 0,
  verticalDatum: 0,
  verticalDatumReference: 0,
  verticalUncertainty: 0,
  waterLevelTrendThreshold: 0,
};

export const initialFormatData = {
  data_dynamicity_dt_type: 0,
  interpolation_type_dt_type: 0,
  sequencing_rule_type_dt_type: 0,
};

export const initialDatasetNcdf = 'base64';

export const initialWaterLevelBandName = '';

export const initialApiContract104 = {
  user_id: '',
  metadata: initialMetadata,
  format_data: initialFormatData,
  dataset_ncdf: initialDatasetNcdf,
  water_level_band_name: initialWaterLevelBandName,
};
