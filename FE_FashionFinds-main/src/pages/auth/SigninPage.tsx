import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ISignin } from "../../interface/Auth"
import { useAppDispatch } from "../../store/hook"
import { Login } from "../../actions/auth"

const SigninPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISignin>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = async (value: any) => {
        const data = await dispatch(Login(value)).unwrap();
        // const { data } = await SigninUser(value);
        // console.log(data?.user?.user_role);
        // const role = data?.user?.user_role
        // if (role === "admin") {
        //     navigate("/admin")
        // }
        // else {
        //     navigate("/")
        // }
        localStorage.setItem("users", JSON.stringify(data));
        if (data.user.user_role === "admin") {
            navigate("/admin")
        } else { navigate("/") }
        location.reload();
    }
    return (
        <div className="bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/915505/assets/bg_login.jpg?1690016531690')] py-12">
            <form action="" className="w-[600px] mx-auto py-10 px-[100px] bg-white" onSubmit={handleSubmit(onHandleSubmit)}>
                <p className="text-center mb-10">Chào mừng bạn đến với Yody!</p>
                <h1 className="text-center font-bold text-[30px]">ĐĂNG NHẬP</h1>
                <div className="text-[16px] mt-5">
                    <div>
                        <input
                            type=""
                            {...register("user_email", {
                                required: "Email không được bỏ trống ",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email Không đúng định rạng"
                                }
                            })}
                            placeholder="Địa chỉ Email"
                            className="w-full border outline-none rounded-sm px-5 py-2 mb-5 focus: duration-300 focus:border-b-secondary" />
                        <div className="text-red-500">{errors?.user_email && errors?.user_email.message}</div>
                    </div>
                    <div>
                        <input
                            {...register("user_password", { required: "Password không được bỏ trống ", minLength: { value: 6, message: "Tối thiểu 6 kí tự " } })}
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full border outline-none rounded-sm px-5 py-2 mb-5 focus:duration-300 focus:border-b-secondary" />
                        <div className="text-red-500">{errors?.user_password && errors?.user_password.message}</div>
                    </div>
                    <div className="text-center">
                        <button className="text-center w-full bg-[#ffb801] hover:bg-yellow-500 transition-all  duration-300 text-white py-2 rounded-sm mb-5">Đăng nhập</button>
                    </div>
                    <div className="text-center">
                        <Link
                            to="#"
                            className="text-[#ffb801] hover:text-yellow-500 transition-all">Quên mật khẩu</Link>
                        <p className="mt-5 text-[17px] text-gray-700">Hoặc đăng nhập bằng</p>
                        <div className="flex items-center justify-center space-x-5 mt-5 mb-[80px]">
                            <Link
                                to=""
                                className="flex items-center space-x-2 border px-3 py-2 rounded-full">
                                <i className="fa-brands fa-google fa-bounce"></i>
                                <p>Google</p>
                            </Link>
                            <Link
                                to=""
                                className="flex items-center space-x-2 border px-3 py-2 rounded-full">
                                <i className="fa-brands fa-facebook fa-bounce"></i>
                                <p>Facebook</p>
                            </Link>
                        </div>
                        <div>
                            Bạn đã có tài khoản? <Link to="/signup" className="text-[#ffb801] hover:text-yellow-500 transition-all"> Đăng ký ngay!</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninPage