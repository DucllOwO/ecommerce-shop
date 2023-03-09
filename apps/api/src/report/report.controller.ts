import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/daily')
  findDailyReport() {
    return this.reportService.dailyReports({});
  }

  @Get('/monthly')
  findMonthlyReport() {
    return this.reportService.monthlyReports({});
  }

  @Get('/yearly')
  findYearlyReport() {
    return this.reportService.yearlyReports({});
  }
}
