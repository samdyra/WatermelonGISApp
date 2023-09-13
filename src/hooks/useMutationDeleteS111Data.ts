import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { axiosDelete } from '~/api/api';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '~/constants/firebase';

const deleteFirebaseS111Data = async (geojsonUri: string, hdf5Uri: string) => {
  try {
    const storageRefGeojson = ref(storage, geojsonUri);
    const storageRefHdf5 = ref(storage, hdf5Uri);
    await deleteObject(storageRefGeojson);
    await deleteObject(storageRefHdf5);

    toast.success('Successfully delete data!');
  } catch (error) {
    toast.error('Somethign Went Wrong!');
  }
};

type Param = {
  _id: string;
  geojsonUri: string;
  hdf5Uri: string;
};

const useMutationDeleteS111Data = () => {
  const queryClient = useQueryClient();
  const deleteS111DataMutation = useMutation(
    ({ _id, geojsonUri, hdf5Uri }: Param) =>
      axiosDelete(`s111/${_id}`, {}, () => {
        deleteFirebaseS111Data(geojsonUri, hdf5Uri).catch(() => {
          console.log('Error: deleting iso 111 data');
        });
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('iso_111').catch(() => {
          console.log('Error: deleting iso 111 data');
        });
        queryClient.invalidateQueries('download_iso_102').catch(() => {
          console.log('Error: deleting iso 111 data');
        });

        toast.success('Successfully deleted ISO 111 data');
      },
    }
  );

  return deleteS111DataMutation;
};

export default useMutationDeleteS111Data;
