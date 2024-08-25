import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-side-nav-mini',
    template: `
        <slui-icon class="h-5 w-5 text-gray-800"
                 iconName="menu"></slui-icon>
    `,
    styles: [`:host {@apply flex flex-col items-center w-9 py-2 h-full bg-gray-75 border-r border-gray-300;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavMiniComponent { }
