import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimesheetModel } from '@models';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimesheetService {

    constructor(private httpClient: HttpClient) { }

    getTimesheetList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        };

        return this.httpClient.get<TimesheetModel[]>('/timesheet', options);
    }

    getTimesheetData(organizationId: string, filter: any = {}): Observable<{ data: any[] }> {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get<{ data: TimesheetModel[] }>(`/timesheet/submission/${organizationId}`, { params });
    }

    getTimesheet(uid: string) {
        if (!uid) throwError('Employee id empty');

        return this.httpClient.get<TimesheetModel>(`/timesheet/${uid}`);
    }

    clockEntry(employeeId: string, body: any) {
        return this.httpClient.put(`/timesheet/submission/${employeeId}`, body);
    }

    getClockEntry(organizationId: string) {
        return this.httpClient.get<{ data: any }>(`/timesheet/clock/${organizationId}`);
    }

    getEntryType(organizationId: string) {
        const params = new HttpParams({ fromObject: { organizationId } });
        return this.httpClient.get<Partial<{ name: string, type: string }>[]>(`/timesheet`, { params });
    }
}
