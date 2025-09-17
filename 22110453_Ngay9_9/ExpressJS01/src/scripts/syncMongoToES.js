import mongoose from "mongoose";
import esClient from "../config/elasticsearch.js";
import { Product } from "../models/product.js";

async function syncProducts() {
  await mongoose.connect(
    "mongodb+srv://leanhtupr3:123@test.agznsey.mongodb.net/"
  ); // sửa lại tên DB nếu cần

  const products = await Product.find();

  for (const product of products) {
    await esClient.index({
      index: "products",
      id: product._id.toString(),
      document: {
        name: product.name,
        category: product.category,
        price: product.price,
        promotion: product.promotion,
        views: product.views,
        description: product.description,
        stock: product.stock,
        rating: product.rating,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  }

  console.log("Đồng bộ xong!");
  process.exit(0);
}

syncProducts();
