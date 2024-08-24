import { Test, TestingModule } from '@nestjs/testing';
import { PayrollComponentController } from './payroll-component.controller';
import { PayrollComponentService } from './payroll-component.service';

describe('PayrollComponentController', () => {
  let controller: PayrollComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollComponentController],
      providers: [PayrollComponentService],
    }).compile();

    controller = module.get<PayrollComponentController>(PayrollComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
