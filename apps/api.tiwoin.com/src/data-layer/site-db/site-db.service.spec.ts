import { Test, TestingModule } from '@nestjs/testing';
import { SiteDbService } from './site-db.service';

describe('SiteDbService', () => {
  let service: SiteDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteDbService],
    }).compile();

    service = module.get<SiteDbService>(SiteDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
