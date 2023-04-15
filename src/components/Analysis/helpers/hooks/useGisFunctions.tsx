import React from "react";
import { meanSpatial, weightedMeanSpatial } from "../gisFunctions";
import { type GeoJson } from "../../types";

const useGisFunction = () => {
  const [ modalName, setModalName ] = React.useState("");
  const [ selected, setSelected ] = React.useState<GeoJson | null>(null);
  const [ propertiesSelected, setPropertiesSelected ] = React.useState<string>("")


  const AnalysisOptions = [
    { name: "Mean Spatial", },
    { name: "Weighted Mean Spatial", },
  ];

  const handleMutateData = () => {
    if (modalName === "Mean Spatial") {
      meanSpatial({ feature: selected });
    }
    else if (modalName === "Weighted Mean Spatial") {
      weightedMeanSpatial({ feature: selected, weight: propertiesSelected });
    }
  }
    
  return {
    setModalName, handleMutateData, AnalysisOptions, setSelected, setPropertiesSelected, selected, propertiesSelected 
  };
}