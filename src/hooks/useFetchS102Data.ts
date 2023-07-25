import { axiosGet } from '~/api/api';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';

/* @TODO: Adjust to using react query */

interface ParamType {
  user_id: string;
}

interface ResponseType {
  _id: string;
  hdf5Uri: string;
  geojsonUri: string;
  file_name: string;
  user_id: string;
  hdf5_file_name_location_path: string;
  geojson_file_name_location_path: string;
}

const useFetchS102Data = ({ user_id }: ParamType) => {
  const queryClient = useQueryClient();

  const fetchData = async () => axiosGet<ResponseType[]>(`s102/${user_id}`);

  return useQuery('iso_102', fetchData, {
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries('download_iso_102').catch(() => {
        console.log('Error fetching iso 102 data');
      });
    },
  });
};

export default useFetchS102Data;
