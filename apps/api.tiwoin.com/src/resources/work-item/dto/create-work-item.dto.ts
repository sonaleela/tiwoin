import { Type } from "class-transformer";
import { IsDecimal, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class WorkItem {
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    unitPrice: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    deductionCost: number;
}

export class CreateWorkItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsObject()
    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => WorkItem)
    workItem: WorkItem;
}
