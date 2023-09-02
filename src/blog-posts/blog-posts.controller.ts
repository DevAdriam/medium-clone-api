import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BlogPostsService } from './blog-posts.service';
import { BlogDto, ShareDto, UpdateBlogDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IauthRequest } from 'src/@types/authRequest';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/libs/fileStorage';

@Controller('blog-posts')
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BlogPostsController {
  constructor(private readonly postService: BlogPostsService) {}

  @ApiOperation({ summary: 'get All posts' })
  @Get('getAll')
  GetAllPosts() {
    return this.postService.getAllPosts();
  }

  @ApiOperation({ summary: 'get post' })
  @Get('getPost/:id')
  GetOnePost(@Param('id') id: string) {
    return this.postService.getOnePost(id);
  }

  @ApiOperation({ summary: 'create Post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Post',
    type: BlogDto,
  })
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, fileStorage))
  CreatePost(
    @Body() dto: BlogDto,
    @Req() req: IauthRequest,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.postService.createPost(dto, req.user.id, images);
  }

  @ApiOperation({ summary: 'Share Post' })
  @ApiBody({
    description: 'share Post',
    type: ShareDto,
  })
  @Post('share/:id')
  SharePost(@Param('id') id: string, @Body() dto: ShareDto) {
    return this.postService.sharePost(id, dto);
  }

  @ApiOperation({ summary: 'update Post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'update Post',
    type: UpdateBlogDto,
  })
  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('images', 10, fileStorage))
  EditPost(
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.postService.editPost(id, dto, images);
  }

  @Delete('delete/:id')
  DeletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
