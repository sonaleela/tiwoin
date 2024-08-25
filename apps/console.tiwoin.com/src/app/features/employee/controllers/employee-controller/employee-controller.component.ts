import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FetchEmployee } from '../employee.class';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sonaleela-employee-controller',
  templateUrl: `./employee-controller.component.html`,
  styles: `:host {@apply flex flex-col h-full;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeControllerComponent extends FetchEmployee {
  public override store: Store = inject(Store);

  constructor() {
    super();
  }
}
