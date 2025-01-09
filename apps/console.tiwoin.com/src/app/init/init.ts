import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '@store';

type INITType = (store: Store) => () => Promise<void>

export let initApplication: INITType = (store: Store) => {
    return () => {
        store.dispatch(fromStore.InitializeApplicationBegin());

        return new Promise((resolve, reject) => {
            store.select(fromStore.selectIsConfigLoaded).subscribe({
                next: (isLoaded) => {
                    if (isLoaded) {
                        resolve();
                    }
                },
                error: _ => {
                    reject();
                },
            });
        });
    };
};

export const appInitializerProvider: EnvironmentProviders = provideAppInitializer(() => {
    const store = inject(Store);
    const initializerFn = initApplication(store);
    return initializerFn();
});
