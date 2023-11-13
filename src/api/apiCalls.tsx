import axios from "axios";

// export const backendHost = "https://shop.tradefactory.net"
export const backendHost = "http://localhost:3001"

export const login= async (email:string, password:string):Promise<returnValue> =>{
    try{
        const res = await axios.post(`${backendHost}/login`, {
         email, password
        });
        return res.data;
    }catch(err:any){
        if (err.response && err.response.status === 401) {
            return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "", role: "" } };
        } else {
            return {success: false, message: err.message, data: {accessToken: "", refreshToken: "", role: ""}}
        }
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
        if (err.response && err.response.status === 401) {
            return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "", role: "" } };
        } else {
            return {success: false, message: err.message, data: {accessToken: "", refreshToken: "", role: ""}}
        }
    }
}

export const verifyEmail= async (hash:string):Promise<verifyEmailType> =>{
    try{
        const res = await axios.post(`${backendHost}/email/verify`, {
         hash
        });
        const data:verifyEmailType = res.data
        return data;
    }catch(err:any){
        if (err.response && err.response.status === 401) {
            return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "" } };
        } else {
            return {success: false, message: err.message, data: null}
        }
    }
}

export const getCategories = async () => {
    try{
        const res = await axios.get(`${backendHost}/categories`);
        const data = res.data;
        console.log(data);
        return data;
    }catch(err:any){
        return {success: false, message: err.message, data: null}
    }
}