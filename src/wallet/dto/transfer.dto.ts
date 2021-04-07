import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsNumber,
    IsOptional,
    IsIn, IsBoolean, ValidateNested, IsInt, Min,
} from 'class-validator';

import {Expose, Transform, Type} from "class-transformer";

export class TransferDto {
    @Expose()
    @IsInt()
    readonly walletFromId: number;

    @IsInt()
    @Expose()
    readonly walletToId: number;

    @IsNumber()
    @Min(1)
    @Expose()
    readonly sum: number;
}