import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the user',
    example: 'User A',
  })
  @Length(10, 50, { message: 'Name must be between 10 and 50 characters long' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The email of user.',
    example: 'user@gmail.com',
  })
  @Length(10, 50, {
    message: 'Email must be between 10 and 50 characters long',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The password of user.',
    example: 'xxx@123',
  })
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The avatar of user.',
    example: 'avatar.png',
  })
  @IsString()
  photoURL: string | null;

  gender: $Enums.SEX;
}
