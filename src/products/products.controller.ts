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
  addProduct(
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    const productId = this.productsService.insertProduct(
      productName,
      productDescription,
      productPrice,
    );
    return { id: productId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    this.productsService.updateProduct(
      productId,
      productName,
      productDescription,
      productPrice,
    );
    return null;
  }

  @Delete(':id')
  deletetProduct(@Param('id') productId: string) {
    this.productsService.deleteProduct(productId);
    return null;
  }
}
