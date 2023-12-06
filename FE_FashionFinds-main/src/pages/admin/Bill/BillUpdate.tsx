import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getBillById, updateBillById } from "../../../actions/bill";

// const paymentMethodData = [
//     {
//         _id: "online_vnpay",
//         payment_name: "Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng VNPAY",
//         payment_image: "https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg"
//     },
//     {
//         _id: "online_qr_vnpay",
//         payment_name: "Thanh toán qua mã QR - VNPAY",
//         payment_image: "https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vector-vnpayqr-qr-mien-phi.jpg",
//     },
//     {
//         _id: "online_momo",
//         payment_name: "Thanh toán qua Ví MoMo",
//         payment_image: 'https://developers.momo.vn/v3/vi/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png'
//     },
//     {
//         _id: "ofline_code",
//         payment_name: "Thanh toán khi nhận hàng (COD)",
//         payment_image: 'https://www.mungbaobao.com/upload/news/2019/05/19/12/08/14/icon-thanh-toan-1.png?v=1'
//     },
// ]
const statusData = [
    {
        _id: "Pending",
        status_name: "Chờ xác nhận",
    },
    {
        _id: "Confirmed",
        status_name: "Đã xác nhận",
    },
    {
        _id: "Delivering",
        status_name: "Đang giao hàng",
    },
    {
        _id: "Delivered",
        status_name: "Giao hàng thành công",
    },
]
const paymentStatusData = [
    {
        _id: "Paid",
        paymmentStatus_name: "Đã thanh toán",
    },
    {
        _id: "Unpaid",
        paymmentStatus_name: "Chưa thanh toán",
    },
]

const BillUpdate = () => {
    const { bills } = useAppSelector((state: any) => state.bills)
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset } = useForm<any>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getBillById(id as string)).unwrap().then((data) => {
            const bill = data.bill;
            reset(bill)
        });
    }, []);

    const onHandleSubmit = async (bill: any) => {

        const formBill: any = {
            _id: id,
            status: bill.status,
            paymentStatus: bill.paymentStatus,
            paymentMethod: bill.paymentMethod,
        }
        await dispatch(updateBillById(formBill)).unwrap().then(() => navigate("/admin/bills"))
    };
    return (
        <form onSubmit={handleSubmit(onHandleSubmit as any)}>
            <div className="relative overflow-x-auto sm:rounded-lg mb-5">
                <div
                    className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
                    {/* <div>
                        <label htmlFor="" className="font-bold text-[19px]">Phương thức thanh toán</label> <br />
                        <select
                            {...register("paymentMethod", { required: "Phương thức thanh toán Không được bỏ trống" })}
                            defaultValue={bills?.paymentMethod}
                            className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16">
                            {paymentMethodData?.map((item: any) => {
                                return (
                                    <option key={item._id} value={item._id}>
                                        {item?.payment_name}
                                    </option>
                                )
                            })}

                        </select>
                    </div> */}
                    <div>
                        <label htmlFor="" className="font-bold text-[19px]">Trạng thái thanh toán thanh toán</label> <br />
                        <select {...register("paymentStatus", { required: "Trạng thái thanh toán Không được bỏ trống" })} defaultValue={bills?.paymentStatus} className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16">
                            {paymentStatusData?.map((item: any) => {
                                return (
                                    <option key={item._id} value={item._id}>
                                        {item?.paymmentStatus_name}
                                    </option>
                                )
                            })}

                        </select>
                    </div>
                    <div>
                        <label htmlFor="" className="font-bold text-[19px]">Trạng thái đơn hàng</label> <br />
                        <select {...register("status", { required: "Trạng thái thanh toán Không được bỏ trống" })} defaultValue={bills?.status} className="shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b focus:border-blue-400 focus:duration-150 outline-none hover:shadow text-16">
                            {statusData?.map((item: any) => {
                                return (
                                    <option key={item._id} value={item._id}>
                                        {item?.status_name}
                                    </option>
                                )
                            })}

                        </select>
                    </div>
                </div >
            </div >
            <div className="mb-4">
                <a
                    className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white">DANH SÁCH DANH MỤC</a>
                <button onSubmit={() => onHandleSubmit}
                    className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white">CẬP NHẬT</button>
            </div>
        </form >
    );
};

export default BillUpdate;