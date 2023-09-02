import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto/comments.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly comments: CommentsService) {}

  @Get('getAll')
  GetAllComments() {
    return this.comments.getAllComments();
  }

  @Get('getOne/:id')
  GetOneComment(@Param('id') id: string) {
    return this.comments.getComment(id);
  }

  @Post('create')
  CreateComment(@Body() dto: CommentsDto) {
    return this.comments.createComment(dto);
  }

  @Put('update/:id')
  UpdateComment(@Param('id') id: string, @Body() dto: CommentsDto) {
    return this.comments.updateComment(id, dto);
  }

  @Delete('delete/:id')
  DeleteComment(@Param('id') id: string) {
    return this.comments.deleteComment(id);
  }
}
