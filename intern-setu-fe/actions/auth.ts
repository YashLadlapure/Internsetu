"use server" 

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import axiosApi from "@/config/axiosConfig"
import { jwtDecode } from "jwt-decode"


const loginAction = async (formData: {email: string, password: string}) => {
    
    let redirectUrl = null;

    try{
        const {email, password} = formData
        const res = await axiosApi.post('/auth/login', {
            email,
            password
        })

        const {token} = res.data

        const cookieStore = await cookies()
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 
        })

        const decodedToken: {
                exp: number;
                iat: number;
                sub: string;
                role: "STUDENT" | "TEACHER" | "TPO" | "SUPER_ADMIN" | "COLLEGE_ADMIN" | "HR" | "RECRUITER";
                userId: number | string;
            } = jwtDecode(token) 

        console.log(decodedToken);
            

        redirectUrl = `/${decodedToken.role.toLowerCase()}/dashboard`
    }
    catch(err: any){
        return {error: err.response.data.message}
    }   

    if(redirectUrl) {
        redirect(redirectUrl)
    }
}

const logoutAction = async () => {
    const cookieStore = await cookies();
    
    cookieStore.set("token", "", {
        path: '/',
        maxAge: 0 
    });

    redirect("/login");
};

export {loginAction, logoutAction};