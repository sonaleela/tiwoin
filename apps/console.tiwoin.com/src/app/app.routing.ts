import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutType } from '@models';

const routes: Routes = [
    { path: '**', redirectTo: '/?error=404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
