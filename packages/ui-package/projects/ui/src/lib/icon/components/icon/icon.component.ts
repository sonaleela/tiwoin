import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICON_PATH } from '../../config';

@Component({
  selector: 'slui-icon',
  template: `
    <mat-icon style="height: unset; width: unset;"
          [svgIcon]="iconName"></mat-icon>
  `,
  styles: [`:host {display: inline-flex;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  private _name = '';
  @Input() set iconName(icon: string) {
    if (!icon) return;
    this._name = icon;
    this.registerIcon(icon);
  }
  get iconName() {
    return this._name;
  }

  private iconPath: string = '';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(ICON_PATH) iconPath: string
  ) {
    this.iconPath = iconPath;
  }

  registerIcon(icon: string) {
    const path = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.iconPath}/${icon}.svg`);
    this.iconRegistry.addSvgIcon(icon, path);
  }
}
