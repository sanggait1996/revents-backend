import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto
  implements Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    type: String,
    required: true,
    description: 'Title of event.',
    example: 'Concert of Taylor Swift',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date of event',
    example: '2024-12-30',
  })
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Description of event.',
    example: 'Description of Concert ...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Location Id.',
    example: 'cm5bb97s000003xr5mqytete8',
  })
  @IsString()
  @IsNotEmpty()
  locationId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Category Id.',
    example: 'cm5bb97s000003xr5mqytete8',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'The event cancelled?',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isCancelled: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Host Id.',
    example: 'cm5bb97s000003xr5mqytete8',
  })
  @IsString()
  @IsNotEmpty()
  hostId: string;
}
