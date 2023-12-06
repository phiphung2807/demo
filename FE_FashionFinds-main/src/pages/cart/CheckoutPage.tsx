import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { useEffect, useState } from "react";
import { getCartByUser } from "../../actions/cart";
import { useForm } from "react-hook-form";
import { checkOut } from "../../actions/bill";

const paymentMethodData = [
    {
        _id: "online_vnpay",
        payment_name: "Thanh toán qua thẻ thanh toán, ứng dụng ngân hàng VNPAY",
        payment_image: "https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg"
    },
    {
        _id: "online_qr_vnpay",
        payment_name: "Thanh toán qua mã QR - VNPAY",
        payment_image: "https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vector-vnpayqr-qr-mien-phi.jpg",
    },
    {
        _id: "online_momo",
        payment_name: "Thanh toán qua Ví MoMo",
        payment_image: 'https://developers.momo.vn/v3/vi/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png'
    },
    {
        _id: "ofline_code",
        payment_name: "Thanh toán khi nhận hàng (COD)",
        payment_image: 'https://www.mungbaobao.com/upload/news/2019/05/19/12/08/14/icon-thanh-toan-1.png?v=1'
    },
]

const CheckoutPage = () => {

    // state
    const { carts } = useAppSelector((state: any) => state.carts);
    const [payment, setPayment] = useState(undefined);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();

    // get user from localstore
    const userStr = localStorage.getItem("users");
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?.user?._id;

    useEffect(() => {
        dispatch(getCartByUser(userId))
    }, [dispatch])

    // hàm checkout
    const onCheckOut = (user: any) => {
        const formCheckout = {
            userId: userId,
            phone: user.user_phone,
            shippingAddress: user.user_address,
            paymentMethod: payment,
        }
        dispatch(checkOut(formCheckout)).unwrap().then(() => navigate("/bills/detail"));
    }
    return (
        <div className="bg-white">
            <form onSubmit={handleSubmit(onCheckOut)} className="w-[1250px] mx-auto grid grid-cols-[800px,auto] gap-8 py-6">
                <div className="">
                    <h1 className="text-center font-bold text-[30px] mt-[20px]">Yody</h1>
                    <div className="grid grid-cols-2 gap-5 mb-4">
                        <div className="information w-full">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="font-bold text-[20px]">Thông tin giao hàng</h2>
                                <Link to="" className="text-yellow-500 hover:text-yellow-600 animation-all text-[16px]"><i className="mr-2 fa-solid fa-right-from-bracket"></i>Đăng xuất</Link>
                            </div>
                            <form action="">
                                <div>
                                    <input type="text" placeholder="Họ và tên" {...register("user_fullName", { required: "Họ tên không được bỏ trống" })} value={user?.user?.user_fullName} className="w-full border outline-none rounded-md focus:border-b-yellow-400 animation-all px-2 py-2 mb-3" />
                                    <div className="text-red-500">{errors.user_fullName as any && errors.user_fullName?.message as string}</div>
                                </div>
                                <div>
                                    <input type="text" placeholder="Số điện thoại" {...register("user_phone", { required: "Số điện thoại không được bỏ trống" })} value={user?.user?.user_phone} className="w-full border outline-none rounded-md focus:border-b-yellow-400 animation-all px-2 py-2 mb-3" />
                                    <div className="text-red-500">{errors.user_phone as any && errors.user_phone?.message as string}</div>
                                </div>
                                <div>
                                    <input type="text" placeholder="Địa chỉ" {...register("user_address", { required: "Địa chỉ không được bỏ trống" })} value={user?.user?.user_address} className="w-full border outline-none rounded-md focus:border-b-yellow-400 animation-all px-2 py-2 mb-3" />
                                    <div className="text-red-500">{errors.user_address as any && errors.user_address?.message as string}</div>
                                </div>
                                <div>
                                    <textarea name="" id="" cols={10} rows={2} placeholder="Ghi chú (tùy chọn)" className="w-full border outline-none rounded-md focus:border-b-yellow-400 animation-all px-2 py-2 mb-3"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="payment">
                            <div className="box-shipping">
                                <h1 className="font-bold text-[20px] mb-2">Vận chuyển</h1>
                                <div className="flex  justify-between items-center border rounded-md px-2 py-3">
                                    <div className="flex gap-2 items-center">
                                        <input type="radio" />
                                        <p className="text-[14px]">Miễn phí vận chuyển đơn hàng từ 498k</p>
                                    </div>
                                    <p>Miễn phí</p>
                                </div>
                            </div>
                            <div className="box-payment">
                                <h1 className="font-boldx  text-[20px] mb-2 mt-5">Thanh toán</h1>
                                {paymentMethodData?.map((item: any, index: any) => {
                                    const radioId = `paymentMethod_${index}`;
                                    return (
                                        <div key={index} className="flex justify-between items-center border rounded-md px-2 py-2 mb-2">
                                            <div className="flex gap-2 items-center  cursor-pointer" >
                                                <input
                                                    type="radio"
                                                    value={item._id}
                                                    id={radioId}
                                                    onClick={() => setPayment(item._id)}
                                                />
                                                <label htmlFor={radioId}>
                                                    <p className="text-[14px]  cursor-pointer">{item?.payment_name}</p>
                                                </label>
                                            </div>
                                            <div className="max-w-[40px] max-h-[50px]">
                                                <img className="w-full" src={item?.payment_image} alt="" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-3">Sau khi hoàn tất đơn hàng khoảng 60-90 phút (trong giờ hành chính), YODY sẽ nhanh chóng gọi điện xác nhận lại thời gian giao hàng với bạn. YODY xin cảm ơn!</div>
                </div>
                <div className="bg-green-50 py-3">
                    <div className="box-header w-full py-3 border-b px-5">
                        <h1 className="font-bold text-[20px]">Đơn hàng (<span>{carts?.products?.length} sản phẩm</span>)</h1>
                    </div>
                    {carts?.products?.map((item: any, index: string) => {
                        return (
                            <div key={index} className="product-list flex items-center border-b ">
                                <div className="product-detail  px-5 py-3 flex gap-3">
                                    <div className="product-img max-w-[50px] max-h-[70px]">
                                        <img className=" rounded-sm" src={item.productId.product_images} alt="" />
                                        <div className="mt-[-80px] border rounded-full px-2 bg-yellow-300 ml-[30px] z-10 absolute">{item.quantity}</div>
                                    </div>
                                    <div className="product-content">
                                        <h3 className="text-[14px]">{item.productId.product_name}</h3>
                                        <div className="flex items-center">
                                            <p>{item.color}</p> / <p>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-totalPrice">
                                    <span>{item.price}</span>
                                </div>
                            </div>
                        )
                    })}
                    <div className="coupon flex items-center border-b px-5 grid grid-cols-[70%,auto] gap-3 py-4">
                        <input type="text" className="w-full py-2  px-2 outline-none" placeholder="Nhập mã giảm giá" />
                        <button className="bg-yellow-400 rounded-sm py-2 hover:bg-yellow-500 transition-all">Áp dụng</button>
                    </div>
                    <div>
                        <div className=" flex items-center justify-between border-b py-4 px-5">
                            <h2>Tạm tính</h2>
                            <span>{carts?.totalPrice || 0} đ</span>
                        </div>
                        <div className=" flex items-center justify-between border-b py-4 px-5">
                            <h2>Phí vận chuyển</h2>
                            <span>{carts?.shippingFee} đ</span>
                        </div>
                        <div className=" flex items-center justify-between border-b py-4 px-5">
                            <h2>Tổng cộng</h2>
                            <span>{carts?.totalOrder || 0} đ</span>
                        </div>
                        <div className=" flex items-center border-b  flex items-center justify-between py-4  px-5">
                            <Link to="">Quay về giỏ hàng</Link>
                            <button className="bg-yellow-400 rounded-sm py-2 hover:bg-yellow-500 transition-all px-3">ĐẶT HÀNG</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CheckoutPage