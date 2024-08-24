import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PayrollModel } from '@models';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PayrollService {
    constructor(private httpClient: HttpClient) { }

    getPayroll(uid: String) {
        if (!uid) throwError('Employee id empty');
        return this.httpClient.get<PayrollModel>(`/payroll/${uid}`);
    }
}
