import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { type ITurf } from "../components/Analysis/types";

export const uploadToFirebase = (data: ITurf, storageName="output", callback: (url: string) => void ) => {
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json", });
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const storageRef = ref(storage, `/features/${data.name}-${storageName}`);
  const uploadFiles = uploadBytesResumable(storageRef, blob);

  uploadFiles.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
    },
    () => {
      toast.error("Please upload again!");
    },
    () => {
      getDownloadURL(uploadFiles.snapshot.ref)
        .then((url) => {
          callback(url)
          toast.success("Successfully upload data!");
        })
        .catch(() => {
          toast.error("Please upload again!");
        });
    }
  );
}
