import { Injectable } from '@nestjs/common';
import { DataDbService } from 'src/data-layer/data-db/data-db.service';
import { TimesheetDbService } from 'src/data-layer';
import { CreateDatumDto } from '../../resources/data/dto/create-datum.dto';
import { UpdateDatumDto } from '../../resources/data/dto/update-datum.dto';
import { ResourceExistsException } from '@aws-sdk/client-secrets-manager';

@Injectable()
export class DataService {
    constructor(
        private dataService: DataDbService,
        private timesheetService: TimesheetDbService,
    ) { }

    findForms(organizationId: string, filter: any) {
        return this.dataService.getFormsByFilter(organizationId, filter);
    }

    editFormData(id: string, data: any) {
        return this.dataService.updateFormData(id, data);
    }

    editWorkItemData(id: string, data: any) {
        return this.dataService.updateWorkItemData(id, data);
    }

    findWorkItems(organizationId: string, filter: any) {
        return this.dataService.getWorkItemsByFilter(organizationId, filter);
    }

    findTimesheets(organizationId: string, filter: any) {
        return this.dataService.getTimesheetByFilter(organizationId, filter);
    }

    findWorkItemById(id: string) {
        return this.dataService.getWorkItemById(id);
    }

    updateWorkItemById(id: string, payload: any) {
        return this.dataService.updateWorkItemById(id, payload);
    }

    findTimesheetById(id: string) {
        return this.dataService.getTimesheetById(id);
    }

    updateTimesheetById(id: string, payload: any) {
        return this.dataService.updateTimesheetById(id, payload);
    }

    findAdvancePayments(organizationId: string, filter: any) {
        return this.dataService.getAdvancePaymentFilter(organizationId, filter);
    }

    async addTimesheet(organizationId: string, employeeId: string, body: any) {
        const existingTimesheet = await this.timesheetService.getTimesheetByFilter({ employeeId, organizationId, date: body.date });
        if (Object.keys(existingTimesheet.data).length !== 0)
            throw new ResourceExistsException({ message: 'Timesheet already exist', $metadata: body?.date });

        return this.dataService.addTimesheet(organizationId, employeeId, body);
    }
}
