import axios from "axios";
import { backendHost } from "@/api/apiCalls";

type GetProfileDetailsType ={
    success: boolean,
    data: user[] | null ,
    message: string,
}

type refreshTokenType = {
    success: boolean,
    data: {
        accessToken: string,
        refreshToken: string,
    },
    message: string,
}

export default function useProfileAPICall(){
    const GetProfileDetails= async (token:string, refreshToken:string):Promise<GetProfileDetailsType> =>{
        try{
            const res = await axios.get(`${backendHost}/user/profile`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log(res.data);
            const data:GetProfileDetailsType = res.data
            return data;
        }catch(error:any){
            return {success: false, message: error.message, data: null}
        }
    }
    
    const UploadProfilePhoto= async (file:any, token:string, refreshToken:string):Promise<GetProfileDetailsType> =>{
        
        try{
            const res = await axios.postForm(`${backendHost}/user/upload`,
                {
                    'file': file,
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    } 
                }
            );
            console.log(res.data);
            const data:GetProfileDetailsType = res.data
            return data;
        }catch(err:any){
            console.log(err);
            return {success: false, message: err.message, data: null}
        }
    }


    return {
        GetProfileDetails,
        UploadProfilePhoto
    }
}

