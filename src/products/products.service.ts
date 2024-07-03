import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ name, description, price });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
    }));
  }

  async getProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId });
    if (result.deletedCount === 0)
      throw new NotFoundException('Could not find product');
  }

  private async findProduct(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(productId);
    } catch (err) {
      throw new NotFoundException(
        err instanceof Error ? err.message : 'Unexpected Server Error',
      );
    }

    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    return product;
  }
}
