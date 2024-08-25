export enum LayoutType {
    SIDENAV = 'SIDENAV',
    EMPTY = 'EMPTY',
}

export interface SignupPayloadModel {
    fname?: string,
    lname?: string,
    phone_number?: string,
    password?: string,
}

export interface Config {
    name: string;
    sonaleela: {
        basePath: string;
    };
    aws: {
        cognito: {
            region: string;
            userPoolId: string;
            userPoolClientId: string;
        };
    };
    theme: {
        themeStorageKey: string;
        themeList: {
            name: string;
            className: string;
            isDefault?: boolean;
        }[];
    };
}

export interface OrganizationModel {
    id?: string;
    name: string;
    industry?: string[];
    employeeRange?: string,
    cin?: string;
    gst?: string;
    email?: string[];
    phone?: string[];
}
export interface SiteModel {
    organizationId: string;
    id?: string;
    name: string;
    emails?: string[];
    phones?: string[];
    geoFence?: any;
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    isDefault?: boolean;
}

export const IndustryList: {
    name: string;
    icon: string;
    selected?: boolean;
}[] = [
        { name: 'Digital Innovation', icon: 'industry/3d-modeling' },
        { name: 'Food Industry', icon: 'industry/food' },
        { name: 'Tourism Industry', icon: 'industry/travel' },
        { name: 'Education & Training', icon: 'industry/certificate' },
        { name: 'Retail Industry', icon: 'industry/cart' },
        { name: 'Manufacturing', icon: 'industry/factory' },
        { name: 'Construction', icon: 'industry/helmet' },
        { name: 'Other', icon: 'industry/more' },
    ];
export const EmployeeRangeList: { range: string; selected?: boolean }[] = [
    { range: '1 to 10' },
    { range: '11 to 50' },
    { range: '51 to 200' },
    { range: '201 to 500' },
    { range: '501 to 1000' },
    { range: '1001 to 5000' },
    { range: '5001 to 10000' },
    { range: '10000+' },
    { range: '' },
];

export interface EmployeeModel {
    id?: string;
    name: { first: string; middle?: string; last?: string };
    phoneNumber?: string;
    emails?: { email: string; isPrimary: boolean }[];
    organizationId: string,
    joiningDate?: string;
    personnelId?: string;
    phones?: { phone: string; isPrimary: boolean }[];
    workEmail?: string;
    workLocation?: SiteModel;
    designation?: string;
    position?: string;
    PFNumber?: string;
    ESINumber?: string;
    noticePeriod?: string;
    department?: string;
    gender?: string;
    dateOfBirth?: string;
    avatar?: { url?: string };
    employementStatus?: string;
    workStatus?: string;
    bloodGroup?: string;
    payroll: any;
    clockTime: {
        inTime: string,
        outTime: string,
        breakTime: number,
    },
    minimumWorkHours: {
        fullDay: number,
        halfDay: number,
    },
    leaves: {
        paidLeaves: number,
        earnedPaidLeaves: number,
        consumedLeaves: number,
    },
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}

export interface PayrollComponentModel {
    id?: string;
    organizationId: string,
    name: string;
    description?: string;
    type: 'EARNING' | 'DEDUCTION';
    calculationtype: 'FIXED' | 'PERCENTAGE' | 'VARIABLE' | 'PRE-PAYROLL-PROCESSING' | 'USER-BASED';
    percentageOf: 'BASIC' | 'GROSS' | 'NET';
    percentage: number;
    fixedAmount: number;
    minimumAmount: number;
    maximumAmount: number;
    isTaxable: boolean;
}

export interface PayrollModel {
    id?: string;
    name: string;
    organizationId: string;
    description?: string;
    baseDayType: 'CALENDAR' | 'ADJUSTED-SUNDAY' | 'FIXED';
    fixedDay: number;
    earning: PayrollComponentModel[];
    deduction: PayrollComponentModel[];
    perquisites?: any[];
}

export interface WorkItemModal {
    id?: string;
    name: string;
}

export enum FormFieldTypeEnum {
    'TEXT' = 'TEXT',
    'TEXTAREA' = 'TEXTAREA',
    'NUMBER' = 'NUMBER',
    'FILE' = 'FILE',
    'DATE' = 'DATE',
    'TIME' = 'TIME',
    'EMAIL' = 'EMAIL',
    'URL' = 'URL',
    'DATETIME' = 'DATETIME',
    'PHONE' = 'PHONE',
    'CHECKBOX' = 'CHECKBOX',
    'DROPDOWN' = 'DROPDOWN',
    'RADIO' = 'RADIO',
    'TOGGLE' = 'TOGGLE',
}
export interface TextFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.TEXT;
    caption?: string;
    description?: { isIcon: boolean; text: string };
    image?: { src: string };
    placeholder?: string;
    validators?: {
        maxlength: { errorMessage: string; maxlength: number };
        minlength: { errorMessage: string; minlength: number };
        pattern: { errorMessage: string; pattern: string };
        required: { errorMessage: string; isRequired: boolean };
    };
    value?: string;
}
export interface TextareaFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.TEXTAREA;
    cols: number;
    rows: number;
    caption: string;
    description: { text: string; isIcon: boolean };
    image: { src: string };
    placeholder: string;
    validators: {
        required: { errorMessage: string; isRequired: boolean };
    };
    value: string;
}
export interface NumberFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.NUMBER;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: string;
    value: string;
    validators: {
        max: { errorMessage: string; max: number };
        min: { errorMessage: string; min: number };
        required: { errorMessage: string; isRequired: boolean };
    };
}
export interface FileFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.FILE;
    caption: string;
    description: { text: string; isIcon: boolean };
    image: { src: string };
    validators: { required: { isRequired: boolean; errorMessage: string } };
    placeholder: string;
    multiple: boolean;
}
export interface DateFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.DATE;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: '';
    validators: {
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
        required: { errorMessage: string; isRequired: boolean };
    };
    value: string;
}
export interface TimeFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.TIME;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: '';
    validators: {
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
        required: { errorMessage: string; isRequired: boolean };
    };
    value: string;
}
export interface EmailFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.EMAIL;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: string;
    validators: {
        required: { errorMessage: string; isRequired: boolean };
        pattern: { errorMessage: string; pattern: string }
    };
    value: string;
    multiple: boolean;
}
export interface URLFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.URL;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: string;
    validators: { required: { errorMessage: string; isRequired: boolean }; pattern: { errorMessage: string; pattern: string } };
    value: string;
}
export interface DatetimeFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.DATETIME;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: string;
    validators: {
        required: { errorMessage: string; isRequired: boolean };
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
    };
    value: string;
}
export interface PhoneFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.PHONE;
    caption: string;
    description: { isIcon: boolean; text: string };
    image: { src: string };
    placeholder: string;
    validators: { required: { errorMessage: string; isRequired: boolean } };
    value: string;
}
export interface CheckboxFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.CHECKBOX;
    caption?: string;
    description?: { isIcon: boolean; text: string };
    image?: { src: string };
    placeholder?: string;
    controls: { label: string, description: string, value: string, checked: boolean }[];
    validators?: { required: { errorMessage: string; isRequired: boolean } };
    value?: string;
}
export interface DropdownFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.DROPDOWN;
    caption?: string;
    description?: { isIcon: boolean; text: string };
    image?: { src: string };
    placeholder?: string;
    controls: { label: string, description: string, value: string }[];
    validators?: { required: { errorMessage: string; isRequired: boolean } };
    value?: string;
}
export interface RadioFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.RADIO;
    caption?: string;
    description?: { isIcon: boolean; text: string };
    image?: { src: string };
    placeholder?: string;
    controls: { label: string, description: string, value: string, checked: boolean }[];
    validators?: { required: { errorMessage: string; isRequired: boolean } };
    value?: string;
}
export interface ToggleFieldModal {
    id: string;
    label: string;
    type: FormFieldTypeEnum.TOGGLE;
    caption?: string;
    description?: { isIcon: boolean; text: string };
    image?: { src: string };
    value?: string
}

export type FormFieldType =
    | TextFieldModal
    | TextareaFieldModal
    | NumberFieldModal
    | FileFieldModal
    | DateFieldModal
    | TimeFieldModal
    | EmailFieldModal
    | URLFieldModal
    | DatetimeFieldModal
    | PhoneFieldModal
    | CheckboxFieldModal
    | DropdownFieldModal
    | RadioFieldModal
    | ToggleFieldModal;

export interface FormModal {
    id?: string;
    name: string;
    fields: FormFieldType[];
}

export interface UserModel {
    id: string;
    name: string;
    email: string;
    userId: string;
    organizationId: string;
    role: string;
}

export interface TimesheetModel {
    id: string;
    organizationId: string,
    name: string;
    description: string;
    isActive: boolean;
    type: string;
    calculationtype?: string;
    amount?: number;
    percetageValue?: number;
}

export interface PostalData {
    State: string;
    Country: string;
    Name: string;
    District: string;
}

export interface ProfileModel {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    defaultOrganization?: string;
}

export interface DocumentModel {
    id?: string;
    name: string;
    type?: string;
    allowedTypes?: string;
    file?: string;
    requestedBy?: string;
    uploadedBy?: string;
    fileName?: string;
    updatedAt?: string;
}

export const AcceptType: { type: string, mime: string }[] = [
    { type: 'Image', mime: 'image/*' },
    { type: 'Video', mime: 'video/*' },
    { type: 'PDF', mime: '.pdf' },
    { type: 'Document', mime: '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
];

export interface FilterList {
    pageNumber: number | null,
    startDate: string | null,
    endDate: string | null,
    sortBy: string | null,
    direction: string | null,
    page: number | null,
    date: string | null,
    employeeId?: string | null,
}
