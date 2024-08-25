import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-loader',
  template: `
    <div class="animate-spin h-8 w-8 rounded-full border-2 border-transparent border-t-blue-500"></div>
    <p>Loading...</p>
  `,
  styles: [`:host { @apply flex flex-col gap-2 items-center justify-center p-10 h-full w-full; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent { }
