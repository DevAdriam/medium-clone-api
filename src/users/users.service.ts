import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Responser } from 'src/libs/Responser';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          BlogPosts: {
            select: {
              title: true,
            },
          },
          LikePosts: {
            select: {
              blogPost: {
                select: {
                  title: true,
                },
              },
            },
          },
          Comments: {
            select: {
              text: true,
            },
          },
          Replies: {
            select: {
              blogPosts: {
                select: {
                  id: true,
                  title: true,
                },
              },
              Comment: {
                select: {
                  id: true,
                  text: true,
                },
              },
              id: true,
              text: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 200,
        message: 'all users successfully get!',
        devMessage: 'success',
        body: {
          users,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to get all users!',
          devMessage: 'Bad requests',
        },
        400,
      );
    }
  }

  async findOne(id: string) {
    try {
      const singleUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return Responser({
        statusCode: 200,
        message: 'User successfully found!',
        devMessage: 'User successfull found',
        body: {
          singleUser,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to get one user',
          devMessage: 'Cannot found with that id',
        },
        401,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const hashedUpdPw = await hash(updateUserDto.password);
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          email: updateUserDto.email,
          password: hashedUpdPw,
        },
      });

      return Responser({
        statusCode: 201,
        message: 'User updated successfully',
        devMessage: 'User updated!',
        body: {
          updatedUser,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to edit!',
          devMessage: 'Failed to update',
        },
        400,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return Responser({
        statusCode: 200,
        message: 'User deleted successfully!',
        devMessage: 'User deleted!',
        body: {
          deletedUser,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to delete User!',
          devMessage: 'Failed User to delete',
        },
        400,
      );
    }
  }
}
