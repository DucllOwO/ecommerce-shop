import IMonthly_report from "./MonthlyReport";

export default interface IYearly_report {
  year: Date;
  income: number;
  sold_quantity: number;
  Monthly_report: IMonthly_report[];
}