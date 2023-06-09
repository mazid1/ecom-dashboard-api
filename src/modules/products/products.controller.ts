import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';
import IdDto from 'src/common/id.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  patch(@Param() { id }: IdDto, @Body() interviewDto: PatchProductDto) {
    return this.productsService.update(id, interviewDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    this.productsService.delete(id);
  }

  // todo: implement batch delete route
}
