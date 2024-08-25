import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-company-nav',
    templateUrl: './company-nav.component.html',
    styles: [':host {@apply flex flex-col justify-between; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyNavComponent { }
