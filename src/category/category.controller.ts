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
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/interface/roles.enum';

@Controller('category')
@ApiTags('category')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly category: CategoryService) {}

  @ApiOperation({
    summary: 'get all categories',
  })
  @Get('getCates')
  GetCategory() {
    return this.category.getCategory();
  }

  @ApiOperation({
    summary: 'create cateogry',
  })
  @ApiBody({
    description: 'create category',
    type: CategoryDto,
  })
  @Post('createCate')
  CreateCategory(@Body() dto: CategoryDto) {
    return this.category.createCategory(dto);
  }

  @ApiBody({
    description: 'update category',
    type: CategoryDto,
  })
  @ApiOperation({ summary: 'update category' })
  @ApiConsumes('multipart/form-data')
  @Put('editCate/:id')
  UpdateCategory(@Param('id') id: string, dto: CategoryDto) {
    return this.category.updateCategory(id, dto);
  }

  @ApiOperation({
    summary: 'delete category',
  })
  @Delete('deleteCate/:id')
  DeleteCategory(@Param('id') id: string) {
    return this.category.deleteCategory(id);
  }
}
