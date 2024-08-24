import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '@models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    getDocumentList(employeeId: string) {
        return this.httpClient.get<any[]>(`/employee/${employeeId}/document`);
    }

    updateDocument(payload: any) {
        return this.httpClient.patch(`/employee/document/${payload?.id}`, payload);
    }

    getEmployee(uid: any) {
        return this.httpClient.get(`/employee/${uid}`);
    }

    updateEmployeeProfile(id: string, employee: Partial<EmployeeModel>) {
        return this.httpClient
            .patch<{ value: EmployeeModel }>(`/employee/${id}`, employee)
            .pipe(map(response => response.value));
    }
}
