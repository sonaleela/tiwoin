import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-geo-fence',
    templateUrl: './geo-fence.component.html',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GeoFenceComponent {
  readonly geolocation = input<{
    lat: number | null;
    lng: number | null;
} | null>({ lat: null, lng: null });
  readonly drawingObject = input<any>(null);
  readonly zoomLevel = input<number>(0);
  readonly drawing = output();

  drawingEvent(event: any) {
    this.drawing.emit(event);
  }
}
