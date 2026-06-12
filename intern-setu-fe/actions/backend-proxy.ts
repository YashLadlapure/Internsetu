"use server";
import axiosApi from "@/config/axiosConfig";
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import { cookies } from "next/headers";

type BackendPayload = Record<string, unknown> | unknown[] | string | number | boolean | null;

export const callBackend = async (endPoint: string, method: Method = "GET", data: BackendPayload = null) => {

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
    catch (error: unknown) {
        const axiosError = error as AxiosError;

        return {
            status: axiosError.response?.status || 500,
            data: axiosError.response?.data || { message: "Internal Server Error" },
            success: false,
        }
    }   
 
}
