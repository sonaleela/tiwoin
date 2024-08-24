import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrganizationModel } from '@models';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(private httpClient: HttpClient) {}

    createOrganization(body: OrganizationModel) {
        return this.httpClient.post<OrganizationModel>('/organization', body);
    }

    /**
     * Update user invitation by accepting or rejecting it
     */
    updateInvitation(organizationUserId: string, body: any) {
        return this.httpClient.patch(`/organization-user/${organizationUserId}`, body);
    }
}
