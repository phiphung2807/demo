import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { deleteCategory, getAllCategory } from "../../../actions/category";
import { toast } from "react-toastify";
const CategoryList = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state: any) => state.categories)
    const [totalItems, setTotalItem] = useState(1);
    const [currenPages, setCurrenPages] = useState(1)

    useEffect(() => {
        dispatch(getAllCategory())
        setCurrenPages(categories?.totalPages)
        setTotalItem(categories?.totalDocs)
    }, [dispatch]);

    const onHandlePageChange = (page: number) => {
        setCurrenPages(page);
    }
    const onHandleDelete = async (_id: string) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa");
      if (confirm) {
        try {
            await dispatch(deleteCategory(_id));
            toast.success('Xóa danh mục thành công!');
          } catch (error) {
            toast.error('Xóa danh mục thất bại!');
          }
        }
    };
    return (
        <div>
            <Link to="/admin/categories/add" className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700 duration-200">THÊM DANH MỤC</Link>
            <h1 className="text-center text-[24px]">Danh sách danh mục</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="max-w-[30px] py-3">Id</th>
                            <th scope="col" className="max-w-[30px] py-3">Tên danh mục</th>
                            <th scope="col" className="max-w-[80px] py-3">Ảnh</th>
                            <th scope="col" className="max-w-[30px] py-3">Ngày tạo</th>
                            <th scope="col" className="max-w-[30px] py-3">Hành động</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">{categories?.docs?.map((item: any, index: string) => {
                        return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td scope="row"
                                    className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}
                                </td>
                                <td
                                    className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category_name}
                                </td>
                                <td className="py-4 max-w-[100px] max-h-[100px] text-center">
                                    <Image
                                        width={80}
                                        height={100}
                                        src={item?.category_images}
                                    />
                                </td>
                                <td scope="row"
                                    className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.createdAt}
                                </td>
                                <td className="max-w-[30px] py-4">
                                    <Link to="" className=" text-black">
                                        <i className="fa-regular fa-eye"></i>
                                    </Link>
                                    <button
                                        onClick={() => onHandleDelete(item._id)}
                                        className="font-medium px-2 text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <Link to={`/admin/categories/${item._id}/update`}
                                        className="font-medium text-yellow-400 text-[20px] duration-100 hover:text-yellow-600 hover:underline">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                    }</tbody>

                </table>
                <Pagination current={currenPages} total={totalItems} onChange={onHandlePageChange} />
            </div>
        </div>
    );
};

export default CategoryList;