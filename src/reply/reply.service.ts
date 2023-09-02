import { HttpException, Injectable } from '@nestjs/common';
import { ReplyDto } from './dto/reply.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Responser } from 'src/libs/Responser';

@Injectable()
export class ReplyService {
  constructor(private readonly prisma: PrismaService) {}
  async createReply(dto: ReplyDto) {
    try {
      const reply = await this.prisma.replies.create({
        data: {
          text: dto.text,
          commentId: dto.commentId,
          blogPostId: dto.blogPostId,
          userId: dto.userId,
        },
        include: {
          Comment: {
            select: {
              text: true,
            },
          },
          blogPosts: {
            select: {
              title: true,
            },
          },
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 201,
        message: 'successfully replied!',
        devMessage: 'successfully replied!',
        body: {
          reply,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to reply!',
          devMessage: 'bad request',
        },
        400,
      );
    }
  }

  async deleteReply(id: string) {
    try {
      const deletedReply = await this.prisma.replies.delete({
        where: {
          id,
        },
      });

      return Responser({
        message: 'deleted Successfully!',
        devMessage: 'reply deleted!',
        statusCode: 200,
        body: {
          deletedReply,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to delete reply',
          devMessage: 'Failed to delete!',
        },
        400,
      );
    }
  }
}
