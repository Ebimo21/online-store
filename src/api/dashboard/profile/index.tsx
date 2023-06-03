import axios from "axios";
import { backendHost } from "@/api/apiCalls";

type GetProfileDetailsType ={
    success: boolean,
    data: {
        id: string,
        fname: string,
        lname: string,
        email: string,
    }[] | null,
    message: string,
}

export const GetProfileDetails= async (token:string):Promise<GetProfileDetailsType> =>{
    
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
    }catch(err:any){
        return {success: false, message: err.message, data: null}
    }
}