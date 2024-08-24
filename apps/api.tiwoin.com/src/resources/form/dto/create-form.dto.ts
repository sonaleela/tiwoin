import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

enum FormFieldType {
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

class Description {
    @IsBoolean()
    @IsOptional()
    isIcon: boolean;

    @IsString()
    @IsOptional()
    text: string;
};

class Image {
    @IsString()
    @IsOptional()
    src: string;
}

class CheckboxControl {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    checked: boolean;
}

class DropdownControl {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    value: string;
}

class RadioControl {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    checked: boolean;
}

abstract class FormModal {
    @IsEnum(FormFieldType)
    @IsNotEmpty()
    @IsString()
    type: string;
}

class TextFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    validators: {
        maxlength: { errorMessage: string; maxlength: number };
        minlength: { errorMessage: string; minlength: number };
        pattern: { errorMessage: string; pattern: string };
        required: { errorMessage: string; isRequired: boolean };
    };

    @IsOptional()
    value: string;
}

class TextareaFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    cols: number;
    rows: number;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    validators: {
        required: { errorMessage: string; isRequired: boolean };
    };

    @IsOptional()
    value: string;
}

class NumberFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsOptional()
    value: string;

    validators: {
        max: { errorMessage: string; max: number };
        min: { errorMessage: string; min: number };
        required: { errorMessage: string; isRequired: boolean };
    };
}

class FileFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    validators: { required: { isRequired: boolean; errorMessage: string } };

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;
}

class DateFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    validators: {
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
        required: { errorMessage: string; isRequired: boolean };
    };
}

class TimeFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    validators: {
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
        required: { errorMessage: string; isRequired: boolean };
    };
}

class EmailFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;

    validators: {
        required: { errorMessage: string; isRequired: boolean };
        pattern: { errorMessage: string; pattern: string }
    };
}

class DatetimeFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    validators: {
        required: { errorMessage: string; isRequired: boolean };
        max: { errorMessage: string; max: string };
        min: { errorMessage: string; min: string };
    };
}

class PhoneFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;

    validators: { required: { errorMessage: string; isRequired: boolean } };
}

class CheckboxFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CheckboxControl)
    controls: CheckboxControl[];

    validators?: { required: { errorMessage: string; isRequired: boolean } };
}

class DropdownFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DropdownControl)
    controls: DropdownControl[];
    validators?: { required: { errorMessage: string; isRequired: boolean } };
}

class RadioFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsString()
    @IsOptional()
    placeholder: string;

    @IsBoolean()
    @IsOptional()
    value: string;

    @IsBoolean()
    @IsNotEmpty()
    multiple: boolean;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => RadioControl)
    controls: RadioControl[];
    validators?: { required: { errorMessage: string; isRequired: boolean } };
}

class ToggleFieldModal extends FormModal {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsOptional()
    caption: string;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    image: Image;

    @IsBoolean()
    @IsOptional()
    value: string;

    description?: { isIcon?: boolean; text?: string };
}

type FormField =
    | TextFieldModal
    | TextareaFieldModal
    | NumberFieldModal
    | FileFieldModal
    | DateFieldModal
    | TimeFieldModal
    | EmailFieldModal
    | DatetimeFieldModal
    | PhoneFieldModal
    | CheckboxFieldModal
    | DropdownFieldModal
    | RadioFieldModal
    | ToggleFieldModal;

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsNotEmpty()
    @Type(() => FormModal, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: TextFieldModal, name: FormFieldType.TEXT },
                { value: TextareaFieldModal, name: FormFieldType.TEXTAREA },
                { value: NumberFieldModal, name: FormFieldType.NUMBER },
                { value: FileFieldModal, name: FormFieldType.FILE },
                { value: DateFieldModal, name: FormFieldType.DATE },
                { value: TimeFieldModal, name: FormFieldType.TIME },
                { value: EmailFieldModal, name: FormFieldType.EMAIL },
                { value: DatetimeFieldModal, name: FormFieldType.DATETIME },
                { value: PhoneFieldModal, name: FormFieldType.PHONE },
                { value: CheckboxFieldModal, name: FormFieldType.CHECKBOX },
                { value: DropdownFieldModal, name: FormFieldType.DROPDOWN },
                { value: RadioFieldModal, name: FormFieldType.RADIO },
                { value: ToggleFieldModal, name: FormFieldType.TOGGLE },

            ],
        },
        keepDiscriminatorProperty: true
    })
    fields: FormField[];
}
