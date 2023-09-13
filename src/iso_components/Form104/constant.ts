import { type ApiContract104 } from './types';

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
  epoch: 'G1762',
  file_name: 'TESTING S104',
  geographicIdentifier: 'Selat Sunda',
  horizontalDatumReference: 'EPSG',
  horizontalDatumValue: 4326,
  horizontalPositionUncertainty: 10,
  issueDate: issueDate,
  issueTime: issueTime,
  metadata: '102ID00_ITBS100PROJECT.xml',
  methodCurrentsProduct: 'ADCIRC_Hydrodynamic_Model_Forecasts',
  timeUncertainty: 10,
  verticalCS: 6499,
  verticalDatum: 10,
  verticalDatumReference: 2,
  verticalUncertainty: 10,
  waterLevelTrendThreshold: 0.2,
};

export const initialFormatData = {
  data_dynamicity_dt_type: 1,
  interpolation_type_dt_type: 1,
  sequencing_rule_type_dt_type: 1,
};

export const initialDatasetNcdf = 'base64';

export const initialWaterLevelBandName = 'wl_pred';

export const initialApiContract104: ApiContract104 = {
  user_id: '60a7b1b9d6b9a4a7f0a3b3a0',
  metadata: initialMetadata,
  format_data: initialFormatData,
  dataset_ncdf: initialDatasetNcdf,
  water_level_band_name: initialWaterLevelBandName,
};
