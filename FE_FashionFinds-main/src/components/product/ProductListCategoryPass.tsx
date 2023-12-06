import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import ProductItemPass from "./ProductItemPass";
import { GetAllCategories, GetProductByCategory } from "../../api/Category";
import { ICategoryPass } from "../../interface/CategoryPass";

type ProductListCategoryPass = {
  categoryId: string
};

const ProductListCategory: React.FC<ProductListCategoryPass> = ({
  categoryId
}) => {
  const [categoryProductsPass, setCategoryProductsPass] = useState([]);
  const [categoriesPass, setCategoriesPass] = useState<ICategoryPass[]>([]);
  const [categoryName, setCategoryNamePass] = useState('');

  useEffect(() => {
    fetchCategoryProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await GetAllCategories();
      setCategoriesPass(response.data.CategoryResponse.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryName();
  }, [categoryId, categoriesPass]);

  const fetchCategoryName = async () => {
    const category = categoriesPass?.find((categoriesPass) => categoriesPass._id === categoryId);
    if (category) {
        setCategoryNamePass(category.category_name_pass);
    }
  };

  const fetchCategoryProducts = async () => {
    try {
      const response = await GetProductByCategory(categoryId);
      setCategoryProductsPass(response.data.products);
      setCategoryNamePass(response.data.categoryName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold">{categoryName}</h2>
      <Swiper
        breakpoints={{
          350: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1023: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        spaceBetween={10}
        slidesPerGroup={5}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="category_list"
      >
        {categoryProductsPass.map((product) => (
          <SwiperSlide key={uuidv4()}>
            <ProductItemPass item={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

};

export default ProductListCategory;
