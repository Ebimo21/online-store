import axios from "axios";

const host = "http://localhost:3001"

type returnValue ={
    success: boolean,
    accessToken?: string| null,
    message: string,
}

export const login= async (email:string, password:string):Promise<returnValue> =>{
    try{
        const res = await axios.post(`${host}/login`, {
            data: { email, password }
        });
        const data:returnValue = res.data
        return data;
    }catch(err:any){
        return {success: false, message: err.message}
    }
}