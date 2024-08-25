import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';

import * as fromStore from '@store';

@Component({
    selector: 'sonaleela-root',
    templateUrl: './app.component.html',
    styles: [':host {@apply block h-full;}'],
})
export class AppComponent {
    private store: Store = inject(Store);

    layout$ = this.store.select(fromStore.selectFirstRouteData).pipe(
        filter(data => !!data?.['layout']),
        map((data) => data?.['layout']),
    );
    getError$ = this.store.select(fromStore.selectQueryParam('error'));

}
