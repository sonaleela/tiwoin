import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    public industry: string[];

    @IsString()
    public employeeRange?: string;

    @IsOptional()
    @IsString()
    public cin: string;

    @IsOptional()
    @IsString()
    public gst: string;

    @IsEmail({}, { each: true })
    @IsOptional()
    public email: string[];

    @IsPhoneNumber("IN", { each: true })
    @IsOptional()
    public phone: string[];
}
