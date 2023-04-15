import React, { memo } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import useModalState from "~/hooks/useModalState";
import { type GeoJson, type ITurf } from "./types";
import View from "./view";

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
    <View 
      AnalysisOptions={AnalysisOptions}
      data={props.data}
      featureProperties={featureProperties}
      handleHideModal={handleHideModal}
      handleMutateData={handleMutateData}
      handleShowModal={handleShowModal}
      isModalVisible={isModalVisible}
      modalName={modalName}
      propertiesSelected={propertiesSelected}
      selected={selected}
      setModalName={setModalName}
      setPropertiesSelected={setPropertiesSelected}
      setSelected={setSelected}
    />
  );
};

export default memo(Analysis);
