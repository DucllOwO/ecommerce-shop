import { Injectable } from '@nestjs/common';
import { Daily_report, Monthly_report, Prisma, Yearly_report } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) { }

  async dailyReport(
    dailyReportWhereUniqueInput: Prisma.Daily_reportWhereUniqueInput,
  ): Promise<Daily_report | null> {
    return this.prisma.daily_report.findUnique({
      where: dailyReportWhereUniqueInput,
    });
  }
  
  async dailyReports(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Daily_reportWhereUniqueInput;
    where?: Prisma.Daily_reportWhereInput;
    orderBy?: Prisma.Daily_reportOrderByWithRelationInput;
  }): Promise<Daily_report[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.daily_report.findMany({
      skip,
      take,
      orderBy,
    });
  }
  async monthlyReport(
    monthlyReportWhereUniqueInput: Prisma.Monthly_reportWhereUniqueInput,
  ): Promise<Monthly_report | null> {
    return this.prisma.monthly_report.findUnique({
      where: monthlyReportWhereUniqueInput,
    });
  }
  
  async monthlyReports(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Monthly_reportWhereUniqueInput;
    where?: Prisma.Monthly_reportWhereInput;
    orderBy?: Prisma.Monthly_reportOrderByWithRelationInput;
  }): Promise<Monthly_report[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.monthly_report.findMany({
      skip,
      take,
      orderBy,
    });
  }
  async yearlyReport(
    yearlyReportWhereUniqueInput: Prisma.Yearly_reportWhereUniqueInput,
  ): Promise<Yearly_report | null> {
    return this.prisma.yearly_report.findUnique({
      where: yearlyReportWhereUniqueInput,
    });
  }
  
  async yearlyReports(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Yearly_reportWhereUniqueInput;
    where?: Prisma.Yearly_reportWhereInput;
    orderBy?: Prisma.Yearly_reportOrderByWithRelationInput;
  }): Promise<Yearly_report[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.yearly_report.findMany({
      skip,
      take,
      orderBy,
    });
  }
}
