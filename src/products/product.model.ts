import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}
