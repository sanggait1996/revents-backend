import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationService } from '@app/common/pagination/pagination.service';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    return await this.db.event.create({
      data: createEventDto,
    });
  }

  findAll(limit: number, page: number) {
    return this.paginationService.paginate(
      (offset, limit) =>
        this.db.event.findMany({
          skip: offset,
          take: limit,
        }),
      () => this.db.event.count(),
      limit,
      page,
    );
  }

  async findOne(id: string): Promise<EventResponseDto> {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event not found.`);
    }
    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Location not found.`);
    }

    return await this.db.event.update({
      where: {
        id,
      },
      data: updateEventDto,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const event = await this.db.event.findUnique({ where: { id } });

    if (!event) throw new NotFoundException('Event not found.');

    await this.db.event.delete({ where: { id } });

    return {
      message: `Delete event with id: ${id} successfully.`,
    };
  }
}
