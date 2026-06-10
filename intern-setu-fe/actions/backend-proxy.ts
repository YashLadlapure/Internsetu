"use server";
import axiosApi from "@/config/axiosConfig";
import { AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";


export const callBackend = async (endPoint: string, method: Method = "GET", data: any = null) => {

    const token = (await cookies()).get("token")?.value;

    try {

        const config: AxiosRequestConfig = {
            url: endPoint,
            method,
            data,
            headers: {}
        }; 

        
        if(token) {
            config.headers!["Authorization"] = `Bearer ${token}`;
        }
                

        const res = await axiosApi(config);        

        return {
            status: res.status,
            data: res.data,
            success: true,
        }
        
    }
    catch (error: any) {

        console.log(error);
        

        return {
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Internal Server Error" },
            success: false,
        }
    }   
 
}