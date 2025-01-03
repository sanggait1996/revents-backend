import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperationDecorator } from '@app/common/decorators/api-operation.decorator';
import { LocationResponseDto } from './dto/location-response.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperationDecorator({
    type: LocationResponseDto,
    summary: 'Create a location',
    description: 'Create a new location',
  })
  @Post()
  create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<LocationResponseDto> {
    return this.locationsService.create(createLocationDto);
  }

  @ApiOperationDecorator({
    type: [LocationResponseDto],
    summary: 'Find all locations',
    description: 'Find all locations',
  })
  @Get()
  findAll(@Query('limit') limit = 10, @Query('page') page = 1) {
    return this.locationsService.findAll(+limit, +page);
  }

  @ApiOperationDecorator({
    type: LocationResponseDto,
    summary: 'Get location by id',
    description: 'Get location by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<LocationResponseDto> {
    return this.locationsService.findOne(id);
  }

  @ApiOperationDecorator({
    type: LocationResponseDto,
    summary: 'Update location by id',
    description: 'Update location by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<LocationResponseDto> {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.locationsService.remove(id);
  }
}
