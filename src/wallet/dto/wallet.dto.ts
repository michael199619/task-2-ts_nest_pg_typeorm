import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsNumber,
    IsOptional,
    IsIn, IsBoolean, ValidateNested, IsInt,
} from 'class-validator';

import {Expose, Transform, Type} from "class-transformer";

export class WalletDto {
    @Expose()
    @IsInt()
    readonly userId: number;

    @IsInt()
    @Expose()
    readonly currencyId: number;
}