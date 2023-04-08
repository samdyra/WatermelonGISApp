import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Navbar,
  Layerbar,
  Descbar,
  AddFeature,
  Map,
  Analysis,
} from "~/components";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { storage } from "~/constants/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    }
    properties: object;
  }[]
  crs: {
    type: string;
    properties: {
      name: string
    }
  };
  name: string;
}[]

const Playground: NextPage = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLayerOpen, setIsLayerOpen ] = useState(true);
  const [ geoJson, setGeoJson ] = useState<GeoJson[]>([]);

  const ctx = api.useContext();
  const { data, isSuccess } = api.features.getFeaturesByUserId.useQuery();

  useEffect(() => {
    if (isSuccess) {
      setGeoJson([]);

      data.map((el) => {
        handleDownload(el.feature);
      });
    }

  }, [ data, isSuccess ]);

  const { mutate } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate()
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    },
  });

  const handleDownload = (data: string) => {
    fetch(data)
      .then((res) =>
        res.json().then((res: GeoJson) => {
          setGeoJson((current) => [ ...current, res ]);
        })
      )
      .catch((err) => console.log(err));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null || files[0] == undefined) {
      return toast.error("Please upload again!");
    }

    if (files) {
      const blob = new Blob([ files[0] ], { type: "application/json" });
      const storageRef = ref(storage, `/features/${files[0].name}`);
      const uploadFiles = uploadBytesResumable(storageRef, blob);
      const fileName = files[0].name ?? "file";

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
              mutate({ feature: url, name: fileName });
              toast.success("Successfully upload data!");
            })
            .catch(() => {
              toast.error("Please upload again!");
            });
        }
      );
    }
  };

  const handleShowSidebar = () => setIsOpen(!isOpen);
  const handleShowLayerbar = () => setIsLayerOpen(!isLayerOpen);

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden bg-red-600">
        <Navbar handleShowSidebar={handleShowSidebar} />
        <Map data={geoJson} />
        <Layerbar
          isOpen={isLayerOpen}
          handleShowLayerbar={handleShowLayerbar}
          position="left"
          size="large"
        >
          <AddFeature handleUpload={handleUpload} data={data} />
        </Layerbar>
        <Layerbar isOpen position="right" size="small">
          <Analysis data={geoJson} />
        </Layerbar>
        <Descbar isOpen={isOpen} />
      </main>
    </>
  );
};

export default Playground;
