/// <reference types="@types/google.maps" />
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    /**
     * Get current location
     * 
     * @returns 
     */
    getDeviceLocation(): Observable<{ lat: number, lng: number }> {
        if ('geolocation' in navigator) {
            return new Observable<{ lat: number, lng: number }>(subscribe => {
                // Fetch current geolocation
                navigator.geolocation.watchPosition((position) => {
                    subscribe.next({ lat: position.coords.latitude, lng: position.coords.longitude });
                }, error => {
                    if (error.code === 1) subscribe.error({ state: 'denied', ...error });
                    subscribe.error(error);
                }, {
                    enableHighAccuracy: true
                });

                // Check permission
                navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                    result.addEventListener('change', _ => {
                        if (result.state === 'denied') {
                            subscribe.error({
                                state: result.state,
                                message: "User denied Geolocation"
                            });
                        }
                        if (result.state === 'granted') {
                            subscribe.next();
                        }
                    });
                })
            });
        } else {
            return EMPTY;
        }
    }

    /**
     * Convert geoJson to an array of points to make a google map consumable polygon
     * 
     * @param geoJson 
     * @returns 
     */
    geoJsonToGooglePolygon(geoJson: { type: string, features: { type: string, geometry: { type: string, coordinates: [number, number][][] } }[] }): any {
        if (!geoJson) return;
        const polygon: { lat: number, lng: number }[] = [];
        geoJson.features[0].geometry.coordinates[0].forEach(point => {
            polygon.push({ lat: point[1], lng: point[0] })
        });
        polygon.pop();
        return polygon;
    }

    /**
     * Check if point is in geoJson area
     * 
     * @param geoJson 
     * @param point 
     * @returns 
     */
    containsLocation(geoJson: { type: string, features: { type: string, geometry: { type: string, coordinates: [number, number][][] } }[] }, point: { lat: number, lng: number }) {
        if (!geoJson || !google.maps.geometry) return false;

        const polygon = new google.maps.Polygon({ paths: this.geoJsonToGooglePolygon(geoJson) });
        return google.maps.geometry.poly.containsLocation({ lat: point.lat, lng: point.lng }, polygon);
    }
}
