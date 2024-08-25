import { Component } from '@angular/core';

@Component({
    selector: 'sonaleela-signout-page',
    template: `<sonaleela-signout-controller></sonaleela-signout-controller>`,
    styles: [
        `
            :host {
                @apply block
            }
        `,
    ],
})
export class SignoutPageComponent { }
