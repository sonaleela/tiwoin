import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutType } from '@models';
import { SampleComponent } from './components';

const routes: Routes = [
    {
        path: 'sample',
        component: SampleComponent,
        data: { layout: LayoutType.EMPTY },
    },
    { path: '**', redirectTo: '/?error=404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
