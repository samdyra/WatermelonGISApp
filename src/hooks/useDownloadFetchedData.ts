import { useQuery } from 'react-query';
import axios from 'axios';

import { type AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface ResponseType {
  _id: string;
  hdf5Uri: string;
  geojsonUri: string;
  file_name: string;
  user_id: string;
  hdf5_file_name_location_path: string;
  geojson_file_name_location_path: string;
}

const fetchGeojsonData = async (item: ResponseType) => {
  try {
    const response: AxiosResponse<string> = await axios.get(item.geojsonUri);
    return { ...item, geojsonData: response.data };
  } catch (error) {
    throw new Error('Error fetching geojson data');
  }
};

const useFetchGeojsonUrls = (geojsonUriCollection: ResponseType[]) => {
  const fetchedGeojsonUrls = useQuery(
    ['download_iso_102', geojsonUriCollection],
    () => Promise.all(geojsonUriCollection?.map((item) => fetchGeojsonData(item))),
    {
      // Enable background refetching to keep data up-to-date

      // Persist the data in the cache for a specified time (e.g., 5 minutes)
      // Change the time according to your requirements
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 30,
      staleTime: 1000 * 60 * 5,
      onSuccess: () => {
        toast.success('Successfully fetched geojson data');
      },
    }
  );

  // Store the fetched data in the cache after successful fetch

  return fetchedGeojsonUrls;
};

export default useFetchGeojsonUrls;
