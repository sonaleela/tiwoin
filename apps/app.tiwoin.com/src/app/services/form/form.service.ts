import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormModal } from '@models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    constructor(private httpClient: HttpClient) { }

    getFormList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        };
        return this.httpClient.get<FormModal[]>('/form', options);
    }

    getForm(uid: string) {
        return this.httpClient.get<FormModal>(`/form/${uid}`);
    }

    getFormSubmissionList(organizationId: string, filter: any = {}): Observable<{ data: any[] }> {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get<{ data: any[] }>(`/form/submission/${organizationId}`, { params });
    }

    getFormSubmission(uid: string) {
        return this.httpClient.get<{ data: FormModal }>(`/form/submission/data/${uid}`);
    }

    getFormData() {
        return this.httpClient.get('/data/form');
    }

    submitForm(body: any) {
        return this.httpClient.post<any>(`/form/submission`, body);
    }
}
