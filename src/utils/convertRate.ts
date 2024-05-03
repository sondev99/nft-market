export const convertRate = (rate: number) => {
  return rate?.toFixed(2).toString().replace(".", ",");
};
