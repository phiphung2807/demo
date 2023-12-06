// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ICategory } from "../../interface/Category";
// import { GetAllCategories } from "../../api/Category";
// import { toast } from "react-toastify";

// const CategoryPage = () => {
//   const [categories, setCategories] = useState<ICategory[]>([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await GetAllCategories();
//       setCategories(response.data.CategoryResponse.docs);
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   return (

//     <div className="container w-3/4 m-10 h-96 mx-auto ">
//       <h2 className="text-2xl font-bold mb-4 text-center">Danh sách danh mục</h2>
//       <div className="grid grid-cols-4 gap-4">
//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex"
//           >
//             <Link to={`/categories/${category._id}/products`}>
//               <img
//                 src={category.category_images}
//                 alt={category.category_name}
//                 className="w-24 h-auto object-cover "
//               />
//             </Link>
//             <div className="p-4">
//               <Link
//                 to={`/categories/${category._id}/products`}
//                 className="text-gray-900 font-medium"
//               >
//                 {category.category_name}
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>


//   );
// };

// export default CategoryPage;
