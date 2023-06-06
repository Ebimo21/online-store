import axios from "axios";

export const backendHost = "http://localhost:3001"

export const login= async (email:string, password:string):Promise<returnValue> =>{
    try{
        const res = await axios.post(`${backendHost}/login`, {
         email, password
        });
        const data:returnValue = res.data
        return data;
    }catch(err:any){
        return {success: false, message: err.message, data: {accessToken: ""}}
    }
}

export const signUp= async (email:string, password:string, fname:string, lname:string):Promise<returnValue> =>{
    try{
        const res = await axios.post(`${backendHost}/signup`, {
         email, password, fname, lname
        });
        const data:returnValue = res.data
        return data;
    }catch(err:any){
        return {success: false, message: err.message, data: {accessToken: ""}}
    }
}

type verifyEmailType = {
    success: boolean,
    data: null,
    message: string,
}

export const verifyEmail= async (hash:string):Promise<verifyEmailType> =>{
    try{
        const res = await axios.post(`${backendHost}/email/verify`, {
         hash
        });
        const data:verifyEmailType = res.data
        return data;
    }catch(err:any){
        return {success: false, message: err.message, data: null}
    }
}

