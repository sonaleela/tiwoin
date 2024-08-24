import { Injectable } from '@angular/core';
import { EMPTY, Observable, from, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebApiService {
    abortController = new AbortController();

    constructor() { }

    /**
     * Fetch otp using WebOTP api
     */
    fetchOTPCredential() {
        if ("OTPCredential" in window) {
            const options: CredentialRequestOptions | any = { otp: { transport: ['sms'] }, signal: this.abortController.signal };
            navigator.credentials.get(options).then(value => {
                alert(`value , ${value}`);
                this.abortController.abort();
            });
            // return from(navigator.credentials.get(options));
            return EMPTY;
        } else {
            return EMPTY;
        }
    }

    /**
     * Check network connection status
     * 
     * @returns Observable<boolean>
     */
    checkInternetStatus() {
        return new Observable<boolean>(subscriber => {
            window.addEventListener('offline', event => {
                subscriber.next(true);
            });
            window.addEventListener('online', event => {
                subscriber.next(false);
            })
        });
    }
}
