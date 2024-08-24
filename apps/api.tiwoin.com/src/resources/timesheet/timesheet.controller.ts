import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put, UseGuards } from '@nestjs/common';
import { EmployeeService, TimesheetService } from '../../service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('timesheet')
export class TimesheetController {
    constructor(
        private readonly timesheetService: TimesheetService,
        private readonly employeeService: EmployeeService,
    ) { }

    /**
     * GET /timesheet?organizationId=:organization
     * Get list of timesheet entry types
     * 
     * @param req 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetTimeEntryTypeList' })
    async getTimeEntiresList(@Query('organizationId') organizationId: string) {
        try {
            return await this.timesheetService.getTimeEntiresList(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * POST /timesheet
     * Create timesheet entry type - ie. Lunch In, Lunch Out
     * 
     * @param req 
     * @param createTimesheetDto 
     * @returns 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'CreateTimeEntryType' })
    async create(@Request() req: any, @Body() createTimesheetDto: CreateTimesheetDto) {
        try {
            const userId = req?.user?.id;
            return await this.timesheetService.create(userId, createTimesheetDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /timesheet/submission/:organizationId
     * Fetch list of timesheet submissions by employee id
     * 
     * @param organizationId 
     * @returns 
     */
    @Get('submission/:organizationId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListTimeEntrySubmissions' })
    async findAll(@Request() req: any, @Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(organizationId, userId);

            return await this.timesheetService.getListByFilter(organizationId, { ...filter, employeeId: employee?.id });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PUT /timesheet/submission/:employeeId
     * Save timesheet submission
     * 
     * @param employeeId
     * @param body
     * @returns
     */
    @Put('submission/:employeeId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'SubmitTimeEntry' })
    putTimesheetSubmission(@Param('employeeId') employeeId: string, @Body() body: any) {
        try {
            return this.timesheetService.putTimesheetSubmission(employeeId, body);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /timesheet/clock/:organizationId
     * Get clock enteries for one employee for a day
     * 
     * @param req 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    @Get('clock/:organizationId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetTimeEntryForADay' })
    async findClockTime(@Request() req: any, @Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            const userId = req?.user?.id;
            const employee = await this.employeeService.getEmployeeByOrganizationAndUserId(organizationId, userId);
            return await this.timesheetService.getClockTime(organizationId, { ...filter, employeeId: employee?.id });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /timesheet/:id
     * Fetch timesheet entry type for edit
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetTimeEntryType' })
    async findOne(@Param('id') id: string) {
        try {
            return await this.timesheetService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /timesheet/:id
     * Update timesheet entry
     * 
     * @param id timesheet id
     * @param updateTimesheetDto
     * @returns
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'UpdateTimeEntryType' })
    update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
        try {
            return this.timesheetService.update(id, updateTimesheetDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /timesheet/:id
     * Delete timesheet entry
     * 
     * @param id timesheet id
     * @returns
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'DeleteTimeEntryType' })
    remove(@Param('id') id: string) {
        try {
            return this.timesheetService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
