import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SiteModel } from '@models';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SiteService {
    constructor(private httpClient: HttpClient) { }

    getSiteList(id: string) {
        const options = {
            params: new HttpParams().set('organizationId', id)
        };

        return this.httpClient.get<SiteModel[]>('/site', options);
    }

    getSite(uid: string) {
        if (!uid) throwError('Employee id empty');
        return this.httpClient.get<SiteModel>(`/site/${uid}`);
    }
}
