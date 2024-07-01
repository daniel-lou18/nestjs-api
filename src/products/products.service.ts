import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(name: string, description: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, name, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    name: string,
    description: string,
    price: number,
  ) {
    const [product, productIdx] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (name) {
      updatedProduct.name = name;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[productIdx] = updatedProduct;
    return { ...updatedProduct };
  }

  deleteProduct(productId: string) {
    const productIdx = this.findProduct(productId)[1];
    this.products.splice(productIdx, 1);
  }

  private findProduct(productId: string): [Product, number] {
    const productIdx = this.products.findIndex(
      (product) => product.id === productId,
    );
    const product = this.products[productIdx];

    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    return [product, productIdx];
  }
}
