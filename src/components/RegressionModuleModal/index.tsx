import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

type FeatureType = {
  properties: {
    place: string;
    r2: number;
    equation: string;
    id: string | number;
    points: [number, number][];
    intercept: number;
    slope: number;
  };
};

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: FeatureType;
}

function RegressionModuleModal(props: IProps) {
  const { id, place, points, r2, intercept, slope } = props.feature.properties;
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    scales: {},
  };

  function convertData(data: number[][]): { x: number; y: number }[] {
    return data.map(([x, y]) => ({ x: x ?? 0, y: y ?? 0 }));
  }

  function findHighestLowest(data: number[][]): { x: number; y: number }[] {
    const lowest = data.reduce(
      (acc, [x, y]) => ({
        x: Math.min(acc.x, x ?? 0),
        y: Math.min(acc.y, y ?? 0),
      }),
      { x: Infinity, y: Infinity }
    );

    const highest = data.reduce(
      (acc, [x, y]) => ({
        x: Math.max(acc.x, x ?? 0),
        y: Math.max(acc.y, y ?? 0),
      }),
      { x: -Infinity, y: -Infinity }
    );

    const y1 = lowest.x * slope + intercept;
    const y2 = highest.x * slope + intercept;
    const lowestPoint = { x: lowest.x, y: y1 };
    const highestPoint = { x: highest.x, y: y2 };

    return [lowestPoint, highestPoint];
  }

  function getStrengthLevel(number: number) {
    switch (true) {
      case number > 0.67:
        return 'Strongly';
      case number > 0.33:
        return 'Moderately';
      case number > 0.19:
        return 'Weakly';
      default:
        return 'Very Weakly';
    }
  }

  function getColorLevel(number: number) {
    switch (true) {
      case number > 0.67:
        return '#00ff00';
      case number > 0.33:
        return '#ffff00';
      case number > 0.19:
        return '#ff7800';
      default:
        return '#ff0000';
    }
  }

  const data = {
    datasets: [
      {
        type: 'scatter' as const,
        label: 'Data Distributions',
        data: convertData(points),
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: '#36A2EB',
      },
      {
        type: 'line' as const,
        label: 'Regression Line',
        borderWidth: 1,
        data: findHighestLowest(points),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  const ScatterView = () => {
    return <Chart type="scatter" options={options} data={data} />;
  };

  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {props.isModalVisible ? (
          <div className="overflow-hidden">
            <motion.div
              className="absolute left-[32%] top-[10%] z-50 flex h-4/5 w-2/5 items-center overflow-hidden "
              style={{ overflow: 'hidden' }}
              initial={{ y: -700 }}
              animate={{ y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-full w-full text-black">
                {/*content*/}
                <div className="flex h-full w-full flex-col rounded-xl border-0 bg-slate-300 shadow-lg">
                  {/*header*/}
                  <div className="flex items-center justify-between rounded-t border-b border-solid border-gray-900 px-5 pb-1 pt-2 text-xl">
                    <h1 className="font-semibold">Regression Statistics</h1>
                    <button
                      className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                      onClick={props.handleHideModal}
                    >
                      ×
                    </button>
                  </div>
                  {/*body*/}
                  <div className="h-[650px] overflow-x-hidden overflow-y-scroll scroll-auto p-5">
                    <h1 className="text-sm font-bold">Layer Properties:</h1>
                    <div className="mb-2 text-sm">
                      <h1>Feature Location: {place} </h1>
                      <h1>id: {id} </h1>
                    </div>
                    <h1 className="text-sm font-bold">Equation Result:</h1>
                    <div className="mb-2 text-sm">
                      <h1>
                        Equation: y = {slope}x + {intercept}{' '}
                      </h1>
                      <h1>R²: {r2} </h1>
                    </div>
                    <h1 className="text-sm ">
                      The implication is that the data{' '}
                      <span style={{ backgroundColor: getColorLevel(r2), padding: 1 }} className="font-bold">
                        {getStrengthLevel(r2)}
                      </span>{' '}
                      defines the data variances
                    </h1>
                    <ScatterView />
                    <h1 className="my-2 text-sm font-bold">R² is always between 0 and 1:</h1>
                    <div className="mb-2 text-sm">
                      <ul>
                        - 0 represents a model that does not explain any of the variation in the response variable
                        around its mean. The mean of the dependent variable predicts the dependent variable as well as
                        the regression model.
                      </ul>
                      <ul>
                        - 1 represents a model that explains all the variation in the response variable around its mean.
                      </ul>
                    </div>
                  </div>
                  <div className="z-50 flex items-center justify-between rounded-b border-t border-solid border-gray-900 px-5 pb-1 pt-2 text-xl">
                    <h1 className="h-8"></h1>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 overflow-hidden bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={props.handleHideModal}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default memo(RegressionModuleModal);
