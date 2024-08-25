import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimesheetModel } from '@models';
import { throwError } from 'rxjs';

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

  addTimesheet(body: TimesheetModel) {
    return this.httpClient.post('/timesheet', body);
  }

  getTimesheet(uid: string) {
    if (!uid) throwError('Employee id empty');

    return this.httpClient.get<TimesheetModel>(`/timesheet/${uid}`);
  }

  deleteTimesheet(id: string) {
    return this.httpClient.delete(`/timesheet/${id}`);
  }

  updateTimesheet(id: string, timesheet: Partial<TimesheetModel>) {
    return this.httpClient.patch<TimesheetModel>(`/timesheet/${id}`, timesheet);
  }
}
