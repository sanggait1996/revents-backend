import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto
  implements Omit<Location, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of city',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The place name',
    example: 'Empire State building',
  })
  @IsString()
  @IsNotEmpty()
  venue: string;
}
