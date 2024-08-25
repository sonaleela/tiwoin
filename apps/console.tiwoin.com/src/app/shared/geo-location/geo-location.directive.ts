/// <reference types="@types/google.maps" />
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[sonaleelaGeoLocation]',
    standalone: true
})
export class GeoLocationDirective {
    @Input() set geolocation(location: object) {
        if (!location) return;
        if (!this.map) this.initMap();

        this.map?.data.addGeoJson(location);
        this.zoomToFirDataLayer(this.map);
        this.animateMapZoomTo(this.map, 16);
    }

    map?: google.maps.Map;

    constructor(private elementRef: ElementRef) { }

    getNativeElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }

    initMap() {
        const element = this.getNativeElement();
        const center = { lat: 30, lng: -110 };
        this.map = new google.maps.Map(element, { center, zoom: 1 });
    }

    zoomToFirDataLayer(map?: google.maps.Map) {
        if (!map) return;
        const bounds = new google.maps.LatLngBounds();

        map.data.forEach((feature) => {
            const geometry = feature.getGeometry();

            if (geometry) {
                this.processPoints(geometry, bounds.extend, bounds);
            }
        });
        map.fitBounds(bounds);
    }

    processPoints(
        geometry: google.maps.LatLng | google.maps.Data.Geometry,
        callback: any,
        thisArg: google.maps.LatLngBounds
    ) {
        if (geometry instanceof google.maps.LatLng) {
            callback.call(thisArg, geometry);
        } else if (geometry instanceof google.maps.Data.Point) {
            callback.call(thisArg, geometry.get());
        } else {
            // @ts-ignore
            geometry.getArray().forEach((g) => {
                this.processPoints(g, callback, thisArg);
            });
        }
    }

    animateMapZoomTo(map: any, targetZoom: any, current = 0) {
        var currentZoom = current || map.getZoom();
        if (currentZoom != targetZoom) {
            google.maps.event.addListenerOnce(map, 'zoom_changed', (event: any) => {
                this.animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(function () { map.setZoom(currentZoom) }, 200);
        }
    }
}
