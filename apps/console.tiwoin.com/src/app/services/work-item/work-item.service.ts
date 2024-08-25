import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkItemModal } from '@models';

@Injectable({
    providedIn: 'root',
})
export class WorkItemService {
    constructor(private httpClient: HttpClient) { }

    getWorkItemList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        }
        return this.httpClient.get<WorkItemModal[]>('/work-item', options);
    }

    addWorkItem(body: WorkItemModal) {
        return this.httpClient.post<WorkItemModal>('/work-item', body);
    }

    editWorkItem(id: string, body: Partial<WorkItemModal>) {
        return this.httpClient.patch<WorkItemModal>(`/work-item/${id}`, body);
    }

    getWorkItem(id: string) {
        return this.httpClient.get<WorkItemModal>(`/work-item/${id}`);
    }

    deleteWorkItem(id: string) {
        return this.httpClient.delete<any>(`/work-item/${id}`);
    }

    submitWorkItem(body: any) {
        return this.httpClient.post('/work-item/submission', body);
    }
}
