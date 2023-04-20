import React from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import useModalState from "~/hooks/useModalState";
import {
  type GeoJson,
  MEAN_SPATIAL_METHOD,
  WEIGHTED_MEAN_SPATIAL_METHOD,
  AnalysisOptions,
  MEAN_SPATIAL_CODE,
  WEIGHTED_MEAN_SPATIAL_CODE,
  CLIP_METHOD,
  CLIP_CODE,
  REPROJECT_METHOD,
  REGRESSION_CODE,
  REGRESSION_METHOD,
} from "./types";
import { uploadToFirebase } from "~/helpers/globalHelpers";

const UseAnalysisResult = () => {
  // ---------- HOOKS ----------
  const ctx = api.useContext();
  const [selected, setSelected] = React.useState<GeoJson | null>(null);
  const [propertiesSelected, setPropertiesSelected] =
    React.useState<string>("");
  const [secondPropertiesSelected, setSecondPropertiesSelected] =
    React.useState<string>("");
  const [clipFeature, setClipFeature] = React.useState<GeoJson | null>(null);
  const [modalName, setModalName] = React.useState("");
  const [isModalVisible, handleShowModal, handleHideModal] =
    useModalState(false);
  const position = React.useState("0px");

  // ---------- MUTATIONS ----------
  const { mutate: createFeature, isLoading: loadingCreateData } =
    api.features.create.useMutation({
      onSuccess: () => {
        void ctx.features.getFeaturesByUserId.invalidate();
      },
      onError: () => {
        toast.error("Something Went Wrong!");
      },
    });

  const { mutate: meanSpatial, isLoading: loadingMeanSpatial } =
    api.vectorAnalysis.meanSpatial.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, MEAN_SPATIAL_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${MEAN_SPATIAL_CODE}` ?? "file",
          });
        });
      },
    });

  const { mutate: weightedMeanSpatial, isLoading: loadingWeightedMean } =
    api.vectorAnalysis.weightedMeanSpatial.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, WEIGHTED_MEAN_SPATIAL_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${WEIGHTED_MEAN_SPATIAL_CODE}` ?? "file",
          });
        });
      },
    });

  const { mutate: clip, isLoading: loadingClip } =
    api.vectorAnalysis.clip.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, CLIP_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${CLIP_CODE}` ?? "file",
          });
        });
      },
    });

  const { mutate: reproject, isLoading: loadingReproject } =
    api.vectorAnalysis.reproject.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  const { mutate: regression, isLoading: loadingRegression } =
    api.vectorAnalysis.regression.useMutation({
      onSuccess: (data) => {
        console.log(REGRESSION_CODE, data);
      },
    });

  const isLoading =
    loadingCreateData ||
    loadingMeanSpatial ||
    loadingWeightedMean ||
    loadingClip ||
    loadingReproject ||
    loadingRegression;

  // ---------- HANDLERS ----------
  const handleMutateData = () => {
    switch (modalName) {
    case MEAN_SPATIAL_METHOD:
      meanSpatial({ feature: selected });
      handleHideModal();
      break;
    case WEIGHTED_MEAN_SPATIAL_METHOD:
      weightedMeanSpatial({ feature: selected, weight: propertiesSelected });
      handleHideModal();
      break;
    case CLIP_METHOD:
      clip({ feature: selected, clip: clipFeature });
      handleHideModal();
      break;
    case REPROJECT_METHOD:
      reproject({ feature: selected });
      handleHideModal();
      break;
    case REGRESSION_METHOD:
      regression({
        feature: selected,
        row: propertiesSelected,
        secondRow: secondPropertiesSelected,
      });
      handleHideModal();
      break;
    default:
    }
  };

  const featureProperties = (): string[] => {
    if (!selected) return ["No Feature Selected"];
    const properties = selected.features.map((feature) =>
      Object.keys(feature.properties)
    );

    if (properties[0] === undefined) return ["No Feature Selected"];
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
    isLoading,
    setClipFeature,
    clipFeature,
    position,
    secondPropertiesSelected,
    setSecondPropertiesSelected,
  };
};

export default UseAnalysisResult;
