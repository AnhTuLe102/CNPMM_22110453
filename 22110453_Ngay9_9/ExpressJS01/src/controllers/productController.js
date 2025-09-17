import { fetchProducts } from "../services/productService.js";

export const getProduct = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 5,
      category,
      promotion,
      minPrice = 0,
      maxPrice = 60000000,
      minViews = 0,
      minRating = 0,
      search = "",
    } = req.query;

    const productsData = await fetchProducts({
      page,
      pageSize,
      category,
      promotion,
      minPrice,
      maxPrice,
      minViews,
      minRating,
      search,
    });

    res.json({
      EC: 0,
      DT: productsData,
      EM: "",
    });
  } catch (error) {
    console.error("Error in productController:", error);
    res.status(500).json({
      EC: 1,
      DT: null,
      EM: "Có lỗi xảy ra khi tải dữ liệu",
    });
  }
};
