/// <reference types="@types/google.maps" />
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[sonaleelaGeoFence]'
})
export class GeoFenceDirective implements OnInit {
    @Input() set geolocation(location: { lat: number | null, lng: number | null } | null) {
        if (location && location?.lat && location?.lng) {
            this.map?.setCenter({ lat: location?.lat, lng: location?.lng });
        }
    }

    @Input() set zoomLevel(zoom: number) {
        if (!zoom) return;
        this.animateMapZoomTo(this.map, zoom);
    }

    @Input() set drawingObject(drawing: any) {
        if (!drawing) return;
        // this.map?.data.addListener('setgeometry', (event: any) => {
        //     this.map?.data.toGeoJson((obj: any) => {
        //         console.log({ obj });
        //         this.drawing.emit(obj);
        //     })
        // });
        this.map?.data.addGeoJson(drawing);
        this.map?.data.setStyle({
            // draggable: true,
            fillColor: '#ccc',
            strokeColor: '#333',
            clickable: true,
            strokeWeight: 1,
            fillOpacity: 0.3,
        });
        this.zoomToFirDataLayer(this.map);
    }

    @Output() drawing = new EventEmitter();

    map?: google.maps.Map;
    drawingManager: google.maps.drawing.DrawingManager | undefined;
    shape: any;
    drawingContainer: HTMLElement | null = null;
    constructor(private elementRef: ElementRef) {
    }

    async ngOnInit() {
        await this.initMap();
        this.overlayCompleteListner();
        this.setDrawingManager();
        this.addClearDrawing();
    }

    animateMapZoomTo(map: any, targetZoom: any, current = 0) {
        if (!map) return;
        var currentZoom = current || map.getZoom();
        if (currentZoom != targetZoom) {
            google.maps.event.addListenerOnce(map, 'zoom_changed', (event: any) => {
                this.animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(function () { map.setZoom(currentZoom) }, 200);
        }
    }

    getNativeElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }

    async initMap() {
        const element = this.getNativeElement();
        const center = { lat: 30, lng: -110 };
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        this.map = new Map(element, { center, zoom: 1 });

        const { DrawingManager } = await google.maps.importLibrary("drawing") as google.maps.DrawingLibrary;
        this.drawingManager = new DrawingManager({
            drawingControl: false,
            drawingControlOptions: {
                drawingModes: [
                    google.maps.drawing.OverlayType.RECTANGLE,
                    google.maps.drawing.OverlayType.POLYGON,
                ],
            },
            rectangleOptions: {
                fillColor: '#ccc',
                strokeColor: '#333',
                clickable: true,
                draggable: true,
                strokeWeight: 1,
                fillOpacity: 0.3,
            },
            polygonOptions: {
                fillColor: '#ccc',
                strokeColor: '#333',
                clickable: true,
                draggable: true,
                strokeWeight: 1,
                fillOpacity: 0.3,
            }
        })
    }

    overlayCompleteListner() {
        if (!this.drawingManager) return;
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
            this.drawingManager?.setDrawingMode(null);
            this.setButtonActive();

            this.map?.data.setMap(null);
            if (this.shape) {
                this.shape?.overlay?.setMap(null);
            };
            this.shape = event;

            google.maps.event.addListener(event.overlay, 'dragend', (_: any) => {
                this.drawing.emit(this.getGeoJson(event.overlay));
            });
            this.drawing.emit(this.getGeoJson(event.overlay));
        });
    }

    setDrawingManager() {
        if (!this.map) return
        this.drawingManager?.setMap(this.map);
    }

    getGeoJson(overlay: google.maps.Rectangle | google.maps.Polygon): any {
        if (overlay instanceof google.maps.Rectangle) {
            return {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [overlay.getBounds()?.getNorthEast().lng(), overlay.getBounds()?.getNorthEast().lat()],
                                    [overlay.getBounds()?.getNorthEast().lng(), overlay.getBounds()?.getSouthWest().lat()],
                                    [overlay.getBounds()?.getSouthWest().lng(), overlay.getBounds()?.getSouthWest().lat()],
                                    [overlay.getBounds()?.getSouthWest().lng(), overlay.getBounds()?.getNorthEast().lat()],
                                    [overlay.getBounds()?.getNorthEast().lng(), overlay.getBounds()?.getNorthEast().lat()],
                                ]
                            ]
                        }
                    }
                ]
            };
        }
        if (overlay instanceof google.maps.Polygon) {
            return {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    ...overlay.getPath().getArray().map((line: any) => ([line.lng(), line.lat()])),
                                    [overlay.getPath().getArray()[0].lng(), overlay.getPath().getArray()[0].lat()],
                                ]
                            ]
                        }
                    }
                ]
            };
        }
    }

    createDrawingContainer() {
        const drawingContainer = document.createElement('div');

        drawingContainer.style.backgroundColor = '#fff';
        drawingContainer.style.borderRadius = '3px';
        drawingContainer.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        drawingContainer.style.color = 'rgb(25,25,25)';
        drawingContainer.style.cursor = 'pointer';
        drawingContainer.style.fontFamily = 'Roboto,Arial,sans-serif';
        drawingContainer.style.fontSize = '16px';
        drawingContainer.style.margin = '8px 8px 22px';
        drawingContainer.style.padding = '0 5px';
        drawingContainer.style.textAlign = 'center';
        drawingContainer.style.height = '40px';
        drawingContainer.style.display = 'flex';

        return drawingContainer;
    }

    createDrawingButton(type?: google.maps.drawing.OverlayType.POLYGON | google.maps.drawing.OverlayType.RECTANGLE): HTMLButtonElement {
        const controlButton = document.createElement('button');
        controlButton.type = 'button';
        controlButton.style.padding = '0 12px';
        const icon = new Image();
        if (type === google.maps.drawing.OverlayType.RECTANGLE) {
            icon.src = '/assets/icons/rectangle.svg';
            controlButton.title = 'Click to draw rectangle';
            controlButton.dataset['type'] = google.maps.drawing.OverlayType.RECTANGLE;
        }
        if (type === google.maps.drawing.OverlayType.POLYGON) {
            icon.src = '/assets/icons/polygon.svg';
            controlButton.title = 'Click to draw polygon';
            controlButton.dataset['type'] = google.maps.drawing.OverlayType.POLYGON;
        }
        if (!type) {
            icon.src = '/assets/icons/tabler-icon-trash.svg';
            controlButton.title = 'Click to clear drawing';
            controlButton.dataset['type'] = 'delete';
        }
        controlButton.appendChild(icon);
        controlButton.addEventListener('click', () => {
            if (type === google.maps.drawing.OverlayType.RECTANGLE) {
                this.drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
                this.setButtonActive(google.maps.drawing.OverlayType.RECTANGLE);
            }
            if (type === google.maps.drawing.OverlayType.POLYGON) {
                this.drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                this.setButtonActive(google.maps.drawing.OverlayType.POLYGON);
            }
            if (!type) {
                this.drawingManager?.setDrawingMode(null);
                this.shape?.overlay?.setMap(null);
                this.map?.data.setMap(null);
                this.setButtonActive();
            }
        });
        return controlButton;
    }

    setButtonActive(type?: google.maps.drawing.OverlayType.POLYGON | google.maps.drawing.OverlayType.RECTANGLE) {
        Array.from(this.drawingContainer!.children).forEach((element) => {
            (<HTMLElement>element).style.backgroundColor = '#fff';
            if ((<HTMLElement>element).dataset['type'] === type) {
                (<HTMLElement>element).style.backgroundColor = '#ddd';
            }
        });
    }

    addClearDrawing() {
        this.drawingContainer = this.createDrawingContainer();
        const clearButton = this.createDrawingButton();
        const drawingRectangleButton = this.createDrawingButton(google.maps.drawing.OverlayType.RECTANGLE);
        const drawingPolygonButton = this.createDrawingButton(google.maps.drawing.OverlayType.POLYGON);

        // Append the control to the DIV.
        this.drawingContainer.appendChild(drawingRectangleButton);
        this.drawingContainer.appendChild(drawingPolygonButton);
        this.drawingContainer.appendChild(clearButton);

        this.map?.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.drawingContainer);
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
}
