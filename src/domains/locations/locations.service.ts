import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'nestjs-prisma';
import { LocationResponseDto } from './dto/location-response.dto';
import { PaginationService } from '@app/common/pagination/pagination.service';

@Injectable()
export class LocationsService {
  constructor(
    private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<LocationResponseDto> {
    return await this.db.location.create({
      data: createLocationDto,
    });
  }

  async findAll(limit: number, page: number) {
    return this.paginationService.paginate(
      (offset, limit) =>
        this.db.location.findMany({
          skip: offset,
          take: limit,
        }),
      () => this.db.location.count(),
      limit,
      page,
    );
  }

  async findOne(id: string): Promise<LocationResponseDto> {
    const location = await this.db.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Location not found.`);
    }
    return location;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationResponseDto> {
    const location = await this.db.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Location not found.`);
    }

    return await this.db.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const location = await this.db.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Location not found.`);
    }
    await this.db.location.delete({ where: { id } });
    return {
      message: `Delete location with id: ${id} successfully.`,
    };
  }
}
