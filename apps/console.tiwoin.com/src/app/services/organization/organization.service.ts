import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrganizationModel } from '@models';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(private httpClient: HttpClient) { }

    getUserList(organizationId: string) {
        const options = {
            params: new HttpParams().set('organizationId', organizationId)
        };

        return this.httpClient.get<{ data: any[] }>(`/organization-user`, options);
    }

    createOrganization(body: OrganizationModel) {
        return this.httpClient.post<OrganizationModel>('/organization', body);
    }

    inviteUser(body: any) {
        return this.httpClient.post(`/organization-user`, body);
    }

    getOrganizationUser(id: string) {
        return this.httpClient.get(`/organization-user/${id}`);
    }

    updateUser(organizationUserId: string, body: any) {
        return this.httpClient.patch(`/organization-user/${organizationUserId}`, body);
    }

    deleteUser(id: string) {
        return this.httpClient.delete(`/organization-user/${id}`);
    }
}
