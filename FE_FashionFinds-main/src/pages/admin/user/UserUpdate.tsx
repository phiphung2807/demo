import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { IUser } from "../../../interface/User";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { UpdateUser } from "../../../api/User";
import { getUserById } from "../../../actions/user";

const rolesData = [
    { _id: "admin", name: "admin" },
    { _id: "member", name: "member" },
    { _id: "customer", name: "customer" },
]

const UserUpdate = () => {
    const { register, handleSubmit } = useForm<IUser>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: any }>();
    const { users } = useAppSelector((state) => state.users)
    const { user } = users;
    useEffect(() => {
        dispatch(getUserById(id));
    }, [])
    console.log(user);

    const onHandleSubmit = async (value: any) => {
        try {
            const userUpdate = {
                _id: id,
                ...value,
            };

            const { data } = await UpdateUser(userUpdate);
            const userdispatch = data.user;
            navigate("/admin/users")
            dispatch({ type: "USER/UPDATE", payload: userdispatch })
            toast.success(data.message)
        } catch (error: any) {
            toast.error(error.response.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onHandleSubmit as any)}>
            <div className="relative overflow-x-auto sm:rounded-lg mb-5">
                <div
                    className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="" className="font-bold text-[19px]">Chức vụ</label> <br />
                        <select
                            className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]"
                            defaultValue={user?.user_role}
                            {...register("user_role")}
                        >
                            {rolesData.map((role: any) => {
                                return (
                                    <option value={role._id}>{role.name}</option>
                                )
                            })}
                        </select>
                        {/* <input type="text"
                            defaultValue={user?.user_role}
                            {...register("user_role")}
                            className=" shadow-md w-full px-3 py-4 rounded-md mt-2 focus:border-b border-b  focus:border-blue-400  focus:duration-150 outline-none hover:shadow text-[16px]" /> */}
                    </div>
                </div >
            </div >
            <div className="mb-4">
                <a
                    className="bg-blue-500 px-2 py-2 duration-200 hover:bg-blue-700 cursor-pointer rounded-md text-white">DANH SÁCH DANH MỤC</a>
                <button
                    className="bg-green-600 px-10 py-2 duration-200 hover:bg-green-700 cursor-pointer rounded-md text-white">Cập nhật</button>
            </div>
        </form >
    )
}

export default UserUpdate