import osm from "../../public/osm.png";
import pioneer from "../../public/pioneer.png";
import spinal from "../../public/spinal.png";
import stadiablack from "../../public/stadiablack.png";
import terrain from "../../public/terrrain.png";
import tone from "../../public/tone.png";

export const Basemaps = [
  {
    name: "osm",
    url: osm,
    link: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },

  {
    name: "pioneer",
    url: pioneer,
    link: 'https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=a8ad6de948e944f3bc211a0bbbddf953'
  },
  {
    name: "spinal",
    url: spinal,
    link: "https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=a8ad6de948e944f3bc211a0bbbddf953"
  },
  {
    name: "stadiablack",
    url: stadiablack,
    link: "https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw"
  },
  {
    name: "terrain",
    url: terrain,
    link: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    name: "tone",
    url: tone,
    link: "https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw"
  },
];

