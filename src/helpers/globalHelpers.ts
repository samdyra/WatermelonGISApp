import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "~/utils/api";

const ctx = api.useContext();

const { mutate } = api.features.create.useMutation({
  onSuccess: () => {
    void ctx.features.getFeaturesByUserId.invalidate()
  },
  onError: () => {
    toast.error("Something Went Wrong!");
  },
});

export const handleUploadGeojsonToFirebase = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files == null || files[0] == undefined) {
    return toast.error("Please upload again!");
  }

  if (files) {
    const blob = new Blob([ files[0] ], { type: "application/json" });
    const storageRef = ref(storage, `/features/${files[0].name}`);
    const uploadFiles = uploadBytesResumable(storageRef, blob);
    const fileName = files[0].name ?? "file";

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
            mutate({ feature: url, name: fileName });
            toast.success("Successfully upload data!");
          })
          .catch(() => {
            toast.error("Please upload again!");
          });
      }
    );
  }
};