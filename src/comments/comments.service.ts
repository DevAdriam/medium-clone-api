import { HttpException, Injectable } from '@nestjs/common';
import { CommentsDto } from './dto/comments.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Responser } from 'src/libs/Responser';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllComments() {
    try {
      const allComments = await this.prisma.comments.findMany({
        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          BlogPosts: {
            select: {
              title: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 200,
        message: 'successfully get all comments!',
        devMessage: 'success!',
        body: {
          allComments,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to get all comments',
          devMessage: 'Failed to fetch all comments!',
        },
        404,
      );
    }
  }

  async getComment(id: string) {
    try {
      const comment = await this.prisma.comments.findUnique({
        where: {
          id,
        },

        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          BlogPosts: {
            select: {
              title: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 200,
        devMessage: 'success!',
        message: 'get comment successfully!',
        body: {
          comment,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to get comment!',
          devMessage: 'Bad Request!',
        },
        400,
      );
    }
  }

  async createComment(dto: CommentsDto) {
    try {
      const comment = await this.prisma.comments.create({
        data: {
          text: dto.text,
          userId: dto.userId,
          blogPostId: dto.blogPostId,
        },
      });

      return Responser({
        statusCode: 201,
        message: 'Commented successfully!',
        devMessage: 'comment created!',
        body: {
          comment,
        },
      });
    } catch {
      throw new HttpException(
        {
          devMessage: 'Bad Request!',
          message: 'Failed to create comment',
        },
        400,
      );
    }
  }

  async updateComment(id: string, dto: CommentsDto) {
    const updatedComment = await this.prisma.comments.update({
      where: {
        id,
      },
      data: {
        text: dto.text,
      },
      include: {
        User: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        BlogPosts: {
          select: {
            title: true,
          },
        },
      },
    });

    return Responser({
      statusCode: 201,
      message: 'Updated successfully!',
      devMessage: 'updated success',
      body: {
        updatedComment,
      },
    });
  }

  async deleteComment(id: string) {
    try {
      const deletedComment = await this.prisma.comments.delete({
        where: {
          id,
        },
        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          BlogPosts: {
            select: {
              title: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 200,
        message: 'Deleted successfully',
        devMessage: 'successfully deleted',
        body: {
          deletedComment,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to delete!',
          devMessage: 'id not found!',
        },
        400,
      );
    }
  }
}
