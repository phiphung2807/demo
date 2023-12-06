import { ISignin, ISignup } from "../interface/Auth";
import { instance } from "./instance";

export const SigninUser = (user: ISignin) => {
    return instance.post("/signin", user);
};
export const SignupUser = (user: ISignup) => {
    return instance.post("/signup", user);
};