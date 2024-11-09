export const isBetween21And28Days = (timestampA, timestampB) => {
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const start21Days = timestampA + 20 * DAY_IN_MS;
  const end28Days = timestampA + 27 * DAY_IN_MS;

  return timestampB >= start21Days && timestampB <= end28Days;
};
