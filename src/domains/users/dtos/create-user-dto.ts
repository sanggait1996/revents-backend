import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  marialStatus: string;

  @IsEnum($Enums.SEX)
  sex: $Enums.SEX;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
