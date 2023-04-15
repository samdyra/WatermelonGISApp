import React, { memo } from "react";
import { type GeoJson } from "./types";
import View from "./view";
import UseAnalysisResult from "./useAnalysisResult";

interface Props {
  data?: GeoJson[];
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
      propertiesSelected={propertiesSelected}
      selected={selected}
      setModalName={setModalName}
      setPropertiesSelected={setPropertiesSelected}
      setSelected={setSelected}
    />
  );
};

export default memo(Analysis);
