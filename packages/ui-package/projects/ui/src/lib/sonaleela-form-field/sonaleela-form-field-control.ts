import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class SonaleelaFormFieldControl<T> {
    value: T | null = null;

    readonly stateChanges: Observable<void> = new Observable();

    readonly placeholder: string = '';

    readonly ngControl: NgControl | null = null;

    readonly focused: boolean = false;

    readonly required: boolean | string = false;

    readonly disabled: boolean | string = false;

    readonly readonly: boolean | string = false;

    readonly errorState: boolean = false;

    readonly autoFilled: boolean = false;
}
