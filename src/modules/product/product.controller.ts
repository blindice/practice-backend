import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { ProductDetailsDto } from './dto/productsDetailsDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(@Inject('Service') private svc: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: ProductDetailsDto,
    description: 'Return array of products',
  })
  async getAll() {
    const result = await this.svc.getAll();
    return result;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ProductDetailsDto,
    description: 'Return a products',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.svc.getById(id);
    return product;
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: ProductDetailsDto,
    description: 'Return newly created products',
  })
  async add(@Body() product: CreateProductDto) {
    const newProduct = await this.svc.add(product);
    return newProduct;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: DeleteResult,
    description: 'Return updated product',
  })
  async delete(@Param('id', ParseIntPipe) id: string) {
    const result = await this.svc.delete(Number(id));
    return result;
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: ProductDetailsDto,
    description: 'Return updated product',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    const updatedProduct = await this.svc.update(id, product);
    return updatedProduct;
  }
}
