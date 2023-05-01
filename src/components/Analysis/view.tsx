import { memo } from 'react';
import FeaturePicker from './components/FeaturePicker';
import AttributePicker from './components/AttributePicker';
import ClipPicker from './components/ClipPicker';
import TwoAttributePicker from './components/TwoAttributePicker';
import { Modal, NLoading } from '~/components';
import { type GeoJson } from './types';
import React from 'react';
import infoImage from '../../../public/info.png';
import Image from 'next/image';
import { WORDING_TUTORIAL } from '~/constants/texts';
import {
  WEIGHTED_MEAN_SPATIAL_METHOD,
  CLIP_METHOD,
  REPROJECT_METHOD,
  REGRESSION_METHOD,
  DIRECTION_METHOD,
} from './types';

interface Props {
  handleHideModal: () => void;
  isModalVisible: boolean;
  handleMutateData: () => void;
  modalName: string;
  selected: GeoJson | null;
  data: GeoJson[] | undefined;
  setSelected: React.Dispatch<React.SetStateAction<GeoJson | null>>;
  featureProperties: () => string[];
  propertiesSelected: string;
  setPropertiesSelected: React.Dispatch<React.SetStateAction<string>>;
  AnalysisOptions: {
    beta: boolean;
    name: string;
    position: string;
  }[];
  setModalName: React.Dispatch<React.SetStateAction<string>>;
  handleShowModal: () => void;
  isLoading: boolean;
  setClipFeature: React.Dispatch<React.SetStateAction<GeoJson | null>>;
  clipFeature: GeoJson | null;
  position: [string, React.Dispatch<React.SetStateAction<string>>];
  secondPropertiesSelected: string;
  setSecondPropertiesSelected: React.Dispatch<React.SetStateAction<string>>;
  handleShowModalInfo: (desc: string) => void;
}

const AnalysisView = (props: Props) => {
  const {
    handleHideModal,
    isModalVisible,
    handleMutateData,
    modalName,
    selected,
    data,
    setSelected,
    featureProperties,
    propertiesSelected,
    setPropertiesSelected,
    AnalysisOptions,
    setModalName,
    handleShowModal,
    isLoading,
    clipFeature,
    setClipFeature,
    position,
    secondPropertiesSelected,
    setSecondPropertiesSelected,
  } = props;

  const Complementary = () => {
    switch (modalName) {
      case WEIGHTED_MEAN_SPATIAL_METHOD:
        return (
          <AttributePicker
            featureProperties={featureProperties}
            propertiesSelected={propertiesSelected}
            setPropertiesSelected={setPropertiesSelected}
          />
        );
      case CLIP_METHOD:
        return <ClipPicker selected={clipFeature} data={data} setSelected={setClipFeature} />;
      case REPROJECT_METHOD:
        return <FeaturePicker selected={selected} data={data} setSelected={setSelected} />;
      case REGRESSION_METHOD:
        return (
          <TwoAttributePicker
            featureProperties={featureProperties}
            propertiesSelected={propertiesSelected}
            setPropertiesSelected={setPropertiesSelected}
            secondPropertiesSelected={secondPropertiesSelected}
            setSecondPropertiesSelected={setSecondPropertiesSelected}
            firstFieldName="X Variable"
            secondFieldName="Y Variable"
          />
        );
      case DIRECTION_METHOD:
        return (
          <TwoAttributePicker
            featureProperties={featureProperties}
            propertiesSelected={propertiesSelected}
            setPropertiesSelected={setPropertiesSelected}
            secondPropertiesSelected={secondPropertiesSelected}
            setSecondPropertiesSelected={setSecondPropertiesSelected}
            firstFieldName="Years Field"
            secondFieldName="Weight Field"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading && <NLoading />}
      <div className="mb-[-3.5px] ml-5 w-fit rounded-t-md bg-gray-600 px-3 py-[2px] text-sm text-slate-200">
        <div className="flex items-center gap-2 py-[4px]">
          <h1>Analysis Tools</h1>
          <Image
            src={infoImage}
            alt="download"
            className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
            onClick={() => props.handleShowModalInfo(WORDING_TUTORIAL.ANALYSIS_TOOLS)}
          />
        </div>
      </div>
      <div className="h-[60%] w-full px-5 pb-5">
        <Modal
          handleHideModal={handleHideModal}
          isModalVisible={isModalVisible}
          callback={handleMutateData}
          modalName={modalName}
          y={position[0]}
        >
          {modalName !== REPROJECT_METHOD && (
            <FeaturePicker selected={selected} data={data} setSelected={setSelected} />
          )}
          <Complementary />
        </Modal>
        <div className="h-full rounded-md bg-gray-600 ">
          <div className="p-2">
            <div className="cursor-pointer">
              {AnalysisOptions.map((option) => (
                <div
                  key={option.name}
                  className="mb-2 flex items-center justify-between rounded-md bg-gray-800 px-2 py-2 text-xs transition-all duration-150 ease-linear active:opacity-80"
                  onClick={() => {
                    setModalName(option.name);
                    position[1](option.position);
                    handleShowModal();
                  }}
                >
                  <h1 className="flex text-slate-200">{option.name}</h1>
                  {option.beta && (
                    <h1 className="rounded-md bg-red-700 px-2 text-center text-[10px] text-slate-300">beta</h1>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AnalysisView);
