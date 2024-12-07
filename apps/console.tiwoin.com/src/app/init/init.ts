import { EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '@store';

export let INIT: (store: Store) => () => Promise<void> = (store: Store) => {
    return () => {
        store.dispatch(fromStore.InitializeApplicationBegin());

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

export const appInitializerProvider: EnvironmentProviders[] = [
    provideAppInitializer(() => {
        const initializerFn = (INIT)(inject(Store));
        return initializerFn();
    }),
];
