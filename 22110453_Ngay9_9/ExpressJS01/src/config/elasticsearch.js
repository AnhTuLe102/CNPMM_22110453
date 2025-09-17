// config/elasticsearch.js
import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
  node: "http://localhost:9200", // đổi nếu server ES chạy ở host khác
});

export default esClient;
