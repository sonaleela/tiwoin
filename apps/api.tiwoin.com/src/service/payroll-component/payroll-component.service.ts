import { Injectable } from '@nestjs/common';
import { PayrollComponentDbService } from '../../data-layer';
import { CreatePayrollComponentDto } from '../../resources/payroll-component/dto/create-payroll-component.dto';
import { UpdatePayrollComponentDto } from '../../resources/payroll-component/dto/update-payroll-component.dto';

@Injectable()
export class PayrollComponentService {
    constructor(private payrollService: PayrollComponentDbService) { }

    create(userId: string, createPayrollComponentDto: CreatePayrollComponentDto) {
        return this.payrollService.createPayrollComponent(userId, createPayrollComponentDto);
    }

    findAll() {
        return `This action returns all payrollComponent`;
    }

    findOne(id: number) {
        return `This action returns a #${id} payrollComponent`;
    }

    update(id: number, updatePayrollComponentDto: UpdatePayrollComponentDto) {
        return `This action updates a #${id} payrollComponent`;
    }

    remove(id: string) {
        return this.payrollService.deleteById(id);
    }

    getListByOrganizationId(organizationId: string) {
        return this.payrollService.getListByOrganizationId(organizationId)
    }
}
