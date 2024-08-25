import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-form-data',
  templateUrl: './edit-form-data.component.html',
  styles: `:host {@apply block;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormDataComponent {

}
