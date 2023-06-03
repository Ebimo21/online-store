import axios from "axios";

const host = "http://localhost:3001"

export const login= async (email:string, password:string):Promise<returnValue> =>{
    try{
        const res = await axios.post(`${host}/login`, {
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
        const res = await axios.post(`${host}/signup`, {
         email, password, fname, lname
        });
        const data:returnValue = res.data
        return data;
    }catch(err:any){
        return {success: false, message: err.message, data: {accessToken: ""}}
    }
}