import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { DataService } from '../../service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    /**
     * Get list of submitted form data
     * 
     * @param organizationId      
     * @param filter 
     * @returns 
     */
    @Get('form/:organizationId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'FormListData' })
    findForms(@Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            return this.dataService.findForms(organizationId, filter);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update form data
     * 
     * @param formDataId 
     * @param payload 
     * @returns 
     */
    @Patch('form/:formDataId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'EditFormData' })
    editFormData(@Param('formDataId') formDataId: string, @Body() payload: any) {
        try {
            const approvedBy = payload?.approvedBy;
            return this.dataService.editFormData(formDataId, { approvedBy });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get single timesheet data record
     * 
     * @param uid 
     * @returns 
     */
    @Get('work-item/record/:uid')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'WorkItemDataRecord' })
    getWorkItem(@Param('uid') uid: string) {
        try {
            return this.dataService.findWorkItemById(uid);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update work-item data record
     * 
     * @param uid 
     * @param payload 
     * @returns 
     */
    @Patch('work-item/record/:uid')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'UpdateTimesheetDataRecord' })
    updateWorkItem(@Request() req: any, @Param('uid') uid: string, @Body() payload: any) {
        try {
            const userId = req?.user?.id;
            return this.dataService.updateWorkItemById(uid, { ...payload, userId });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get list of submiited work-items
     * 
     * @param organizationId
     * @param filter 
     * @returns 
     */
    @Get('work-item/:organizationId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'WorkItemListData' })
    findWorkItems(@Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            return this.dataService.findWorkItems(organizationId, filter);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update work item
     * 
     * @param workItemDataId 
     * @param payload 
     * @returns 
     */
    @Patch('work-item/:workItemDataId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'EditWorkItemData' })
    editWorkItemData(@Param('workItemDataId') workItemDataId: string, @Body() payload: any) {
        try {
            const approvedBy = payload?.approvedBy;
            return this.dataService.editWorkItemData(workItemDataId, { approvedBy });
        } catch (error) {
            throw new Error(error);
        }
    }


    /**
     * Get single timesheet data record
     * 
     * @param uid 
     * @returns 
     */
    @Get('timesheet/record/:uid')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'TimesheetDataRecord' })
    getTimesheet(@Param('uid') uid: string) {
        try {
            return this.dataService.findTimesheetById(uid);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update timesheet data record
     * 
     * @param uid 
     * @param payload 
     * @returns 
     */
    @Patch('timesheet/record/:uid')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'UpdateTimesheetDataRecord' })
    updateTimesheet(@Request() req: any, @Param('uid') uid: string, @Body() payload: any) {
        try {
            const userId = req?.user?.id;
            return this.dataService.updateTimesheetById(uid, { ...payload, userId });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get list of timesheet entries
     * 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    @Get('timesheet/:organizationId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'TimesheetListData' })
    findTimesheets(@Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            return this.dataService.findTimesheets(organizationId, filter);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Create timesheet data for an employee from dashboard
     * 
     * @param organizationId 
     * @param data 
     * @returns 
     */
    @Post('timesheet/:organizationId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'TimesheetDataAdd' })
    addTimesheetData(@Param('organizationId') organizationId: string, @Body() data: any) {
        try {
            const { employeeId } = data;
            if (!employeeId) throw new Error("Employee is missing");

            return this.dataService.addTimesheet(organizationId, employeeId, data);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get list of advance payments
     * 
     * @param payload
     * @returns 
     */
    @Get('advance-payment/:organizationId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'AdvancePaymentListData' })
    findAll(@Param('organizationId') organizationId: string, @Query() filter: any) {
        try {
            return this.dataService.findAdvancePayments(organizationId, filter);
        } catch (error) {
            throw new Error(error);
        }
    }
}
