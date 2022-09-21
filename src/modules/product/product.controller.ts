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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/createProductDto';
import { ProductDetailsDto } from './dto/productsDetailsDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(@Inject('Service') private svc: ProductService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
