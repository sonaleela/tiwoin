import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { PayrollComponentService } from '../../service';;
import { CreatePayrollComponentDto } from './dto/create-payroll-component.dto';
import { UpdatePayrollComponentDto } from './dto/update-payroll-component.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('payroll-component')
export class PayrollComponentController {
    constructor(private readonly payrollComponentService: PayrollComponentService) { }

    /**
     * Create payroll component
     * 
     * @param req 
     * @param createPayrollComponentDto 
     * @returns 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'CreatePayrollComponent' })
    create(@Request() req: any, @Body() createPayrollComponentDto: CreatePayrollComponentDto) {
        try {
            const userId = req?.user?.id;
            return this.payrollComponentService.create(userId, createPayrollComponentDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * List payroll components
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListPayrollComponents' })
    async findAll(@Query('organizationId') organizationId: string) {
        try {
            return await this.payrollComponentService.getListByOrganizationId(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get payroll component by id
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetPayrollComponent' })
    findOne(@Param('id') id: string) {
        return this.payrollComponentService.findOne(+id);
    }

    /**
     * Update payroll component
     * 
     * @param id 
     * @param updatePayrollComponentDto 
     * @returns 
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'UpdatePayrollComponent' })
    update(@Param('id') id: string, @Body() updatePayrollComponentDto: UpdatePayrollComponentDto) {
        return this.payrollComponentService.update(+id, updatePayrollComponentDto);
    }

    /**
     * Delete payroll component
     * 
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'DeletePayrollComponent' })
    remove(@Param('id') id: string) {
        try {
            return this.payrollComponentService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
