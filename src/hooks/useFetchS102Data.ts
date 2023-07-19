import { useState } from 'react';
import { postData } from '~/api/api';
import { type Metadata, type FormatData } from '~/components/Form102/types';
import { type AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

/* @TODO: Adjust to using react query */

interface ParamType {
  metadata: Metadata;
  format_data: FormatData;
  tiffFile: string;
}

type ResponseType = AxiosResponse | object | undefined;

const useMutationCreateS102Data = (arg: ParamType) => {
  const {
    data: coinPrice,
    isLoading: isCoinPriceLoading,
    isError: isCoinPriceError,
    isFetching: isCoinPriceFetching,
  } = useQuery('coinPrice', fetchDataPrice);
};

export default useMutationCreateS102Data;
