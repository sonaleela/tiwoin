import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterList } from '@models';
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

    getWorkItemSubmissionList(organizationId: string, filter: any = {}) {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get<{ data: WorkItemModal[] }>(`/work-item/submission/${organizationId}`, { params });
    }

    getWorkItem(id: string) {
        return this.httpClient.get<WorkItemModal>(`/work-item/${id}`);
    }

    submitWorkItem(body: any) {
        return this.httpClient.post<any>(`/work-item/submission`, body);
    }
}
