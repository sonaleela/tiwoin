import { Component } from '@angular/core';

@Component({
  selector: 'tiwoin-root',
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  styles: []
})
export class AppComponent {
  title = 'console.tiwoin.com';
}
