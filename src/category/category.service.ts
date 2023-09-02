import { HttpException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Responser } from 'src/libs/Responser';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategory() {
    try {
      const getAllCategories = await this.prisma.categories.findMany();

      return Responser({
        statusCode: 200,
        message: 'got all categories!',
        devMessage: 'fetch success!',
        body: {
          getAllCategories,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'failed to get categories!',
          devMessage: 'failed to fetch categories!',
        },
        400,
      );
    }
  }

  async createCategory(dto: CategoryDto) {
    try {
      const createdCate = await this.prisma.categories.create({
        data: {
          title: dto.title,
        },
      });

      return Responser({
        statusCode: 201,
        message: 'Successfully created!',
        devMessage: 'category created success!',
        body: {
          createdCate,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'failed to create category',
          devMessage: 'failed! Bad request! ',
        },
        400,
      );
    }
  }

  async updateCategory(id: string, dto: CategoryDto) {
    const updatedCate = await this.prisma.categories.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
      },
    });

    return Responser({
      statusCode: 201,
      message: 'edited category successfully!',
      devMessage: 'Update success!',
      body: {
        updatedCate,
      },
    });
  }

  async deleteCategory(id: string) {
    try {
      const deletedCate = await this.prisma.categories.delete({
        where: {
          id,
        },
      });

      return Responser({
        statusCode: 200,
        message: 'category successfully deleted!',
        devMessage: 'deleted success!',
        body: {
          deletedCate,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'failed to delete!',
          devMessage: 'failed to delete!',
        },
        400,
      );
    }
  }
}
