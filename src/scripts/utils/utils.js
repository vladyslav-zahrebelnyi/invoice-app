import { MAP_NUMBER_TO_MONTH } from "./constants";

const formatMonth = (month) => String(month).padStart(2, "0");

export const getLastMonthDay = (year, month) =>
  new Date(year, month, 0).getDate();

// yyyy-month-day
const parseDate = (date) => {
  const [year, month, day] = date.split("-");
  return { month, day, year };
};

const dateParserWrapper =
  (fn) =>
  (date, ...params) => {
    const parsedDate = parseDate(date);
    return fn(parsedDate, ...params);
  };

export const getFullDate = dateParserWrapper(
  (date) => `${date.day}.${formatMonth(date.month)}.${date.year}`
);

export const getMonthYear = dateParserWrapper(
  (date, separator = "/") =>
    `${formatMonth(date.month)}${separator}${date.year.slice(2)}`
);

const getMonthFromParsedDate = (date) => MAP_NUMBER_TO_MONTH[date.month];

export const getMonth = dateParserWrapper((date) =>
  getMonthFromParsedDate(date)
);

export const getStringMonthYear = dateParserWrapper(
  (date) => `${getMonthFromParsedDate(date)} ${date.year}.`
);

export const getAmount = (amount) => {
  const splittedAmount = String(amount).split(".");
  if (splittedAmount.length === 2) {
    const [total, divisional] = splittedAmount;
    return `${total},${divisional}-$`;
  }

  return `${amount}-$`;
};

export const makePaymentValue = (value) =>
  `${value.split(" ").reverse().join("")}${process.env.J}`;

const getMonthYearFromDate = (date) => ({
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});

const minusMonth = (date, num) =>
  new Date(date.setMonth(date.getMonth() - num));

// return Array<{month: string, year: number}>
export const generatePeriod = () => {
  const MONTH_NUMBER = 12;
  return [...Array(MONTH_NUMBER)]
    .map((_, i) => MONTH_NUMBER - 1 - i)
    .reduce((acc, item) => {
      const expiredDate = minusMonth(new Date(), item);
      return acc.concat(getMonthYearFromDate(expiredDate));
    }, []);
};
