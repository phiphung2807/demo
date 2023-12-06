import dotenv from "dotenv";
import slugify from "slugify";
import ProductPass from "../model/ProductPass";
import { ProductPassSchema } from "../schemas/ProductPass";
import Category from "../model/Category";
dotenv.config;

const getall = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _keywords = "",
  } = req.query;

  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? 1 : -1,
    },
  };
  try {
    const searchData = (products) => {
      return products?.docs?.filter((item) =>
        item?.product_name?.toLowerCase().includes(_keywords)
      );
    };

    const products = await ProductPass.paginate({}, option);

    if (!products.docs || products.docs.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }

    const searchDataProduct = await searchData(products);
    const productResponse = await { ...products, docs: searchDataProduct };

    res.status(200).json({
      message: "Lấy thành công ",
      productResponse,
      pagination: {
        currentPage: products.page,
        totalPages: products.totalPages,
        totalItems: products.totalDocs,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await ProductPass.findById(req.params.id);
    if (!product || product.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    res.status(200).json({
      message: "lấy sẩn phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const product = await ProductPass.findOne({ slug });
    if (!product || product.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      product,
      message: "Lấy sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Xóa sản phẩm
    const product = await ProductPass.findByIdAndDelete(productId);

    // Xóa sản phẩm khỏi danh mục
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: product._id },
    });

    return res.json({
      message: "Xóa sản phẩm thành công!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const createProduct = async (req, res) => {
  const { product_name } = req.body;
  const formData = req.body;
  try {
    const { error } = ProductPassSchema.validate(formData);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // Kiểm tra xem sản phẩm đã tồn tại hay chưa
    const data = await ProductPass.findOne({ product_name });
    if (data) {
      return res.status(400).json({
        message: "Sản phẩm đã tồn tại",
      });
    }

    const product = await ProductPass.create(formData);
    if (!product || product.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }

    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });

    return res.status(200).json({
      message: "thêm thành công ",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  const formData = req.body;
  const id = req.params.id;
  const { product_name } = req.body;
  try {
    // VALIDATE
    const { error } = ProductPassSchema.validate(formData, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const newSlug = slugify(product_name, { lower: true });
    //Lấy lại category cũ
    const oldData = await ProductPassSchema.findById(id);
    const oldCategory = await oldData.categoryId;

    // Update product
    const product = await ProductPass.findByIdAndUpdate(
      id,
      { ...formData, slug: newSlug },
      {
        new: true,
      }
    );

    // Xóa product ở category cũ
    await Category.findByIdAndUpdate(
      {
        _id: oldCategory,
      },
      {
        $pull: { products: product._id },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });

    if (!product || product.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy sản phẩm",
      });
    }
    res.json({
      message: "Cập nhật thành công",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getProductByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await ProductPass.find({ categoryId: id });
    if (!products)
      return res.status(404).json({
        message: "Không tìm thấy sản phấm chứa danh mục này!",
        success: false,
      });

    const productResponse = await { docs: products };
    return res.status(200).json({
      message: "Oke nè!",
      success: true,
      productResponse,
      pagination: {
        currentPage: products.page,
        totalPages: products.totalPages,
        totalItems: products.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};
export { getall, createProduct, deleteProduct, updateProduct };
