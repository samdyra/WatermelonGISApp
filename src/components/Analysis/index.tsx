import React, { memo } from 'react';
import { type GeoJson } from './types';
import View from './view';
import UseAnalysisResult from './useAnalysisResult';

interface Props {
  data?: GeoJson[];
  handleShowModalInfo: (desc: string) => void;
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
    position,
    secondPropertiesSelected,
    setSecondPropertiesSelected,
    variableCollectionSource,
    setVariableCollectionSource,
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
      position={position}
      secondPropertiesSelected={secondPropertiesSelected}
      setSecondPropertiesSelected={setSecondPropertiesSelected}
      handleShowModalInfo={props.handleShowModalInfo}
      variableCollectionSource={variableCollectionSource}
      setVariableCollectionSource={setVariableCollectionSource}
    />
  );
};

export default memo(Analysis);
