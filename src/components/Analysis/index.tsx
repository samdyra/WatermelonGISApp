import React, { memo } from "react";
import { type GeoJson } from "./types";
import View from "./view";
import UseAnalysisResult from "./useAnalysisResult";

interface Props {
  data?: GeoJson[]
}

const Analysis = (props: Props) => {
  const {
    AnalysisOptions,
    featureProperties,
    handleHideModal,
    handleMutateData,
    handleShowModal,
    isModalVisible,
    modalName,
    propertiesSelected,
    selected,
    setModalName,
    setPropertiesSelected,
    setSelected,
    isLoading,
    clipFeature,
    setClipFeature,
  } = UseAnalysisResult();

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
      clipFeature={clipFeature}
      setClipFeature={setClipFeature}
      propertiesSelected={propertiesSelected}
      selected={selected}
      setModalName={setModalName}
      setPropertiesSelected={setPropertiesSelected}
      setSelected={setSelected}
      isLoading={isLoading}
    />
  );
};

export default memo(Analysis);
