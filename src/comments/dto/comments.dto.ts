import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  blogPostId: string;
}

export class UpdateCommentsDto extends PartialType(CommentsDto) {}
