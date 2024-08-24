import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';

import { IconComponent } from './components';
import { ICON_PATH } from './config';


@NgModule({
  imports: [CommonModule, HttpClientModule, MatIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class SluiIconModule {
  static forRoot(config: { 'icon-path': string }): ModuleWithProviders<SluiIconModule> {
    return {
      ngModule: SluiIconModule,
      providers: [{
        provide: ICON_PATH,
        useValue: config['icon-path']
      }]
    }
  }
}
