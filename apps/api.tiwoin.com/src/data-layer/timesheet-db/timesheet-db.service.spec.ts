import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDbService } from './timesheet-db.service';

describe('TimesheetDbService', () => {
  let service: TimesheetDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetDbService],
    }).compile();

    service = module.get<TimesheetDbService>(TimesheetDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
