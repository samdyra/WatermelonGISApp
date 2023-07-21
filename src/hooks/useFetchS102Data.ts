import { getData } from '~/api/api';
import { useQuery } from 'react-query';

/* @TODO: Adjust to using react query */

interface ParamType {
  user_id: string;
}

const useFetchS102Data = ({ user_id }: ParamType) => {
  const fetchData = async () => getData(`s102/${user_id}`);

  const {
    data: s102_data,
    isLoading: isLoadingS102Data,
    isError: isErrloadingS102Data,
    isFetched: isFetchedS102Data,
  } = useQuery('iso_102', fetchData);

  return { s102_data, isLoadingS102Data, isErrloadingS102Data, isFetchedS102Data };
};

export default useFetchS102Data;
