import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { DocumentModel, EmployeeModel, FilterList } from '@models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    getEmployeeList(id: string, filter?: any) {
        const options = {
            params: new HttpParams({ fromObject: { ...filter, organizationId: id } }),
        };

        return this.httpClient.get<{data: EmployeeModel[]}>('/employee', options);
    }

    getEmployee(uid: string) {
        if (!uid) throwError('Employee id empty');
        return this.httpClient.get<EmployeeModel>(`/employee/${uid}`);
    }

    addEmployee(body: EmployeeModel & { userId: string }) {
        return this.httpClient.post<EmployeeModel>('/employee', body);
    }

    updateEmployee(id: string, body: Partial<EmployeeModel>) {
        return this.httpClient.patch<EmployeeModel>(`/employee/${id}`, body);
    }

    deleteEmployee(id: string) {
        return this.httpClient.delete<any>(`/employee/${id}`);
    }

    getDocumentList(employeeId: string) {
        return this.httpClient.get<any[]>(`/employee/${employeeId}/document`);
    }

    requestDocument(employeeId: string, body: DocumentModel) {
        return this.httpClient.post<DocumentModel>(`/employee/${employeeId}/document`, body)
    }
}
