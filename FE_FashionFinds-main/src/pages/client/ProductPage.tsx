import { Link } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getAllProduct, getProductByCategoryId } from "../../actions/product";
import { IProduct } from "../../interface/Product";
import { getAllCategory } from "../../actions/category";
import { ICategory } from "../../interface/Category";
import { Skeleton } from "antd";
const ProductPage = () => {
  /// context
  const { products, isLoading } = useAppSelector((state: any) => state.products);
  const { categories } = useAppSelector((state: any) => state.categories);
  const dispatch = useAppDispatch();

  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Gọi hàm fetch data products
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    setCurrentPage(products.page);
    setTotalPages(products.totalPages);
  }, [dispatch]);

  const getProductByCategory = async (categoryId: any) => {
    dispatch(getProductByCategoryId(categoryId));
  };
  return (
    <main className="product">
      <div className="product_heading page-container px-5">
        <ul className="flex flex-col items-center gap-x-1 mt-3 mb-8">
          <li className="text-sm font-semibold opacity-70 flex">
            <Link to="/" className="hover:text-black">
              Trang chủ
            </Link>
            <p className="px-2">/</p>
            <p>Sản phẩm</p>
          </li>
          {/* <li className="text-xl font-semibold text-secondary ">
            <h1>BÁN CHẠY NHẤT CHO NAM</h1>
          </li> */}
        </ul>
      </div>
      <div className="product_content page-container px-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 bg-white w-full">
            <div className="product_category mb-5">
              <h4 className="text-xl mb-5 ml-3 mt-3 font-bold">
                Loại sản phẩm
              </h4>
              <ul className="flex flex-wrap gap-2 ml-3">
                {categories?.docs?.map((item: ICategory) => (
                  <li
                    key={item._id}
                    className="bg-[#F2F2F2] px-3 py-1 duration-300 transition-all text-[#7A7A9D] hover:bg-white hover:text-secondary hover:border hover:border-secondary rounded-md"
                    onClick={() => getProductByCategory(item._id)}
                  >
                    <Link to="">{item.category_name.length > 15 ? item.category_name.slice(0, 15).concat("...") : item.category_name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="color_product mb-5">
              <h4 className="text-xl mb-5 ml-3 font-bold">Kích thước</h4>
              <ul className="flex flex-wrap gap-2">
                <li className="bg-[#F2F2F2] ml-3 px-3 duration-300 transition-all text-[#7A7A9D] hover:bg-white hover:text-secondary hover:border hover:border-secondary rounded-md">
                  <Link to="">XS</Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="color_product mb-5">
              <h4 className="text-xl mb-5 ml-3 font-bold">Màu sắc</h4>
              <ul className="flex flex-wrap gap-2">
                <li className="bg-[#F2F2F2] ml-3 px-3 duration-300 transition-all text-[#7A7A9D] hover:bg-white hover:text-secondary hover:border hover:border-secondary rounded-md">
                  <Link to="">Đen</Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="col-span-4">
            <div className="flex items-center  py-3 justify-between">
              <span className="text-[#7A7A9D]">{products?.docs?.length} sản phẩm</span>
              <div className="sort-cate-right">
                <label className="title mr-2">Sắp xếp theo</label>
                <select className="px-2 py-2 rounded outline-none hover:border-yellow-300 duration-300 transition-all border">
                  <option value="">Từ A {"->"} Z</option>
                  <option value="">Từ Z {"->"} A</option>
                  <option value="">Giá thấp đến cao</option>
                  <option value="">Giá từ cao đến thấp</option>
                </select>
              </div>
            </div>
            {isLoading ? (<Skeleton active paragraph={{ rows: 6 }} />) : (
              <div className="grid grid-cols-4 gap-4">
                {products?.docs?.map((item: IProduct) => (
                  <div key={item._id} className="flex items-center justify-center">
                    <ProductItem item={item} />
                  </div>
                ))}
              </div>
            )}
            <div className="col-span-4 py-2">
              <div className="col-span-4 py-2">
                <ul className="flex items-center justify-center gap-x-2">
                  <li className="px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white">
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                      key={index + 1}
                      className={`px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white ${index + 1 === currentPage
                        ? "bg-secondary text-black"
                        : ""
                        }`}
                    >
                      <button onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  {/* paginate */}
                  <li className="px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white">
                    <button
                      onClick={() => setCurrentPage((nextPage) => nextPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {">"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
