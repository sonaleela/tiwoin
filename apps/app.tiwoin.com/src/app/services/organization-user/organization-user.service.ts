import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrganizationUserService {
    constructor(private httpClient: HttpClient) { }


    getOrganizationList() {
        return this.httpClient.get<{ data: any[] }>('/organization-user/organizations');
    }
}
