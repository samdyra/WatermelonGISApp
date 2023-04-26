interface Result {
  year: string;
  direction: number;
}

export function combineYearAndDirection(yearArray: string[], direction: number[]): Result[] {
  const result: Result[] = [];

  for (let i = 0; i < yearArray.length - 1; i++) {
    const yearStart = yearArray[i];
    const yearEnd = yearArray[i + 1];
    const dir = direction[i];
    const obj: Result = {
      year: `${yearStart ?? 'noyear'} until ${yearEnd ?? 'noyear'}`,
      direction: dir ?? 0,
    };
    result.push(obj);
  }

  return result;
}

export function calculateWindDirection(coord1: { x: number; y: number }, coord2: { x: number; y: number }): number {
  const dx = coord2.x - coord1.x;
  const dy = coord2.y - coord1.y;
  const radians = Math.atan2(dy, dx);
  let degrees = (radians * 180) / Math.PI;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}

export function calculateWindDirections(coordinates: number[][]): number[] {
  const windDirections: number[] = [];

  for (let i = 0; i < coordinates.length - 1; i++) {
    const coord1 = { x: coordinates[i]?.[1] as number, y: coordinates?.[i]?.[0] as number };
    const coord2 = { x: coordinates[i + 1]?.[1] as number, y: coordinates[i + 1]?.[0] as number };
    const windDirection = calculateWindDirection(coord1, coord2);
    windDirections.push(windDirection);
  }

  return windDirections;
}
