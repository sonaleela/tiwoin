import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormGroup } from "@angular/forms";
import { FilterList, FormFieldTypeEnum } from "@models";

// check if subObj is equal to superObj
export const isSubsetShallow = (superObj: { [key: string]: any }, subObj: { [key: string]: any }): boolean => {
    return Object.keys(subObj).every((ele) => {
        return subObj[ele] === superObj[ele];
    });
};

// return icon nanme for form control
export const getControlIconName = (type: FormFieldTypeEnum): string => {
    switch (type) {
        case FormFieldTypeEnum.CHECKBOX: return 'square-check';
        case FormFieldTypeEnum.DATE: return 'calendar-event';
        case FormFieldTypeEnum.DATETIME: return 'calendar-time';
        case FormFieldTypeEnum.DROPDOWN: return 'select';
        case FormFieldTypeEnum.EMAIL: return 'at';
        case FormFieldTypeEnum.FILE: return 'file-description';
        case FormFieldTypeEnum.NUMBER: return 'numbers';
        case FormFieldTypeEnum.PHONE:
        case FormFieldTypeEnum.RADIO: return 'circle-check';
        case FormFieldTypeEnum.TEXTAREA:
        case FormFieldTypeEnum.TEXT: return 'forms';
        case FormFieldTypeEnum.TIME: return 'clock';
        case FormFieldTypeEnum.TOGGLE: return 'toggle-right';
        case FormFieldTypeEnum.URL: return 'link';
    }
}

// remove null | undefined from object
export function removeEmpty(obj: any) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

// empty filter object
export function emptyFilterObject(): FilterList {
    return {
        pageNumber: null,
        startDate: null,
        endDate: null,
        sortBy: null,
        direction: null,
        page: null,
        date: null,
        employeeId: null,
    }
};


/**
 * Get error message out of error response
 * 
 * @param errorObject HttpErrorResponse
 * @returns 
 */
export function extractErrorMessage(errorObject: HttpErrorResponse): string {
    if (errorObject.error && errorObject.error.message) {
        return Array.isArray(errorObject.error.message)
            ? errorObject.error.message.join(' ')
            : errorObject.error.message;
    }
    return errorObject.message;
}