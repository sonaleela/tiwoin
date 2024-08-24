import { Injectable } from '@nestjs/common';
import { TimesheetDbService } from '../../data-layer';
import { CreateTimesheetDto } from '../../resources/timesheet/dto/create-timesheet.dto';
import { UpdateTimesheetDto } from '../../resources/timesheet/dto/update-timesheet.dto';

@Injectable()
export class TimesheetService {
    constructor(private timesheetService: TimesheetDbService) { }

    create(userId: string, createTimesheetDto: CreateTimesheetDto) {
        return this.timesheetService.createTimesheet(userId, createTimesheetDto);
    }

    getListByOrganizationId(organizationId: string) {
        return this.timesheetService.getListByOrganizationId(organizationId);
    }

    getTimeEntiresList(organizationId: string) {
        return this.timesheetService.getListByOrganizationId(organizationId);
    }

    getListByFilter(organizationId: string, filter: any = {}) {
        return this.timesheetService.getListByFilter(organizationId, filter);
    }

    getClockTime(organizationId: string, filter: any = {}) {
        return this.timesheetService.getClockTime(organizationId, filter);
    }

    getTimesheetSubmission(employeeId: string, date: string) {
        return this.timesheetService.getTimesheetSubmission(employeeId, date);
    }

    putTimesheetSubmission(employeeId: string, body: any) {
        return this.timesheetService.putTimesheetSubmission(employeeId, body);
    }

    findOne(id: string) {
        return this.timesheetService.getTimesheetById(id);
    }

    update(id: string, updateTimesheetDto: UpdateTimesheetDto) {
        return this.timesheetService.updateTimesheet(id, updateTimesheetDto);
    }

    remove(id: string) {
        return this.timesheetService.deleteById(id);
    }
}
