import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsNumber,
    IsOptional,
    IsIn, IsBoolean, ValidateNested, IsInt, Min,
} from 'class-validator';

import {Expose, Transform, Type} from "class-transformer";

export class WalletDto {
    @Expose()
    @Min(1)
    @IsInt()
    readonly userId: number;

    @IsInt()
    @Min(1)
    @Expose()
    readonly currencyId: number;
}