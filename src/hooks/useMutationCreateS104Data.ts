import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { postData } from '~/api/api';
import { type ApiContract } from '~/iso_components/Form104/types';

const useMutationCreateS104Data = (arg: ApiContract) => {
  const queryClient = useQueryClient();
  const createS104DataMutation = useMutation(() => postData('s104/', arg), {
    onSuccess: () => {
      toast.success('Successfully created ISO 104 data');
      queryClient.invalidateQueries('iso_104').catch(() => {
        console.log('Error: useMutationCreateS104Data.ts');
      });
    },
  });

  return createS104DataMutation;
};

export default useMutationCreateS104Data;
