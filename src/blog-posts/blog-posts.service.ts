import { HttpException, Injectable } from '@nestjs/common';
import { Responser } from 'src/libs/Responser';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogDto, ShareDto, UpdateBlogDto } from './dto';

@Injectable()
export class BlogPostsService {
  constructor(private prisma: PrismaService) {}
  async getAllPosts() {
    try {
      const allPosts = await this.prisma.bLogPosts.findMany({
        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          categoriesOnPosts: {
            select: {
              category: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          LikesPost: {
            select: {
              User: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
              userId: true,
              blogPostId: true,
            },
          },
          Comments: {
            select: {
              id: true,
              text: true,
            },
          },
        },
      });

      return Responser({
        statusCode: 200,
        message: 'got all posts success!',
        devMessage: 'success to get all posts',
        body: {
          allPosts,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Bad Request',
          devMessage: 'Bad Request',
        },
        400,
      );
    }
  }

  async getOnePost(id: string) {
    try {
      const getOnePost = await this.prisma.bLogPosts.findUnique({
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
          categoriesOnPosts: true,
          LikesPost: true,
        },
      });

      return Responser({
        statusCode: 200,
        message: 'Post successfully found!',
        devMessage: 'Post found',
        body: {
          getOnePost,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'bad request',
          devMessage: 'Bad Request',
        },
        400,
      );
    }
  }

  async createPost(
    dto: BlogDto,
    userId: string,
    images: Express.Multer.File[],
  ) {
    try {
      const createdPost = await this.prisma.bLogPosts.create({
        data: {
          title: dto.title,
          description: dto.description,
          userId,
        },
        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      console.log(createdPost, dto.categoryId);

      dto.categoryId.map(async (cateId) => {
        await this.prisma.categoriesOnPosts.create({
          data: {
            blogPostId: createdPost.id,
            categoryId: cateId,
          },
        });
      });

      dto.LikePosts.map(async (likeUserId) => {
        await this.prisma.likePosts.create({
          data: {
            userId: likeUserId,
            blogPostId: createdPost.id,
          },
        });
      });

      images.map(async (image) => {
        await this.prisma.images.create({
          data: {
            imageUrl: image.path,
            blogPostId: createdPost.id,
          },
        });
      });

      return Responser({
        statusCode: 201,
        message: 'Blog created successfully!',
        devMessage: 'Blog created!',
        body: {
          createdPost,
        },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Bad request',
          devMessage: 'Bad Request',
        },
        400,
      );
    }
  }

  async sharePost(postId: string, dto: ShareDto) {
    try {
      const sharePostInBlogSchema = await this.prisma.bLogPosts.create({
        data: {
          description: '',
          title: dto.text,
          userId: dto.userId,
        },
      });

      await this.prisma.sharePost.create({
        data: {
          UserId: dto.userId,
          BlogPostId: postId,
        },
      });

      return Responser({
        message: 'Shared Succesfully!',
        devMessage: 'Shared success!',
        statusCode: 201,
        body: {
          sharePostInBlogSchema,
          blogPostId: postId,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to share this post!',
          devMessage: 'Failed to share!',
        },
        400,
      );
    }
  }

  async editPost(
    id: string,
    dto: UpdateBlogDto,
    images: Express.Multer.File[],
  ) {
    try {
      const updatedPost = await this.prisma.bLogPosts.update({
        where: {
          id,
        },
        data: {
          title: dto.title,
          description: dto.description,
        },
        include: {
          User: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      dto.categoryId.map(async (cate) => {
        await this.prisma.categoriesOnPosts.create({
          data: {
            blogPostId: updatedPost.id,
            categoryId: cate,
          },
        });
      });

      dto.LikePosts.map(async (like) => {
        await this.prisma.likePosts.create({
          data: {
            userId: like,
            blogPostId: updatedPost.id,
          },
        });
      });

      images.map(async (image) => {
        await this.prisma.images.create({
          data: {
            imageUrl: image.path,
            blogPostId: updatedPost.id,
          },
        });
      });

      return Responser({
        statusCode: 201,
        message: 'Edited Successfully',
        devMessage: 'Edit Post success',
        body: updatedPost,
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to edit Post',
          devMessage: 'Bad requests',
        },
        400,
      );
    }
  }

  async deletePost(id: string) {
    try {
      const deletePost = await this.prisma.bLogPosts.delete({
        where: {
          id,
        },
      });

      return Responser({
        statusCode: 200,
        message: 'Successfully Deleted!',
        devMessage: 'post deleted!',
        body: {
          deletePost,
        },
      });
    } catch {
      throw new HttpException(
        {
          message: 'Failed to Delete',
          devMessage: 'Failed to delete',
        },
        400,
      );
    }
  }
}
