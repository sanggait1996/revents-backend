import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryResponseDto implements Omit<Category, ''> {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The id of the category',
    example: 'cm5bad71t000036z0memenaei',
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of category',
    example: 'New York',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The value of category',
    example: 'value',
  })
  value: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the category was created',
    example: '2024-12-30T17:03:56.192Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the category was updated',
    example: '2024-12-30T17:03:56.192Z',
  })
  updatedAt: Date;
}
