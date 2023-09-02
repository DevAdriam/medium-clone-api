import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  commentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  blogPostId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
