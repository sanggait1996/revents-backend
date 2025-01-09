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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperationDecorator } from '@app/common/decorators/api-operation.decorator';
import { EventResponseDto } from './dto/event-response.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperationDecorator({
    type: EventResponseDto,
    summary: 'Create a event',
    description: 'Create a new event',
  })
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventResponseDto> {
    return this.eventsService.create(createEventDto);
  }

  @ApiOperationDecorator({
    type: EventResponseDto,
    summary: 'Find all events',
    description: 'Find all events',
  })
  @Get()
  findAll(@Query('limit') limit = 10, @Query('page') page = 1) {
    return this.eventsService.findAll(+limit, +page);
  }

  @ApiOperationDecorator({
    type: EventResponseDto,
    summary: 'Get event by id',
    description: 'Get event by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventResponseDto> {
    return this.eventsService.findOne(id);
  }

  @ApiOperationDecorator({
    type: EventResponseDto,
    summary: 'Update event by id',
    description: 'Update event by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.update(id, updateEventDto);
  }

  @ApiOperationDecorator({
    type: EventResponseDto,
    summary: 'Delete event by id',
    description: 'Delete event by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.eventsService.remove(id);
  }
}
