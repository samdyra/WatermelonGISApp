import React, { memo } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Modal } from "~/components";
import useModalState from "~/hooks/useModalState";
import { type GeoJson, type ITurf } from "./types";
import FeaturePicker from "./components/FeaturePicker";
import AttributePicker from "./components/AttributePicker";
interface Props {
  data?: GeoJson[];
}

const Analysis = (props: Props) => {
 
  const [ selected, setSelected ] = React.useState<GeoJson | null>(null);
  const [ propertiesSelected, setPropertiesSelected ] = React.useState<string>("")

  const ctx = api.useContext();
  const [ modalName, setModalName ] = React.useState("");
  const [ isModalVisible, handleShowModal, handleHideModal ] = useModalState(false);

  const AnalysisOptions = [
    { name: "Mean Spatial", },
    { name: "Weighted Mean Spatial", },
  ];
    
  const { mutate: mutateDB } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate();
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    },
  });

  const uploadToFirebase = (data: ITurf, storageName="output", callback: (url: string) => void ) => {
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

  const { mutate: meanSpatial } = api.vectorAnalysis.meanSpatial.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, "MeanSpatial", (url) => {
        mutateDB({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-MeanSpatial` ?? "file",
        });
      })
    },
  });

  const { mutate: weightedMeanSpatial } =
    api.vectorAnalysis.weightedMeanSpatial.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, "WeightedMean", (url) => {
          mutateDB({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-WeightedMean` ?? "file",
          });
        })
      },
    });

  const handleMutateData = () => {
    if (modalName === "Mean Spatial") {
      meanSpatial({ feature: selected });
    }
    else if (modalName === "Weighted Mean Spatial") {
      weightedMeanSpatial({ feature: selected, weight: propertiesSelected });
    }
  }

  const featureProperties = (): string[] => {
    if (!selected) return [ "No Feature Selected" ] ;
    const properties = selected.features.map((feature) => Object.keys(feature.properties));

    if (properties[0] === undefined) return [ "No Feature Selected" ] ;
    return properties[0]
  };

  return (
    <div className="h-full w-full p-5">
      <Modal
        handleHideModal={handleHideModal}
        isModalVisible={isModalVisible}
        callback={handleMutateData}
        modalName={modalName}
      >
        <div>
          <FeaturePicker selected={selected} data={props.data} setSelected={setSelected} />
          {modalName === "Weighted Mean Spatial" && <AttributePicker featureProperties={featureProperties} propertiesSelected={propertiesSelected} setPropertiesSelected={setPropertiesSelected} />}
        </div>
      </Modal>
      <div className="h-4/6 rounded-md bg-gray-600 ">
        <div className="p-2">
          <div className="cursor-pointer">
            {AnalysisOptions.map((option) => (
              <h1
                key={option.name}
                className="mb-2 flex items-center rounded-md bg-gray-800 px-2 py-2 text-xs text-slate-200"
                onClick={() => {
                  setModalName(option.name);
                  handleShowModal();
                }}
              >
                {option.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Analysis);
