import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getAllProduct } from "../../actions/product";
import { getAllUsers } from "../../actions/user";

const Dashboard = () => {
    const { products } = useAppSelector((state) => state.products);
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    console.log(products);

    // Tính số lượng sản phẩm
    useEffect(() => {
        dispatch(getAllProduct());
    }, [])

    // Tính số lượng tài khoản
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])
    return (
        <div>
            <h1 className="text-center text-[24px] mb-5 font-bold">Trang quản trị</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng sản phẩm</div>
                    <p className="text-white text-center">{products?.docs?.length || 0}</p>
                </div>
                <div className="bg-yellow-600 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Số tài khoản</div>
                    <p className="text-white text-center">{users?.docs?.length || 0}</p>
                </div>
                <div className="bg-green-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng tiền thu</div>
                    <p className="text-white text-center">1</p>
                </div>
                <div className="bg-red-900 py-8 rounded-md hover:shadow-lg  hover:shadow-gray-400 transition-all duration-200">
                    <div className="text-white text-center uppercase">Tổng sản phẩm</div>
                    <p className="text-white text-center">1</p>
                </div>
            </div>
            <div>
                <canvas id="myChart" />
            </div>
        </div>
    )
}

export default Dashboard