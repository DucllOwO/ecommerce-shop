import IMonthly_report from "./MonthlyReport";

export default interface IDaily_report {
  date: Date;
  income: number;
  sold_quantity: number;
  monthly_report: IMonthly_report;
  month: Date;
}