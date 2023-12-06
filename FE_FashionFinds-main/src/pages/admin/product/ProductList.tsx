
import { Key, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IProduct } from "../../../interface/Product"
import { Image, Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { deleteProduct, getAllProduct } from "../../../actions/product";
import { getAllCategory } from "../../../actions/category";
import { toast } from "react-toastify";
import { ICategory } from "../../../interface/Category";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state: any) => state.products);
    const { categories } = useAppSelector((state: any) => state.categories);
    const [currenPages, setCurrenPages] = useState<any>(1);
    const [totalItems, setTotalItem] = useState(1);

    useEffect(() => {
        dispatch(getAllProduct())
        setCurrenPages(products?.totalPages);
        setTotalItem(products?.totalDocs);
        dispatch(getAllCategory());
    }, [])

    const onPageChange = (page: number) => {
        setCurrenPages(page)
    }

    const onHandleDelete = async (_id: string) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa");
        if (confirm) {
            await dispatch(deleteProduct(_id));
        }
    };

    return (
        <div>
            <Link to="/admin/products/add"
                className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700 duration-200">THÊM SẢN PHẨM</Link>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">

                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="max-w-[5px] w-[7px] py-3">Id</th>
                            <th scope="col" className="max-w-[30px] py-3">Tên</th>
                            <th scope="col" className="max-w-[30px] py-3">Ảnh</th>
                            <th scope="col" className="max-w-[30px] py-3">Giá</th>
                            <th scope="col" className="max-w-[30px] py-3">Danh mục</th>
                            <th scope="col" className="max-w-[30px] py-3">Thời gian tạo</th>
                            <th scope="col" className="max-w-[30px] py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">

                        {products?.docs?.map((product: IProduct, index: Key | null | undefined) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className="max-w-[5px] w-[7px] p-4">{index}</td>
                                    <td scope="row"
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product?.product_name?.length > 10 ? product?.product_name?.slice(0, 10).concat("...") : product?.product_name?.slice(0, 15).concat("...")}
                                    </td>
                                    <td className="max-w-[30px] py-4 max-w-[100px] text-center">
                                        <Image
                                            width={80}
                                            height={100}
                                            src={product.product_images}
                                        />
                                    </td>
                                    <td className="max-w-[30px] py-4">{product?.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    {/* <td className="max-w-[30px] py-4">{product?.product_size}</td>
                                    <td className="max-w-[30px] py-4">{product?.product_color}</td> */}
                                    {/* <td className="max-w-[30px] py-4">{product?.product_quantity}</td>
                                    <td className="max-w-[30px] py-4">{product?.product_discount}</td> */}
                                    <td className="max-w-[30px] py-4">
                                        {categories?.docs?.map((cate: ICategory) => {
                                            if (cate._id === product.categoryId) {
                                                return cate.category_name;
                                            }
                                            return null;
                                        })}
                                    </td>
                                    {/* <td className="max-w-[30px] py-4">{product?.product_description_sort.slice(0, 15).concat("...")}</td> */}
                                    {/* <td className="max-w-[30px] py-4">{product?.product_description_long.slice(0, 15).concat("...")}</td> */}
                                    <td className="max-w-[30px] py-4">{product?.createdAt?.slice(0, 10)}</td>

                                    <td className="max-w-[30px] py-4">
                                        <Link to="" className=" text-black">
                                            <i className="fa-regular fa-eye"></i>
                                        </Link>
                                        <button onClick={() => onHandleDelete(product._id as any)}
                                            className="font-medium text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline"><i
                                                className="fa-solid fa-trash"></i></button>

                                        <Link to={`/admin/products/${product._id}/update`}
                                            className="font-medium text-yellow-400 text-[20px] duration-100 hover:text-yellow-600 hover:underline">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
                <Pagination current={currenPages} total={totalItems} onChange={onPageChange} />
            </div>
        </div>
    )
}

export default ProductList