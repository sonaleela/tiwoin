import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDBService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationDBService],
    }).compile();

    service = module.get<OrganizationDBService>(OrganizationDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
