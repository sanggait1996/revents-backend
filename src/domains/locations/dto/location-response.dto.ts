import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';

export class LocationResponseDto implements Omit<Location, ''> {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The id of the location',
    example: 'cm5bad71t000036z0memenaei',
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of city',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of place',
    example: 'Empire State building',
  })
  venue: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was created',
    example: '2024-12-30T17:01:01.554Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was created',
    example: '2024-12-30T17:03:56.192Z',
  })
  updatedAt: Date;
}
