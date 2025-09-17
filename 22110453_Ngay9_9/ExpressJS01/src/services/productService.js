import esClient from "../config/elasticsearch.js";

export const fetchProducts = async ({
  page,
  pageSize,
  category,
  promotion,
  minPrice,
  maxPrice,
  minViews,
  minRating,
  search,
}) => {
  const pageNum = parseInt(page, 10);
  const sizeNum = parseInt(pageSize, 10);
  const from = (pageNum - 1) * sizeNum;

  // Build Elasticsearch query
  const queryBody = {
    from,
    size: sizeNum,
    query: {
      bool: {
        must: [],
        filter: [],
      },
    },
    sort: [{ _score: "desc" }],
  };

  // Fuzzy search
  if (search) {
    queryBody.query.bool.must.push({
      match: {
        name: {
          query: search,
          fuzziness: "AUTO",
          prefix_length: 1,
        },
      },
    });
  } else {
    queryBody.query.bool.must.push({ match_all: {} });
  }

  // Filters
  if (category) {
    queryBody.query.bool.filter.push({ term: { category } });
  }

  if (promotion === "true") {
    queryBody.query.bool.filter.push({ term: { promotion: true } });
  }

  queryBody.query.bool.filter.push({
    range: {
      price: {
        gte: parseFloat(minPrice),
        lte: parseFloat(maxPrice),
      },
    },
  });

  queryBody.query.bool.filter.push({
    range: {
      views: {
        gte: parseInt(minViews, 10),
      },
    },
  });

  queryBody.query.bool.filter.push({
    range: {
      rating: {
        gte: parseFloat(minRating),
      },
    },
  });

  // Execute search
  const esResponse = await esClient.search({
    index: "products",
    body: queryBody,
  });

  const products = esResponse.hits.hits.map((hit) => hit._source);
  const totalProducts = esResponse.hits.total.value;

  // Pagination
  const hasNextPage = pageNum * sizeNum < totalProducts;
  const nextPage = hasNextPage ? pageNum + 1 : null;

  return {
    products,
    pagination: {
      totalProducts,
      currentPage: pageNum,
      hasNextPage,
      nextPage,
    },
  };
};
