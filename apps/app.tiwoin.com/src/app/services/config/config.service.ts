import { Injectable } from '@angular/core';

import { HttpClient, HttpBackend } from '@angular/common/http';
import { Config } from '@models';
import { environment } from '@environment';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private http: HttpClient;

    constructor(httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    getConfig() {
        const path = `assets/config/${environment.name}.config.json`;
        return this.http.get<Config>(path);
    }
}
