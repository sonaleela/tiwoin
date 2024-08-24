import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";

enum PayrollType {
    'EARNING' = 'EARNING',
    'DEDUCTION' = 'DEDUCTION',
}

enum BaseDayType {
    'CALANDER' = 'CALANDER',
    'ADJUSTED-SUNDAY' = 'ADJUSTED-SUNDAY',
    'FIXED' = 'FIXED'
}

enum PayrollCalculationType {
    'FIXED' = 'FIXED',
    'PERCENTAGE' = 'PERCENTAGE',
    'VARIABLE' = 'VARIABLE',
    'PRE-PAYROLL-PROCESSING' = 'PRE-PAYROLL-PROCESSING',
    'USER-BASED' = 'USER-BASED'
}

enum PercentageOf {
    'BASIC' = 'BASIC',
    'GROSS' = 'GROSS',
    'NET' = 'NET'
}

export class PayrollComponent {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(PayrollType)
    @IsNotEmpty()
    type: string;

    @IsEnum(PayrollCalculationType)
    @IsNotEmpty()
    calculationtype: string;

    @IsEnum(PercentageOf)
    @IsOptional()
    percentageOf: string;

    @IsInt()
    @Min(0)
    @Max(99)
    @IsOptional()
    percentage: number;

    @IsInt()
    @IsOptional()
    fixedAmount: number;

    @IsInt()
    @IsOptional()
    minimumAmount: number;

    @IsInt()
    @IsOptional()
    maximumAmount: number;

    @IsBoolean()
    @IsNotEmpty()
    isTaxable: boolean;
}

export class CreatePayrollDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(BaseDayType)
    @IsNotEmpty()
    baseDayType: string;

    @IsInt()
    @Min(28)
    @Max(31)
    @IsOptional()
    fixedDay: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PayrollComponent)
    earning: PayrollComponent[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PayrollComponent)
    deduction: PayrollComponent[];

    @IsArray()
    @IsOptional()
    perquisites: any[];
}