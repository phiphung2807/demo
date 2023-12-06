import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { deleteBillById, getAllBill } from "../../../actions/bill";
const BillList = () => {
    const dispatch = useAppDispatch();
    const { bills } = useAppSelector((state: any) => state.bills)

    useEffect(() => {
        dispatch(getAllBill())
    }, [dispatch]);

    const onHandleDelete = async (_id: string) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa");
        if (confirm) {
            dispatch(deleteBillById(_id));
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
                            <th scope="col" className="max-w-[5px] py-1">Id</th>
                            <th scope="col" className="max-w-[25px] py-1">Tên khách hàng</th>
                            <th scope="col" className="max-w-[25px] py-1">Số điện thoại</th>
                            <th scope="col" className="max-w-[40px] py-2">Địa chỉ giao hàng</th>
                            <th scope="col" className="max-w-[35px] py-2">Phương thức thanh toán</th>
                            <th scope="col" className="max-w-[25px] py-1">Trạng thái thanh toán</th>
                            <th scope="col" className="max-w-[30px] py-2">Trạng thái đơn hàng</th>
                            <th scope="col" className="max-w-[20px] py-2">Hành động</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">{bills?.map((item: any, index: string) => {
                        // console.log("item", item);

                        return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td scope="row"
                                    className="max-w-[5px] py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}
                                </td>
                                <td
                                    className="max-w-[25px] py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.userId?.user_fullName}
                                </td>
                                <td scope="row"
                                    className="max-w-[25px] py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.phone || item?.userId?.user_phone}
                                </td>
                                <td scope="row"
                                    className="max-w-[40px] py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.shippingAddress}
                                </td>
                                <td scope="row"
                                    className="max-w-[35px] py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.paymentMethod}
                                </td>
                                <td scope="row"
                                    className="max-w-[25px] py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.paymentStatus === "Unpaid" ? "Chưa thanh toán" : "Đã thanh toán"}
                                </td>
                                <td scope="row"
                                    className="max-w-[30px] py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.status === "Pending" && "Chờ xác nhận"}
                                    {item.status === "Confirmed" && "Đã xác nhận"}
                                    {item.status === "Delivering" && "Đang giao hàng"}
                                    {item.status === "Delivered" && "Giao hàng thành công"}
                                </td>
                                <td className="max-w-[20px] py-4">
                                    <Link to="" className=" text-black">
                                        <i className="fa-regular fa-eye"></i>
                                    </Link>
                                    <button
                                        onClick={() => onHandleDelete(item._id)}
                                        className="font-medium px-2 text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <Link to={`/admin/bills/${item._id}/update`}
                                        className="font-medium text-yellow-400 text-[20px] duration-100 hover:text-yellow-600 hover:underline">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                    }</tbody>

                </table>
            </div>
        </div>
    );
};

export default BillList;