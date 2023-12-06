import { useForm } from "react-hook-form";

import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from "../../../store/hook";
import { addCategory } from "../../../actions/category";
import { useNavigate } from "react-router-dom";
import { ICategoryPass } from "../../../interface/CategoryPass";
const CategoryAdd = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<ICategoryPass>();
    const navigate = useNavigate()
    const onHandleSubmit = async (category: ICategoryPass) => {
        try {
          await  dispatch(addCategory(category)).unwrap();
          navigate("/admin/categories")
        } catch (error:any) {
            console.log(error.respones.data.message);    
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onHandleSubmit as any)}>
                <div className="relative overflow-x-auto sm:rounded-lg mb-5">
                    <div
                        className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="" className="font-bold text-[19px]">Tên danh mục</label> <br />
                            <input type="text" {...register("category_name_pass", { required: "Tên danh mục không được bỏ trống ", minLength: { value: 6, message: "Tối thiểu 5 kí tự" } })} placeholder="Name category ..."
                                className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" />
                            <div className="text-red-500">{errors.category_name_pass && errors.category_name_pass?.message}</div>
                        </div>
                        <div>
                            <label htmlFor="" className="font-bold text-[19px]">Ảnh</label> <br />
                            <input type="text"  {...register("category_images_pass", { required: "Image không được bỏ trống" })}
                                className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" />
                            <div className="text-red-500">{errors.category_images_pass?.message}</div>
                        </div>
                    </div >
                </div >
                <div className="mb-4">
                    <a
                        className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white">DANH SÁCH DANH MỤC</a>
                    <button
                        className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white">THÊM</button>
                </div>
            </form >
        </div>
    );
};

export default CategoryAdd;