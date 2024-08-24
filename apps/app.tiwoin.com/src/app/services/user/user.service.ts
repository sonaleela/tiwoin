import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    fetch() {
        return this.httpClient.get<any>('/user');
    }

    update(id: string, body: any) {
        return this.httpClient.patch(`/user/${id}`, body);
    }
}
