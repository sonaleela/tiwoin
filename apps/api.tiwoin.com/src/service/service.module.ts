import { Global, Module } from '@nestjs/common';

import { DataService } from "./data/data.service";
import { EmployeeService } from './employee/employee.service';
import { FormService } from './form/form.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationUserService } from "./organization-user/organization-user.service";
import { PayrollService } from './payroll/payroll.service';
import { PayrollComponentService } from './payroll-component/payroll-component.service';
import { SiteService } from './site/site.service';
import { TimesheetService } from './timesheet/timesheet.service';
import { UserService } from './user/user.service';
import { WorkItemService } from './work-item/work-item.service';
import { AdvancePaymentService } from './advance-payment/advance-payment.service';


@Global()
@Module({
    providers: [
        EmployeeService,
        FormService,
        OrganizationService,
        PayrollService,
        PayrollComponentService,
        SiteService,
        TimesheetService,
        UserService,
        WorkItemService,
        DataService,
        OrganizationUserService,
        AdvancePaymentService,
    ],
    exports: [
        EmployeeService,
        FormService,
        OrganizationService,
        PayrollService,
        PayrollComponentService,
        SiteService,
        TimesheetService,
        UserService,
        WorkItemService,
        DataService,
        OrganizationUserService,
        AdvancePaymentService,
    ]
})
export class ServiceModule { }
