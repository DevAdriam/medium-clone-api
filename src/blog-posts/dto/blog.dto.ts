import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class BlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @Transform(({ value }) => value.split(','))
  @IsArray()
  categoryId: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @Transform(({ value }) => value.split(','))
  @IsArray()
  LikePosts: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  public images: any[];
}

export class ShareDto {
  @ApiProperty()
  text?: string;

  @ApiProperty()
  userId: string;
}

export class UpdateBlogDto extends PartialType(BlogDto) {}
