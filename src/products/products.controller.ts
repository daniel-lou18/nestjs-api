import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    const productId = await this.productsService.insertProduct(
      productName,
      productDescription,
      productPrice,
    );
    return { id: productId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    await this.productsService.updateProduct(
      productId,
      productName,
      productDescription,
      productPrice,
    );
    return null;
  }

  @Delete(':id')
  async deletetProduct(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return null;
  }
}
