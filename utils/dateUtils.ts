export const isBetween21And28Days = (timestampA, timestampB) => {
  // Convertiamo i timestamp in millisecondi
  const DAY_IN_MS = 24 * 60 * 60 * 1000; // Numero di millisecondi in un giorno
  const start21Days = timestampA + 20 * DAY_IN_MS; // Inizio dei 21 giorni
  const end28Days = timestampA + 27 * DAY_IN_MS; // Fine dei 28 giorni

  // Verifichiamo se timestampB è tra il 21esimo e il 28esimo giorno
  return timestampB >= start21Days && timestampB <= end28Days;
};
