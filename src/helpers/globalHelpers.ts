import toast from 'react-hot-toast';
import { storage } from '~/constants/firebase';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { type ITurf, type IStats } from '../components/Analysis/types';
import { deleteObject, ref } from 'firebase/storage';

export const uploadToFirebase = (data: ITurf | IStats, storageName = 'output', callback: (url: string) => void) => {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const storageRef = ref(storage, `/features/${data.name}-${storageName}`);
  const uploadFiles = uploadBytesResumable(storageRef, blob);

  uploadFiles.on(
    'state_changed',
    (snapshot) => {
      console.log(snapshot);
    },
    () => {
      toast.error('Please upload again!');
    },
    () => {
      getDownloadURL(uploadFiles.snapshot.ref)
        .then((url) => {
          callback(url);
          toast.success('Successfully upload data!');
        })
        .catch(() => {
          toast.error('Please upload again!');
        });
    }
  );
};

export const handleUploadData = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (url: string, fileName: string) => void
) => {
  const files = event.target.files;
  if (files == null || files[0] == undefined) {
    return toast.error('Please upload again!');
  }

  if (files) {
    const blob = new Blob([files[0]], { type: 'application/json' });
    const storageRef = ref(storage, `/features/${files[0].name}`);
    const uploadFiles = uploadBytesResumable(storageRef, blob);
    const fileName = files[0].name ?? 'file';

    uploadFiles.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      () => {
        toast.error('Please upload again!');
      },
      () => {
        getDownloadURL(uploadFiles.snapshot.ref)
          .then((url) => {
            callback(url, fileName);
            toast.success('Successfully upload data!');
          })
          .catch(() => {
            toast.error('Please upload again!');
          });
      }
    );
  }
};

export const deleteFirebaseData = async (feature: string) => {
  try {
    const storageRef = ref(storage, feature);
    await deleteObject(storageRef);
    toast.success('Successfully delete data!');
  } catch (error) {
    toast.error('Somethign Went Wrong!');
  }
};

export const getRandomHexColor = (): string => {
  const randomInt = Math.floor(Math.random() * 16777215);

  const hexString = randomInt.toString(16);

  const paddedHexString = hexString.padStart(6, '0');

  return `#${paddedHexString}`;
};

export const formatTimeForInput = (time: string) => {
  return time.replace(/(\d{2})(\d{2})/, '$1:$2');
};

export const formatDateForInput = (date: string) => {
  return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
};
