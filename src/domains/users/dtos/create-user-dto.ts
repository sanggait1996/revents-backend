import { $Enums, User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  photoURL: string;

  gender: $Enums.SEX;
}
