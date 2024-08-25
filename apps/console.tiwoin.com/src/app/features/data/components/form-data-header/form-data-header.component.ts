import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-form-data-header',
  templateUrl: './form-data-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataHeaderComponent { }
