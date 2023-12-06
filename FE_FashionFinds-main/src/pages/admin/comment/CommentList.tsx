import { Link } from "react-router-dom";
import { Image, Pagination, Rate } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getAllProduct } from "../../../actions/product";
import { deleteCommentById, getAllComment } from "../../../actions/comment";
import { IComment } from "../../../interface/Comment";
const CommentList = () => {
    const dispatch = useAppDispatch();
    const { comments } = useAppSelector((state: any) => state.comments)
    const [currenPages, setCurrenPages] = useState(1);
    const [totalItems, setTotalItem] = useState(1);
    console.log(comments);

    useEffect(() => {
        dispatch(getAllComment())
        dispatch(getAllProduct())
        setCurrenPages(comments.totalPages)
        setTotalItem(comments.totalDocs)
    }, [])

    const onHandlePageChange = (page: number) => {
        setCurrenPages(page);
    }

    const onHandleDelete = (_id: string) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa");
        if (confirm) {
            dispatch(deleteCommentById(_id))
        }
    }
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="max-w-[30px] py-3">Id</th>
                            <th scope="col" className="max-w-[30px] py-3">Tên tài khoản</th>
                            <th scope="col" className="max-w-[30px] py-3">Tên sản phẩm</th>
                            <th scope="col" className="max-w-[80px] py-3">Ảnh</th>
                            <th scope="col" className="max-w-[30px] py-3">Đánh giá</th>
                            <th scope="col" className="max-w-[30px] py-3">Nội dung bình luận</th>
                            <th scope="col" className="max-w-[30px] py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {comments?.docs?.map((item: IComment, index: string) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td scope="row"
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}
                                    </td>
                                    <td
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user_fullName}
                                    </td>
                                    <td
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.productId}
                                    </td>
                                    <td className="py-4 max-w-[100px] max-h-[100px] text-center">
                                        <Image
                                            width={80}
                                            height={100}
                                            src={item?.user_avatar}
                                        />
                                    </td>
                                    <td
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Rate allowHalf value={item.rating} />
                                    </td>
                                    <td
                                        className="max-w-[30px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.review}
                                    </td>
                                    <td className="max-w-[30px] py-4">
                                        <Link to="" className=" text-black">
                                            <i className="fa-regular fa-eye"></i>
                                        </Link>
                                        <button
                                            onClick={() => onHandleDelete(item._id as any)}
                                            className="font-medium px-2 text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination current={currenPages} total={totalItems} onChange={onHandlePageChange} />
            </div>
        </div>
    )
}

export default CommentList