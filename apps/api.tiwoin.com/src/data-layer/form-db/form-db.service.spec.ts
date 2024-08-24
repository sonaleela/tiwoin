import { Test, TestingModule } from '@nestjs/testing';
import { FormDbService } from './form-db.service';

describe('FormDbService', () => {
  let service: FormDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDbService],
    }).compile();

    service = module.get<FormDbService>(FormDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
