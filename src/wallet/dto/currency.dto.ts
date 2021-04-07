import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsNumber,
    IsOptional,
    IsIn, IsBoolean, ValidateNested, IsInt,
} from 'class-validator';

import {Expose, Transform, Type} from "class-transformer";

export class CurrencyDto {
    @Expose()
    @IsString()
    readonly name: string;
}