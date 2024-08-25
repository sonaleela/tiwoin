import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PayrollComponentModel, PayrollModel } from '@models';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PayrollService {
    constructor(private httpClient: HttpClient) { }

    getPayrollList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        };

        return this.httpClient.get<PayrollModel[]>('/payroll', options);
    }

    addPayroll(body: PayrollModel) {
        return this.httpClient.post('/payroll', body);
    }

    updatePayroll(id: string, body: PayrollModel) {
        return this.httpClient.patch(`/payroll/${id}`, body);
    }

    deletePayroll(id: string) {
        return this.httpClient.delete<any>(`/payroll/${id}`);
    }

    deletePayrollComponent(id: string) {
        return this.httpClient.delete<any>(`/payroll-component/${id}`);
    }

    getPayroll(uid: String) {
        if (!uid) throwError('Employee id empty');
        return this.httpClient.get<PayrollModel>(`/payroll/${uid}`);
    }

    getPayrollComponentList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        };
        return this.httpClient.get<PayrollComponentModel[]>('/payroll-component', options);
    }

    addPayrollComponent(body: PayrollComponentModel): Observable<PayrollComponentModel> {
        return this.httpClient.post<PayrollComponentModel>('/payroll-component', body);
    }
}
