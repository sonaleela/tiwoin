import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";
import dayjs from 'dayjs';

/**
 * Form validator to check if entries in timesheet are in ascending order.
 * 
 * @returns ValidatorFn
 */
export function timesheetTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const controls = (<FormArray>control).controls;
        const times: string[] = controls.map(control => control.value.time).filter(t => !!t);

        if (times.length < 2) return null;
        if (times.length % 2 === 0) control.setErrors(null);

        const isAfterTime = times.every((time, index): boolean => {
            if (index === 0) return true;
            const hour = +time!.split(':')[0];
            const minute = +time!.split(':')[1];
            const preivousHour = +times[index - 1]!.split(':')[0];
            const previousMinute = +times[index - 1]!.split(':')[1];

            const currentTime = dayjs().hour(hour).minute(minute);
            const previousTime = dayjs().hour(preivousHour).minute(previousMinute);
            return currentTime.isAfter(previousTime);
        });

        return isAfterTime ? null : { timeError: true };
    }
}
