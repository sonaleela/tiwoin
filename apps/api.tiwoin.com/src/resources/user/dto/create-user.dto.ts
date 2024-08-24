import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phoneNumber: string;
}
