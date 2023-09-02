import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';
import { ReplyModule } from './reply/reply.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    BlogPostsModule,
    CategoryModule,
    CommentsModule,
    ReplyModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
