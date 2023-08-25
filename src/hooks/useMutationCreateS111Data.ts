import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { postData } from '~/api/api';
import { type ApiContract111 } from '~/iso_components/Form111/types';

const useMutationCreateS111Data = (arg: ApiContract111) => {
  const queryClient = useQueryClient();
  const createS111DataMutation = useMutation(() => postData('s111/', arg), {
    onSuccess: () => {
      toast.success('Successfully created ISO 111 data');
      queryClient.invalidateQueries('iso_111').catch(() => {
        console.log('Error: useMutationCreateS111Data.ts');
      });
    },
  });

  return createS111DataMutation;
};

export default useMutationCreateS111Data;
