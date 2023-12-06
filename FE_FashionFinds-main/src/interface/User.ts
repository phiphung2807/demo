export interface IUser {
    _id?: string | any,
    user_fullName: string,
    user_phone?: number,
    user_email: string,
    user_password: string,
    user_confirmPassword?: string,
    user_role?: string,
    user_avatar?: string,
    user_status: string
}