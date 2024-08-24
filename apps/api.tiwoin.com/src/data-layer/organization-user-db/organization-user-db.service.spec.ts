import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationUserDbService } from './organization-user-db.service';

describe('OrganizationUserDbService', () => {
  let service: OrganizationUserDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationUserDbService],
    }).compile();

    service = module.get<OrganizationUserDbService>(OrganizationUserDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
