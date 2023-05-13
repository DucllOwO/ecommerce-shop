import Daily_report from "./DailyReport";
import Yearly_report from "./YearlyReport";

export default interface Monthly_report {
  month: Date;
  income: number;
  sold_quantity: number;
  yearly_report: Yearly_report;
  year: Date;
  Daily_report: Daily_report[];
}
