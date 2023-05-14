import React from 'react';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import useModalState from '~/hooks/useModalState';
import {
  type GeoJson,
  MEAN_SPATIAL_METHOD,
  WEIGHTED_MEAN_SPATIAL_METHOD,
  AnalysisOptions,
  MEAN_SPATIAL_CODE,
  WEIGHTED_MEAN_SPATIAL_CODE,
  CLIP_METHOD,
  CLIP_CODE,
  REPROJECT_METHOD,
  REGRESSION_METHOD,
  DIRECTION_METHOD,
  DIRECTION_CODE,
  DIRECTION_CODE_LINE,
  STATS_CODE,
  DIRECTION_CODE_STATS,
  REGRESSION_MODULE_METHOD,
  REGRESSION_MODULE_CODE,
  WEIGHTED_DIRECTION_METHOD,
  WEIGHTED_DIRECTION_CODE,
} from './types';
import { uploadToFirebase } from '~/helpers/globalHelpers';

const UseAnalysisResult = () => {
  // ---------- HOOKS ----------
  const ctx = api.useContext();
  const [selected, setSelected] = React.useState<GeoJson | null>(null);
  const [propertiesSelected, setPropertiesSelected] = React.useState<string>('');
  const [secondPropertiesSelected, setSecondPropertiesSelected] = React.useState<string>('');
  const [clipFeature, setClipFeature] = React.useState<GeoJson | null>(null);
  const [modalName, setModalName] = React.useState('');
  const [isModalVisible, handleShowModal, handleHideModal] = useModalState(false);
  const [variableCollectionSource, setVariableCollectionSource] = React.useState<{ x: string; y: string }[]>([]);
  const [directionFieldNames, setDirectionFieldNames] = React.useState<string[]>([]);
  const position = React.useState('0px');

  // ---------- MUTATIONS ----------
  const { mutate: createFeature, isLoading: loadingCreateData } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate();
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: createStats, isLoading: statsCreateLoading } = api.stats.create.useMutation({
    onSuccess: () => {
      void ctx.stats.getStatsByUserId.invalidate();
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: createDirection, isLoading: directionCreateLoading } = api.direction.create.useMutation({
    onSuccess: () => {
      void ctx.direction.getDirectionByUserId.invalidate();
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: meanSpatial, isLoading: loadingMeanSpatial } = api.vectorAnalysis.meanSpatial.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, MEAN_SPATIAL_CODE, (url) => {
        createFeature({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${MEAN_SPATIAL_CODE}` ?? 'file',
        });
      });
    },
  });

  const { mutate: weightedMeanSpatial, isLoading: loadingWeightedMean } =
    api.vectorAnalysis.weightedMeanSpatial.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, WEIGHTED_MEAN_SPATIAL_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${WEIGHTED_MEAN_SPATIAL_CODE}` ?? 'file',
          });
        });
      },
    });

  const { mutate: clip, isLoading: loadingClip } = api.vectorAnalysis.clip.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, CLIP_CODE, (url) => {
        createFeature({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${CLIP_CODE}` ?? 'file',
        });
      });
    },
  });

  const { mutate: reproject, isLoading: loadingReproject } = api.vectorAnalysis.reproject.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: regression, isLoading: loadingRegression } = api.vectorAnalysis.regression.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, STATS_CODE, (url) => {
        createStats({
          statsLink: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${STATS_CODE}` ?? 'file',
        });
      });
    },
  });

  const { mutate: createLine } = api.vectorAnalysis.createDirectionLine.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, DIRECTION_CODE_LINE, (url) => {
        createFeature({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${DIRECTION_CODE_LINE}` ?? 'file',
        });
      });

      uploadToFirebase(data, DIRECTION_CODE_STATS, (url) => {
        createDirection({
          directionLink: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${DIRECTION_CODE_STATS}` ?? 'file',
          years: data.years as number[],
        });
      });
    },
  });

  const { mutate: directionModule, isLoading: loadingDirection } = api.vectorAnalysis.directionModule.useMutation({
    onSuccess: (data) => {
      uploadToFirebase(data, DIRECTION_CODE, (url) => {
        createFeature({
          feature: url,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          name: `${data.name}-${DIRECTION_CODE}` ?? 'file',
        });
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createLine({ feature: data, name: data?.name, years: data.uniqueTahuns });
    },
  });

  const { mutate: weightedDirectionModule, isLoading: loadingWeightedDirection } =
    api.vectorAnalysis.weightedDirectionModule.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, WEIGHTED_DIRECTION_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${WEIGHTED_DIRECTION_CODE}` ?? 'file',
          });
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createLine({ feature: data, name: data?.name, years: data.fields });
      },
    });

  const { mutate: regressionModule, isLoading: loadingRegressionModule } =
    api.vectorAnalysis.regressionModule.useMutation({
      onSuccess: (data) => {
        uploadToFirebase(data, REGRESSION_MODULE_CODE, (url) => {
          createFeature({
            feature: url,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            name: `${data.name}-${REGRESSION_MODULE_CODE}` ?? 'file',
          });
        });
      },
    });

  const isLoading =
    loadingCreateData ||
    loadingMeanSpatial ||
    loadingWeightedMean ||
    loadingClip ||
    loadingReproject ||
    loadingRegression ||
    loadingDirection ||
    statsCreateLoading ||
    directionCreateLoading ||
    loadingRegressionModule ||
    loadingWeightedDirection;

  // ---------- HANDLERS ----------
  const handleMutateData = () => {
    switch (modalName) {
      case MEAN_SPATIAL_METHOD:
        meanSpatial({ feature: selected });
        handleHideModal();
        break;
      case WEIGHTED_MEAN_SPATIAL_METHOD:
        weightedMeanSpatial({ feature: selected, weight: propertiesSelected });
        handleHideModal();
        break;
      case CLIP_METHOD:
        clip({ feature: selected, clip: clipFeature });
        handleHideModal();
        break;
      case REPROJECT_METHOD:
        reproject({ feature: selected });
        handleHideModal();
        break;
      case REGRESSION_METHOD:
        regression({
          feature: selected,
          row: propertiesSelected,
          secondRow: secondPropertiesSelected,
        });
        handleHideModal();
        break;
      case DIRECTION_METHOD:
        directionModule({
          feature: selected,
          year: propertiesSelected,
          weight: secondPropertiesSelected,
        });
        handleHideModal();
        break;
      case REGRESSION_MODULE_METHOD:
        regressionModule({
          feature: selected,
          regressionModuleInput: variableCollectionSource,
          place: propertiesSelected,
        });
        handleHideModal();
        break;
      case WEIGHTED_DIRECTION_METHOD:
        weightedDirectionModule({
          feature: selected,
          fields: directionFieldNames,
        });

      default:
    }
  };

  const featureProperties = (): string[] => {
    if (!selected) return ['No Feature Selected'];
    const properties = selected.features.map((feature) => Object.keys(feature.properties));

    if (properties[0] === undefined) return ['No Feature Selected'];
    return properties[0];
  };

  return {
    selected,
    setSelected,
    propertiesSelected,
    setPropertiesSelected,
    modalName,
    setModalName,
    isModalVisible,
    handleShowModal,
    handleHideModal,
    AnalysisOptions,
    handleMutateData,
    featureProperties,
    isLoading,
    setClipFeature,
    clipFeature,
    position,
    secondPropertiesSelected,
    setSecondPropertiesSelected,
    variableCollectionSource,
    setVariableCollectionSource,
    directionFieldNames,
    setDirectionFieldNames,
  };
};

export default UseAnalysisResult;
