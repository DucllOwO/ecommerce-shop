import Monthly_report from "./MonthlyReport";

export default interface Daily_report {
  date: Date;
  income: number;
  sold_quantity: number;
  monthly_report: Monthly_report;
  month: Date;
}