import { APP_INITIALIZER, Provider } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '@store';

export let INIT: (store: Store) => () => Promise<void> = (store: Store) => {
    return () => {
        store.dispatch(fromStore.InitializeApplicationBegin());
        store.dispatch(fromStore.InternetStatusBegin());

        return new Promise((resolve, reject) => {
            store.select(fromStore.selectIsConfigLoaded).subscribe(
                (isLoaded) => {
                    if (isLoaded) {
                        resolve();
                    }
                },
                (error) => {
                    reject();
                },
            );
        });
    };
};

export const appInitializerProvider: Provider[] = [
    {
        provide: APP_INITIALIZER,
        useFactory: INIT,
        deps: [Store],
        multi: true,
    },
];
