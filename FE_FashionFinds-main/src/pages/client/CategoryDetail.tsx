// import { useEffect, useState } from "react";
// import { GetAllCategories, GetCategoryProducts } from "../../api/Category";
// import { IProduct } from "../../interface/Product";
// import ProductItem from "../../components/product/ProductItem";
// import { useParams } from "react-router-dom";
// import { ICategory } from "../../interface/Category";

// const CategoryDetailPage = () => {
//   const { categoryId } = useParams();
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   const [categoryName, setCategoryName] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, [categoryId]);

//   const fetchProducts = async () => {
//     try {
//       if (categoryId) {
//         const response = await GetCategoryProducts(categoryId);
//         setProducts(response.data.products);

//         const category = categories.find((category) => category._id === categoryId);
//         if (category) {
//           setCategoryName(category.category_name); // Lấy tên danh mục
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await GetAllCategories();
//       setCategories(response.data.CategoryResponse.docs);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div>

//       <h1 className="text-center">{categoryName}</h1>

//       <div className="grid grid-cols-5 gap-4">
//         {products.map((product) => (
//           <div key={product._id} className="bg-white rounded-lg p-4">
//             <ProductItem product={product} />
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default CategoryDetailPage;
