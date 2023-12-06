import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteBillById, getBillByUser } from "../../actions/bill";
const { TabPane } = Tabs;
const BillDetail = () => {
    // // Phần đánh giá
    const [activeTab, setActiveTab] = useState("All");
    const handleTabChange = (key: any) => {
        setActiveTab(key);
    };

    // get user from localstorerage
    const userStr = localStorage.getItem("users");
    const user = userStr ? JSON.parse(userStr) : null;
    const { _id } = user?.user || {};

    const { bills } = useAppSelector((state) => state.bills)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBillByUser(_id))
    }, [])

    const onHandRemoveBill = (_id: string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này");
        if (confirm) {
            dispatch(deleteBillById(_id));
        }
    }

    return (
        <div className="bg-[#f5f5f5]">
            <div className="w-[1250px] mx-auto grid grid-cols-[250px,auto] py-6">
                <div>
                    <div className="box-header flex">
                        <div className="avatar max-w-[50px] mr-2">
                            <img className="rounded-full w-full h-[50px] bg-black" src={user?.user?.user_avatar} alt="" />
                        </div>
                        <div className="account mb-3">
                            <h2 className="font-bold">{user?.user?.user_fullName}</h2>
                            <div className="edit-account text-gray-400">
                                <i className="fa-solid fa-pen-to-square fa-beat-fade mr-2"></i>
                                <Link to="">Sửa hồ sơ</Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <Link to="">Tài khoản của tôi</Link>
                    </div>
                </div>
                <div className="bg-white ">
                    <Tabs activeKey={activeTab} onChange={handleTabChange} className=" w-full">
                        <TabPane tab="Tất cả" key="All">
                            <div className="">
                                <form className="box-search flex items-center space-x-2 mb-3 bg-[#eaeaea] py-3 ">
                                    <i className="fa-solid fa-magnifying-glass fa-shake pl-4"></i>
                                    <input type="text" className="border-none w-full outline-none bg-[#eaeaea]" placeholder="Tìm kiếm" />
                                </form>
                                <div className="px-7 py-3">
                                    {bills?.length < 0 ? (<div>Bạn chưa mua sản phẩm nào</div>)
                                        : (
                                            <div>
                                                {bills?.map((item: any, index: string) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="flex items-center justify-between">
                                                                <div className="font-bold px-2  bg-red-600 text-white mt-3">Store</div>
                                                                <div className="flex items-center space-x-3">
                                                                    <p className="text-green-700">Đơn hàng đã được giao thành công</p> <p>|</p>
                                                                    <p className="text-red-600">HOÀN THÀNH</p>
                                                                </div>
                                                            </div>
                                                            <hr className="mt-3" />
                                                            {item?.products?.map((pro: any, index: string) => {
                                                                return (
                                                                    <div key={index} className="cart-List grid grid-cols-[800px,auto] flex items-center">
                                                                        <div className="py-3 flex px-7 space-x-5">
                                                                            <div className="max-w-[100px]">
                                                                                <img src={pro?.productId?.product_images} alt="" />
                                                                            </div>
                                                                            <div className="flex flex-col gap-y-5">
                                                                                <div>
                                                                                    <h1>{pro?.productId?.product_name}</h1>
                                                                                </div>
                                                                                <div className="flex">
                                                                                    <p className="text-blue-500 font-medium">
                                                                                        {pro?.productId?.product_color} / size
                                                                                    </p>
                                                                                </div>
                                                                                <div className="flex">
                                                                                    <p className=" font-medium">
                                                                                        x{pro?.quantity}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span><del>{pro?.productId?.product_discount} k</del></span>
                                                                            <span>{pro?.price} k</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div className="flex gap-2 ">
                                                                <Link to="/products" className="bg-yellow-500 text-center text-white hover:text-white max-w-[140px] border-gray-300 hover:bg-yellow-600 transition-all rounded-md w-full  py-2">Mua lại</Link>
                                                                <button
                                                                    onClick={() => onHandRemoveBill(item?._id)}
                                                                    className="bg-red-500 text-white max-w-[140px] border-gray-300 hover:bg-red-600 transition-all rounded-md w-full  py-2">Hủy</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Chờ thanh toán" key="pending">
                            a
                        </TabPane >
                        {/* <TabPane tab="Vận chuyển" key="ship">
                            a
                        </TabPane >
                        <TabPane tab="Đang giao" key="shipping">
                            a
                        </TabPane >
                        <TabPane tab="Hoàn thành" key="finish">
                            a
                        </TabPane >
                        <TabPane tab="Đã hủy" key="cancelled">
                            a
                        </TabPane >
                        <TabPane tab="Trả hàng / Hoàn tiền" key="return">
                            a
                        </TabPane > */}
                    </Tabs >
                </div>
            </div>
        </div >
    )
}

export default BillDetail