import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsPhoneNumber, isString, IsString, IsUUID, ValidateNested } from "class-validator";
import { AddressDto } from "src/shared";

class EmployeeName {
    @IsString()
    @IsNotEmpty()
    first: string;

    @IsString()
    @IsOptional()
    middle: string;

    @IsString()
    @IsOptional()
    last: string
}

class EmployeeEmail {
    @IsEmail()
    @IsString()
    email: string;

    @IsBoolean()
    @IsOptional()
    isPrimary: boolean;
}
class EmployeePhone {
    @IsPhoneNumber('IN')
    @IsString()
    phone: string;

    @IsBoolean()
    @IsOptional()
    isPrimary: boolean;
}

class Avatar {
    @IsString()
    @IsNotEmpty()
    url: string;
}

enum Gender {
    'Male' = 'Male',
    'Female' = 'Female',
    'Other' = 'Other',
}

enum Status {
    'Active' = 'Active',
    'Inactive' = 'Inactive'
}

export class CreateEmployeeDto {
    @IsObject()
    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => EmployeeName)
    name: EmployeeName;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => EmployeeEmail)
    emails: EmployeeEmail[];

    @IsDateString()
    @IsOptional()
    @IsString()
    joiningDate: string;

    @IsString()
    @IsOptional()
    personnelId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => EmployeePhone)
    phones: string[];

    @IsEmail()
    @IsOptional()
    workEmail: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    workLocation: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    organizationId: string;

    @IsString()
    @IsOptional()
    designation: string;

    @IsString()
    @IsOptional()
    department: string;

    @IsEnum(Gender)
    @IsOptional()
    gender: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => Avatar)
    avatar: Avatar;

    @IsEnum(Status)
    @IsNotEmpty()
    employementStatus: string;

    @IsString()
    @IsOptional()
    bloodGroup: string;

    @IsString()
    @IsOptional()
    payroll: any;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}
