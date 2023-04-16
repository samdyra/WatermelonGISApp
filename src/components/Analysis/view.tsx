import { memo } from "react";
import FeaturePicker from "./components/FeaturePicker";
import AttributePicker from "./components/AttributePicker";
import ClipPicker from "./components/ClipPicker";
import { Modal, NLoading } from "~/components";
import { type GeoJson } from "./types";
import React from "react";
import { WEIGHTED_MEAN_SPATIAL_METHOD, CLIP_METHOD } from "./types";
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
  AnalysisOptions: { name: string }[];
  setModalName: React.Dispatch<React.SetStateAction<string>>;
  handleShowModal: () => void;
  isLoading: boolean;
  setClipFeature: React.Dispatch<React.SetStateAction<GeoJson | null>>;
  clipFeature: GeoJson | null;
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
  } = props;

  return (
    <>
      {isLoading && <NLoading />}
      <div className="my-5 mb-[-3.5px] ml-5 w-fit rounded-t-md bg-gray-600 px-3 py-[2px] text-sm text-slate-200">
        Analysis Tools
      </div>
      <div className="h-4/6 w-full px-5 pb-5">
        <Modal
          handleHideModal={handleHideModal}
          isModalVisible={isModalVisible}
          callback={handleMutateData}
          modalName={modalName}
        >
          <div>
            <FeaturePicker
              selected={selected}
              data={data}
              setSelected={setSelected}
            />
            {modalName === WEIGHTED_MEAN_SPATIAL_METHOD && (
              <AttributePicker
                featureProperties={featureProperties}
                propertiesSelected={propertiesSelected}
                setPropertiesSelected={setPropertiesSelected}
              />
            )}
            {modalName === CLIP_METHOD && (
              <ClipPicker
                selected={clipFeature}
                data={data}
                setSelected={setClipFeature}
              />
            )}
          </div>
        </Modal>
        <div className="h-full rounded-md bg-gray-600 ">
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
    </>
  );
};

export default memo(AnalysisView);
