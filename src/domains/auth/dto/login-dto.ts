import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto
  implements
    Omit<
      User,
      'id' | 'createdAt' | 'updatedAt' | 'name' | 'photoURL' | 'gender'
    >
{
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
