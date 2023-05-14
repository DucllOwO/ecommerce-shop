import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import dayjs from 'dayjs';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get daily report should have returned', () => {
    expect(service.dailyReport({
      date: dayjs(Date.now()).toString()
    })).toMatchObject({
      date: dayjs(Date.now()).toString()
    });
  });

  it('get all daily report should have returned', () => {
    expect(service.dailyReports({})).toHaveReturned();
  });
  
  it('get monthly report should have returned', () => {
    expect(service.monthlyReport({
      month: dayjs(Date.now()).toString()
    })).toMatchObject({
      month: dayjs(Date.now()).toString()
    });
  });

  it('get all monthly report should have returned', () => {
    expect(service.monthlyReports({})).toHaveReturned();
  });
  
  it('get yearly report should have returned', () => {
    expect(service.yearlyReport({
      year: dayjs(Date.now()).toString()
    })).toMatchObject({
      year: dayjs(Date.now()).toString()
    });
  });

  it('get all yearly report should have returned', () => {
    expect(service.yearlyReports({})).toHaveReturned();
  });
});
