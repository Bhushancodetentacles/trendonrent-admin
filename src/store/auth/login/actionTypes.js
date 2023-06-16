import { toast } from "react-toastify"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_SUCCESS = () => {
    toast.success("User login successfully!")
}

export const LOGOUT_USER = "LOGOUT_USER"
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS"
export const API_ERROR = "LOGIN_API_ERROR"

export const SOCIAL_LOGIN = "SOCIAL_LOGIN"
