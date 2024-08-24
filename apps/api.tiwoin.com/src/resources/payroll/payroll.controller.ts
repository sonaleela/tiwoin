import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { PayrollService } from '../../service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('payroll')
export class PayrollController {
    constructor(private readonly payrollService: PayrollService) { }

    /**
     * Create payroll pipeline
     * 
     * @param req 
     * @param createPayrollDto 
     * @returns 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'CreatePayroll' })
    create(@Request() req: any, @Body() createPayrollDto: CreatePayrollDto) {
        try {
            const userId = req?.user?.id;
            return this.payrollService.create(userId, createPayrollDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * List payroll
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListPayroll' })
    async findAll(@Query('organization') organizationId: string) {
        try {
            return await this.payrollService.getListByOrganizationId(organizationId);;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get payroll by id
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetPayroll' })
    async findOne(@Param('id') id: string) {
        try {
            return await this.payrollService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /payroll/:id
     * Update payroll
     * 
     * @param id update id
     * @param updatePayrollDto body
     * @returns 
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'UpdatePayroll' })
    update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
        try {
            return this.payrollService.update(id, updatePayrollDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /payroll/:id
     * Delete payroll
     * 
     * @param id payroll id
     * @returns 
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'DeletePayroll' })
    remove(@Param('id') id: string) {
        try {
            return this.payrollService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
