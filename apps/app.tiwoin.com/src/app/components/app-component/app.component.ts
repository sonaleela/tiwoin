import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromStore from "@store";

@Component({
    selector: 'tiwoin-root',
    templateUrl: './app.component.html',
    styles: [':host {@apply block h-full;}'],
})
export class AppComponent {
    private store: Store = inject(Store);

    layout$ = this.store.select(fromStore.selectRouteData).pipe(map((data) => data?.['layout']));
    isOffline$ = this.store.select(fromStore.selectIsOffline);
    isLocationOff$ = this.store.select(fromStore.selectIsLocationOff);

    allowDeviceLoaction() {
        this.store.dispatch(fromStore.DeviceGeoLocationBegin());
    }
}
