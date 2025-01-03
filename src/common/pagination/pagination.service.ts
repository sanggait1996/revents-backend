import { Injectable } from '@nestjs/common';
import { PaginationMeta } from '../interfaces/pagination-meta.interface';

@Injectable()
export class PaginationService {
  calculateOffset(limit: number, page: number) {
    return (page - 1) * limit;
  }

  createMeta(limit: number, page: number, count: number): PaginationMeta {
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) return;

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      itemsPerPage: limit,
      totalItems: count,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  async paginate<T>(
    query: (offset: number, limit: number) => Promise<T[]>,
    countQuery: () => Promise<number>,
    limit: number,
    page: number,
  ): Promise<{ data: T[]; meta: PaginationMeta }> {
    const offset = this.calculateOffset(limit, page);
    const data = await query(offset, limit);
    const count = await countQuery();
    const meta = this.createMeta(limit, page, count);
    return { data, meta };
  }
}
