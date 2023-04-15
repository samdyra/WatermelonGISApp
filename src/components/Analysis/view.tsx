import { memo } from "react";
import FeaturePicker from "./components/FeaturePicker";
import AttributePicker from "./components/AttributePicker";
import { Modal, NLoading } from "~/components";
import { type GeoJson } from "./types";
import React from "react";



interface Props {
    handleHideModal: () => void
    isModalVisible: boolean
    handleMutateData: () => void
    modalName: string
    selected: GeoJson | null
    data: GeoJson[] | undefined
    setSelected: React.Dispatch<React.SetStateAction<GeoJson | null>>
    featureProperties: () => string[]
    propertiesSelected: string
    setPropertiesSelected: React.Dispatch<React.SetStateAction<string>>
    AnalysisOptions: { name: string }[]
    setModalName: React.Dispatch<React.SetStateAction<string>>  
    handleShowModal: () => void 
    isLoading: boolean
}


const AnalysisView = (props: Props) => {
  const {
    handleHideModal, isModalVisible, handleMutateData, modalName, selected, data, setSelected, featureProperties, propertiesSelected, setPropertiesSelected, AnalysisOptions, setModalName, handleShowModal, isLoading
  } = props

  return (
    <>
      {isLoading && <NLoading />}
      <div className="h-full w-full p-5">
        <Modal
          handleHideModal={handleHideModal}
          isModalVisible={isModalVisible}
          callback={handleMutateData}
          modalName={modalName}
        >
          <div>
            <FeaturePicker selected={selected} data={data} setSelected={setSelected} />
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
    </>
  )
}

export default memo(AnalysisView);
