import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationService } from '@app/common/pagination/pagination.service';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.db.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(limit: number, page: number) {
    return await this.paginationService.paginate(
      (offset, limit) =>
        this.db.category.findMany({
          skip: offset,
          take: limit,
        }),
      () => this.db.category.count(),
      limit,
      page,
    );
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.db.category.findUnique({ where: { id } });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found.`);

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.db.category.findUnique({ where: { id } });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found.`);

    return await this.db.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const category = await this.db.category.findUnique({ where: { id } });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found.`);

    await this.db.category.delete({ where: { id } });

    return { message: `Delete category with id: ${id} successfully.` };
  }
}
