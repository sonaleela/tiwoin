import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sonaleela-geo-fence',
  templateUrl: './geo-fence.component.html',
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoFenceComponent {
  @Input() geolocation: { lat: number | null, lng: number | null } | null = { lat: null, lng: null };
  @Input() drawingObject: any = null;
  @Input() zoomLevel: number = 0;
  @Output() drawing = new EventEmitter();

  drawingEvent(event: any) {
    this.drawing.emit(event);
  }
}
