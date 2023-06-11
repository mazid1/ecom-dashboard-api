import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import IdDto from '../../common/id.dto';
import { IdsDto } from '../../common/ids.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // todo: implement pagination
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param() { id }: IdDto) {
    return this.productsService.findById(id);
  }

  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productsService.create(productDto);
  }

  @Patch(':id')
  patch(@Param() { id }: IdDto, @Body() productDto: PatchProductDto) {
    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    return this.productsService.delete(id);
  }

  @Delete()
  deleteMany(@Body() { ids }: IdsDto) {
    return this.productsService.deleteMany(ids);
  }
}
