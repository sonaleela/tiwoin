import { Injectable } from '@nestjs/common';
import { PayrollDbService } from '../../data-layer';
import { CreatePayrollDto } from '../../resources/payroll/dto/create-payroll.dto';
import { UpdatePayrollDto } from '../../resources/payroll/dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(private payrollSerivce: PayrollDbService) { }

  getListByOrganizationId(organizationId: string) {
    return this.payrollSerivce.getListByOrganizationId(organizationId);
  }

  create(userId: string, createPayrollDto: CreatePayrollDto) {
    return this.payrollSerivce.create(userId, createPayrollDto);
  }

  findAll() {
    return `This action returns all payroll`;
  }

  findOne(id: string) {
    return this.payrollSerivce.getPayrollById(id);
  }

  update(id: string, updatePayrollDto: UpdatePayrollDto) {
    return this.payrollSerivce.updatePayroll(id, updatePayrollDto);
  }

  remove(id: string) {
    return this.payrollSerivce.deleteById(id);
  }
}
