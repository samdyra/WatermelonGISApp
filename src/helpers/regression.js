function determinationCoefficient(data, results) {
  const predictions = [];
  const observations = [];

  data.forEach((d, i) => {
    if (d[1] !== null) {
      observations.push(d);
      predictions.push(results[i]);
    }
  });

  const sum = observations.reduce((a, observation) => a + observation[1], 0);
  const mean = sum / observations.length;

  const ssyy = observations.reduce((a, observation) => {
    const difference = observation[1] - mean;
    return a + difference * difference;
  }, 0);

  const sse = observations.reduce((accum, observation, index) => {
    const prediction = predictions[index];
    const residual = observation[1] - prediction[1];
    return accum + residual * residual;
  }, 0);

  return 1 - sse / ssyy;
}

function round(number, _precision) {
  // const factor = 10 ** precision;
  return Math.round(number * 3) / 3;
}

export const linear = (data) => {
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    const [x, y] = data[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;


  const predict = (x) => [round(x, 1), round(slope * x + intercept, 1)];

  const points = data;
  const points2 = data.map((point) => predict(point[0]));


  return {
    points,
    predict,
    r2: determinationCoefficient(data, points2),
    string: intercept === 0 ? `y = ${slope}x` : `y = ${slope}x + ${intercept}`,
  };
};
