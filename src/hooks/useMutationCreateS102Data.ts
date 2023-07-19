import { useState } from 'react';
import { postData } from '~/api/api';
import { type Metadata, type FormatData } from '~/components/Form102/types';
import { type AxiosResponse } from 'axios';

/* @TODO: Adjust to using react query */

interface ParamType {
  metadata: Metadata;
  format_data: FormatData;
  tiffFile: string;
}

type ResponseType = AxiosResponse | object | undefined;

const useMutationCreateS102Data = (arg: ParamType) => {
  const [data, setData] = useState<ResponseType>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    await postData('s102/', arg)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        console.error('Error in useMutationCreateS102Data');
      });
  };

  return { data, isLoading, fetchData };
};

export default useMutationCreateS102Data;
