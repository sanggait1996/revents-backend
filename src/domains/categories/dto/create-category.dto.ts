import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto
  implements Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of category',
    example: 'Social Event',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The value of category',
    example: 'value',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
