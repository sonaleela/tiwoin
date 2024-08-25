import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormModal } from '@models';

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

    addForm(body: any) {
        return this.httpClient.post('/form', body);
    }

    deleteForm(id: string) {
        return this.httpClient.delete(`/form/${id}`);
    }

    updateForm(id: string, body: any) {
        return this.httpClient.patch(`/form/${id}`, body);
    }
}
