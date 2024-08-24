import { Global, Module } from '@nestjs/common';
import { OrganizationDBService } from './organizationDB/organization.service';
import { UserDbService } from './user-db/user-db.service';
import { EmployeeDbService } from '../data-layer/employee-db/employee-db.service';
import { WorkItemDbService } from './work-item-db/work-item-db.service';
import { TimesheetDbService } from './timesheet-db/timesheet-db.service';
import { PayrollComponentDbService } from './payroll-component-db/payroll-component-db.service';
import { PayrollDbService } from './payroll-db/payroll-db.service';
import { FormDbService } from './form-db/form-db.service';
import { SiteDbService } from './site-db/site-db.service';
import { DataDbService } from "./data-db/data-db.service";
import { OrganizationUserDbService } from './organization-user-db/organization-user-db.service';
import { AdvancePaymentDbService } from './advance-payment-db/advance-payment-db.service';

@Global()
@Module({
    providers: [
        OrganizationDBService,
        UserDbService,
        EmployeeDbService,
        WorkItemDbService,
        TimesheetDbService,
        PayrollComponentDbService,
        PayrollDbService,
        FormDbService,
        SiteDbService,
        DataDbService,
        OrganizationUserDbService,
        AdvancePaymentDbService,
    ],
    exports: [
        OrganizationDBService,
        UserDbService,
        EmployeeDbService,
        WorkItemDbService,
        TimesheetDbService,
        PayrollComponentDbService,
        PayrollDbService,
        FormDbService,
        SiteDbService,
        DataDbService,
        OrganizationUserDbService,
        AdvancePaymentDbService,
    ],
})
export class DataLayerModule { }
