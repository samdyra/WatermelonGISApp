import React from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import useModalState from "~/hooks/useModalState";
import {
  type GeoJson, MEAN_SPATIAL_METHOD, WEIGHTED_MEAN_SPATIAL_METHOD, AnalysisOptions, MEAN_SPATIAL_CODE, WEIGHTED_MEAN_SPATIAL_CODE
} from "./types";
import { uploadToFirebase } from "~/helpers/globalHelpers";

const UseAnalysisResult = () => {
  const ctx = api.useContext();

  const [ selected, setSelected ] = React.useState<GeoJson | null>(null);
  const [ propertiesSelected, setPropertiesSelected ] = React.useState<string>("");
  const [ modalName, setModalName ] = React.useState("");
  const [ isModalVisible, handleShowModal, handleHideModal ] = useModalState(false);

  const { mutate: mutateDB } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate();
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    },
  });

  const { mutate: meanSpatial } = api.vectorAnalysis.meanSpatial.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, MEAN_SPATIAL_CODE, (url) => {
        mutateDB({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${MEAN_SPATIAL_CODE}` ?? "file",
        });
      });
    },
  });

  const { mutate: weightedMeanSpatial } =
    api.vectorAnalysis.weightedMeanSpatial.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, WEIGHTED_MEAN_SPATIAL_CODE, (url) => {
          mutateDB({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${WEIGHTED_MEAN_SPATIAL_CODE}` ?? "file",
          });
        });
      },
    });

  const handleMutateData = () => {
    if (modalName === MEAN_SPATIAL_METHOD) {
      meanSpatial({ feature: selected });
    }
    else if (modalName === WEIGHTED_MEAN_SPATIAL_METHOD) {
      weightedMeanSpatial({ feature: selected, weight: propertiesSelected });
    }
  };

  const featureProperties = (): string[] => {
    if (!selected) return [ "No Feature Selected" ];
    const properties = selected.features.map((feature) =>
      Object.keys(feature.properties)
    );

    if (properties[0] === undefined) return [ "No Feature Selected" ];
    return properties[0];
  };

  return {
    selected,
    setSelected,
    propertiesSelected,
    setPropertiesSelected,
    modalName,
    setModalName,
    isModalVisible,
    handleShowModal,
    handleHideModal,
    AnalysisOptions,
    handleMutateData,
    featureProperties,
  };
};

export default UseAnalysisResult;
