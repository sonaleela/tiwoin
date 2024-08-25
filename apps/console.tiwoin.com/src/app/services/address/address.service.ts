import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostalData } from '@models';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private http: HttpClient;

    constructor(httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    getAddressList(pincode: string): Observable<PostalData[]> {
        return this.http.get(`https://api.postalpincode.in/pincode/${pincode}`).pipe(
            map((response: any) => {
                if (Array.isArray(response) && response[0]?.Status === 'Success') return response[0]?.PostOffice;
                if (response?.Status === 'Success') return response?.PostOffice;
                return [];
            })
        );
    }

    getGeoLocation(address: string, postalCode: string): Observable<{ lat: number, lng: number }> {
        const key = 'AIzaSyBLVSUJlR5Bregurgz_hc5D2O0m45kPRq4';
        const parameters = encodeURI(address);
        const country = 'country:IN';
        // const pincode = `postal_code:${postalCode}`
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${parameters}&key=${key}&components=${country}`;
        return this.http.get(url).pipe(
            map((response: any) => {
                if (response?.status === 'OK') {
                    return response?.results[0]?.geometry?.location;
                }
                return { lat: null, lng: null };
            })
        );
    }

    getDeviceLocation(): Observable<{ lat: number, lng: number }> {
        if ('geolocation' in navigator) {
            return new Observable<{ lat: number, lng: number }>(subscribe => {
                navigator.geolocation.watchPosition((position) => {
                    subscribe.next({ lat: position.coords.latitude, lng: position.coords.longitude });
                }, error => {
                    subscribe.error(error);
                }, {
                    enableHighAccuracy: true
                })
            });
        } else {
            return EMPTY;
        }
    }
}
