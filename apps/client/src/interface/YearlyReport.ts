import Monthly_report from "./MonthlyReport";

export default interface Yearly_report {
  year: Date;
  income: number;
  sold_quantity: number;
  Monthly_report: Monthly_report[];
}