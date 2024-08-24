import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { EmployeeService, FormService } from '../../service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('form')
export class FormController {
    constructor(
        private readonly formService: FormService,
        private readonly employeeService: EmployeeService,
    ) { }

    /**
     * Create a new form
     * 
     * @param req 
     * @param createFormDto 
     * @returns 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'CreateForm' })
    async create(@Request() req: any, @Body() createFormDto: CreateFormDto) {
        try {
            const userId = req?.user?.id;
            return await this.formService.create(userId, createFormDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get a list of forms for an organization
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListForm' })
    async findAll(@Query('organizationId') organizationId: string) {
        try {
            return await this.formService.getListByOrganizationId(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get list of form submission for an employee
     * Extract employee by userId and organizationId
     * 
     * @param req 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    @Get('submission/:organizationId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListFormSubmissions' })
    async findSubmission(@Request() req: any, @Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(organizationId, userId);
            return this.formService.getSubmissionListByUserId(organizationId, { ...filter, createdBy: employee?.id });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Submit a form for an employee
     * 
     * @param req 
     * @param submitFormDto 
     * @returns 
     */
    @Post('submission')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'SubmitForm' })
    async submitForm(@Request() req: any, @Body() submitFormDto: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(submitFormDto?.organizationId, userId);
            return await this.formService.submitForm(employee?.id, submitFormDto);
        } catch (error) {

        }
    }

    /**
     * Get single form
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetForm' })
    async findOne(@Param('id') id: string) {
        try {
            return await this.formService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /form/:id
     * Update single form by id
     * 
     * @param id form id
     * @param updateFormDto 
     * @returns 
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'UpdateForm' })
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
        try {
            return this.formService.update(id, updateFormDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /form/:id
     * Delete form by id
     * 
     * @param id uuid of the form
     * @returns 
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'DeleteForm' })
    remove(@Param('id') id: string) {
        try {
            return this.formService.remove(id);
        } catch (error) {
            throw new Error(error);

        }
    }
}
