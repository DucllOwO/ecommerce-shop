export const formatNumberWithComma = (number: number | undefined) => {
  return number ? number.toLocaleString() : 0;
}