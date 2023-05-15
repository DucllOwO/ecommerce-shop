import IDaily_report from "./DailyReport";
import IYearly_report from "./YearlyReport";

export default interface IMonthly_report {
  month: Date;
  income: number;
  outcome: number;
  profit: number;
  sold_quantity: number;
  yearly_report: IYearly_report;
  year: Date;
  Daily_report: IDaily_report[];
}
