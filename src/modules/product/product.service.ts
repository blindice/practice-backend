import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { ProductDetailsDto } from './dto/productsDetailsDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async getAll(): Promise<ProductDetailsDto[]> {
    const products = await this.repo.find();

    if (!products)
      throw new HttpException('Invalid Products!', HttpStatus.BAD_REQUEST);

    const dto: ProductDetailsDto[] = [...products];

    return dto;
  }

  async getById(id: number): Promise<ProductDetailsDto> {
    const product = await this.repo.findOneBy({ fld_id: id });

    if (!product)
      throw new HttpException('Product Not Found!', HttpStatus.NOT_FOUND);

    const dto: ProductDetailsDto = { ...product };

    return dto;
  }

  async add(product: CreateProductDto): Promise<ProductDetailsDto> {
    const newProduct = await this.repo.create(product);
    await this.repo.save(newProduct);

    const dto: ProductDetailsDto = { ...newProduct };

    return dto;
  }

  async delete(id: number) {
    const deletedProduct = await this.repo.delete(id);
    return deletedProduct;
  }

  async update(id: number, product: UpdateProductDto) {
    await this.repo.update(id, product);
    const updatedProduct = await this.getById(id);

    return updatedProduct;
  }
}
