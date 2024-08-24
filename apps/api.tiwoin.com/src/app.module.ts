import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database';
import { ServiceModule } from './service';
import { AuthenticationMiddleware } from './middleware';
import { DataLayerModule } from './data-layer';
import { HealthCheckController, getConfig } from "./shared";
import {
    AdvancePaymentModule,
    DataModule,
    EmployeeModule,
    FormModule,
    OrganizationModule,
    OrganizationUserModule,
    PayrollComponentModule,
    PayrollModule,
    SiteModule,
    TimesheetModule,
    UserModule,
    WorkItemModule,
} from './resources';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [getConfig],
        }),
        OrganizationModule,
        DatabaseModule,
        ServiceModule,
        SiteModule,
        EmployeeModule,
        PayrollModule,
        WorkItemModule,
        FormModule,
        TimesheetModule,
        PayrollComponentModule,
        UserModule,
        DataLayerModule,
        DataModule,
        OrganizationUserModule,
        AdvancePaymentModule,
    ],
    controllers: [HealthCheckController],
    providers: [{
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
    },],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
            .exclude({ path: '/', method: RequestMethod.GET })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
