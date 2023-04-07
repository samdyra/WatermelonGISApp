import React, { memo } from "react";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

const AddFeature = () => {
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null || files[0] == undefined) {
      return toast.error("Please upload again!");
    }

    if (files) {
      const blob = new Blob([ files[0] ], { type: "application/json" });
      const storageRef = ref(storage, `/features/${files[0].name}`);
      const uploadFiles = uploadBytesResumable(storageRef, blob);

      uploadFiles.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadFiles.snapshot.ref)
            .then((url) => {
              console.log(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    }
  };

  return (
    <div className="h-full w-full px-5">
      <label
        htmlFor="file"
        className="mb-3 flex cursor-pointer justify-center rounded-md bg-gray-600 text-base text-slate-200"
      >
        +
      </label>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        accept={".zip, .geojson, .json, .kml, .kmz"}
        onChange={(event) => {
          handleUpload(event);
        }}
      />

      <div className="flex h-1/2 flex-col rounded-md bg-gray-600 px-4 py-3">
        <div className="mb-2  flex border-b border-slate-400 pb-1">
          <div className="flex w-[95%] items-center">
            <Shape />
            <p className="text-xs text-slate-200">SHP Kota Cirebon</p>
          </div>
          <div className="cursor-pointer text-base text-slate-200">x</div>
        </div>
      </div>
    </div>
  );
};

const Shape = () => {
  console.log("Shape");
  return <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" />;
};

export default memo(AddFeature);
