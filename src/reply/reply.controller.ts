import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReplyDto } from './dto/reply.dto';
import { ReplyService } from './reply.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reply')
@ApiTags('reply')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReplyController {
  constructor(private readonly reply: ReplyService) {}

  @Post('create')
  CreateReply(@Body() dto: ReplyDto) {
    return this.reply.createReply(dto);
  }

  @Delete('delete/:id')
  DeleteReply(@Param('id') id: string) {
    return this.reply.deleteReply(id);
  }
}
