import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "src/shared";

export class CreateSiteDto {
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { each: true })
    @IsOptional()
    @IsArray()
    emails: string[];

    @IsPhoneNumber("IN", { each: true })
    @IsOptional()
    @IsArray()
    phones: string[];

    @IsObject()
    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsBoolean()
    @IsOptional()
    isDefault: boolean;
}
