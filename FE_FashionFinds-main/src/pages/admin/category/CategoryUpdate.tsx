import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { GetCategoryById, UpdateCategory } from "../../../api/Category";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../../interface/Category";
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { updateCategory } from "../../../actions/category";

const CategoryUpdate = () => {
    // const { categories, isLoading, error } = useAppSelector((state: any) => state.categories)
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICategory>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: any }>();
    const [category, setCategory] = useState<any>({});
    useEffect(() => {
        (async () => {
            try {
                const { data } = await GetCategoryById(id);
                const category = data.category;
                setCategory(category);
                reset(category)
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        })();
    }, []);
    const onHandleSubmit = async (value: ICategory) => {
        try {
            const categoryUpdate = {
                _id: id,
                ...value,
            };
         await  dispatch(updateCategory(categoryUpdate)).unwrap();
         navigate('/admin/categories');
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onHandleSubmit as any)}>
            <div className="relative overflow-x-auto sm:rounded-lg mb-5">
                <div
                    className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="" className="font-bold text-[19px]">Tên danh mục</label> <br />
                        <input type="text" defaultValue={category?.category_name} {...register("category_name", { required: "Tên danh mục không được bỏ trống ", minLength: { value: 6, message: "Tối thiểu 5 kí tự" } })} placeholder="Name category ..."
                            className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" />
                        <div className="text-red-500">{errors.category_name && errors.category_name?.message}</div>
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold text-[19px]">Ảnh</label> <br />
                        <input type="text" defaultValue={category?.category_images}  {...register("category_images", { required: "Image không được bỏ trống" })}
                            className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" />
                        <div className="text-red-500">{errors.category_images?.message}</div>
                    </div>
                </div >
            </div >
            <div className="mb-4">
                <a
                    className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white">DANH SÁCH DANH MỤC</a>
                <button
                    className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white">Update</button>
            </div>
        </form >
    );
};

export default CategoryUpdate;