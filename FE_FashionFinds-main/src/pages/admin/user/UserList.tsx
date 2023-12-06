import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { deleteUser, getAllUsers } from "../../../actions/user"
import { IUser } from "../../../interface/User"
const UserList = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state: any) => state.users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    console.log(users);
    const onhandleRemove = async (_id: string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa");
        if (confirm) {
            await dispatch(deleteUser(_id)).unwrap();
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <h1 className="text-center font-bold text-[24px]">DANH SÁCH TÀI KHOẢN</h1>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">
                        <th scope="col" className="px-6 py-3 w-[30px]">Id</th>
                        <th scope="col" className="px-6 py-3">Họ tên</th>
                        <th scope="col" className="px-6 py-3">Ảnh</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">role</th>
                        <th scope="col" className="px-6 py-3">status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {users?.docs?.map((user: IUser, index: any) => {
                        return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.user_fullName}
                                </td>
                                <td className="px-6 py-4 w-[200px] text-center">
                                    <img className="p-0"
                                        src={user?.user_avatar}
                                        alt="" />
                                </td>
                                <td className="px-6 py-4">{user.user_email}</td>
                                <td className="px-6 py-4">
                                    {user.user_role}
                                </td>
                                <td className="px-6 py-4">{user.user_status}</td>

                                <td className="px-6 py-4">
                                    <Link to="" className=" text-black">
                                        <i className="fa-regular fa-eye"></i>
                                    </Link>
                                    <Link to={`/admin/users/${user._id}/update`}
                                        className="font-medium px-2 text-yellow-400 text-[20px] duration-100 hover:text-yellow-600 hover:underline">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        className="font-medium text-red-400 text-[20px] duration-100 hover:text-red-600 hover:underline"><i
                                            className="fa-solid fa-trash" onClick={() => onhandleRemove(user?._id)}></i></button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList