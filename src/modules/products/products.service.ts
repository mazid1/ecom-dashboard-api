import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(productDto: CreateProductDto) {
    const product = new this.productModel(productDto);
    return product.save();
  }

  async update(id: string, productDto: PatchProductDto) {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, productDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return updatedProduct;
  }

  async delete(id: string) {
    const result = this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }

  // todo: implement delete many
}
