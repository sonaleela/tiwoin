import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    fetch() {
        return this.httpClient.get<any>('/user');
    }

    update(id: string, body: any) {
        return this.httpClient.patch(`/user/${id}`, body);
    }

    getUserList(organizationId: string) {
        return this.httpClient.get<{ data: any[] }>(`/user/${organizationId}`);
    }

    updateInvitedUser(organizationId: string, userId: string, body: any) {
        return this.httpClient.patch(`/user/invite/${organizationId}/${userId}`, body);
    }

    deleteInvitedUser(organizationId: string, userId: string) {
        return this.httpClient.delete<any>(`/user/invite/${organizationId}/${userId}`);
    }

    getUser(id: string) {
        return this.httpClient.get(`/user/${id}`);
    }
}
