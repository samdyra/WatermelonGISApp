import React, { memo } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Modal } from "~/components";
import useModalState from "~/hooks/useModalState";
import {
  type Feature, type Point, type Properties, type BBox 
} from "@turf/helpers";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: object;
  }[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  name?: string;
}

interface ITurf {
  name: string;
  type: "FeatureCollection";
  features: Feature<Point, Properties>[];
  bbox?: BBox | undefined;
}
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

  const uploadToFirebase = (data: ITurf, storageName="output", callback: () => void ) => {
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
            callback({
              feature: url,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              name: `${data.name}-${storageName}` ?? "file",
            })
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
      const blob = new Blob([ JSON.stringify(data) ], { type: "application/json", });
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const storageRef = ref(storage, `/features/${data.name}-MeanSpatial`);
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
              mutateDB({
                feature: url,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                name: `${data.name}-MeanSpatial` ?? "file",
              });
              toast.success("Successfully upload data!");
            })
            .catch(() => {
              toast.error("Please upload again!");
            });
        }
      );
    },
  });

  const { mutate: weightedMeanSpatial } =
    api.vectorAnalysis.weightedMeanSpatial.useMutation({
      onSuccess: (data) => {
        const blob = new Blob([ JSON.stringify(data) ], { type: "application/json", });
        const storageRef = ref(
          storage,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/features/${data.name}-WeightedMeanSpatial`
        );
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
                mutateDB({
                  feature: url,
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  name: `${data.name}-WeightedMean` ?? "file",
                });
                toast.success("Successfully upload data!");
              })
              .catch(() => {
                toast.error("Please upload again!");
              });
          }
        );
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

  const featureProperties = () => {
    if (!selected) return [ [ "No Feature Selected" ] ];
    const properties = selected.features.map((feature) => Object.keys(feature.properties));

    if (properties[0] === undefined) return [ [ "No Feature Selected" ] ];
    return properties[0]
  };

  const FeaturePicker = () => (
    <div className="flex border-b border-slate-400 pb-1 mb-5">
      <div className="flex w-full items-center">
        <select
          id="countries"
          className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
          onChange={(sel) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setSelected(JSON.parse(sel.currentTarget.value));
          }}
        >
          <option defaultValue="Choose Your Feature" className="font-semibold">
            Choose Your Feature
          </option>
          {props.data &&
            props.data.map((data) => {
              const r = (Math.random() + 1).toString(36).substring(7);
              return (
                <>
                  <option
                    id="countries"
                    key={r}
                    value={JSON.stringify(data)}
                    className="font-semibold"
                  >
                    {data.name}
                  </option>
                </>
              );
            })}
        </select>
        <h1 className="ml-1 text-xs text-slate-300">
          {selected?.name ?? "Choose Your Feature"}
        </h1>
      </div>
    </div>
  );

  const AttributePicker = () => (
    <div className="mb-2  flex border-b border-slate-400 pb-1">
      <div className="flex w-full items-center">
        <select
          id="countries"
          className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
          onChange={(sel) => setPropertiesSelected(sel.currentTarget.value)}
        >
          <option defaultValue="Choose The Weight Field" className="font-semibold">
            Choose The Weight Field
          </option>
          {
            featureProperties().map((data) => {
              const r = (Math.random() + 1).toString(36).substring(7);
              return (
                <>
                  <option
                    id="countries"
                    key={r}
                    value={data}
                    className="font-semibold"
                  >
                    {data}
                  </option>
                </>
              );
            })}
        </select>
        <h1 className="ml-1 text-xs text-slate-300">
          {propertiesSelected === "" ? "Choose The Weight Field" : propertiesSelected}
        </h1>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full p-5">
      <Modal
        handleHideModal={handleHideModal}
        isModalVisible={isModalVisible}
        callback={handleMutateData}
        modalName={modalName}
      >
        <div>
          <FeaturePicker />
          {modalName === "Weighted Mean Spatial" && <AttributePicker />}
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
