import esClient from "../config/elasticsearch.js";

async function createIndex() {
  await esClient.indices.create({
    index: "products",
    mappings: {
      properties: {
        name: { type: "text" },
        category: { type: "keyword" },
        price: { type: "float" },
        promotion: { type: "boolean" },
        views: { type: "integer" },
        description: { type: "text" },
        stock: { type: "integer" },
        rating: { type: "float" },
        createdAt: { type: "date" },
        updatedAt: { type: "date" },
      },
    },
  });
  console.log("Index 'products' created!");
  process.exit(0);
}

createIndex();
