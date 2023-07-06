import dayjs from "dayjs";

export const formatNumberWithComma = (number: number | undefined) => {
  return number ? number.toLocaleString() : 0;
}

export const formatToFullDate = (date: string | Date) => {
  if (!date)
    return 'Lỗi thời gian!!!'
  return dayjs(date).format('HH:mm DD/MM/YYYY')
}