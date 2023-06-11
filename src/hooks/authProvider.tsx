"use client"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import useCookie from "./useCookie";
import { GetProfileDetails } from "@/api/dashboard/profile";

type AuthContextType = {
    loginAuth: (token: string) => void;
    logoutAuth: () => void;
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setUser: Dispatch<SetStateAction<user>>;
    user: user|null;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    accessToken: "",
    setAccessToken: ()=> {},
    isLoading: true,
    setRefresh: ()=>{},
    setUser: ()=> {},
    user:null,
});

export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}: Props){
    const {getCookie, setCookie, resetItem} = useCookie();

    const [user, setUser] = useState<user>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    const loginAuth = (token:string) => {
        setCookie('accessToken', JSON.stringify(token) );
        setAccessToken(token);
    }

    const logoutAuth = ()=> {
        resetItem("accessToken");
        setAccessToken('');
    }

    useEffect(()=>{
        const getUserDetails = async()=>{
            const response = await GetProfileDetails(accessToken);
            console.log(response);
            if(response.data !== null) setUser(response.data[0])  
        }
        getUserDetails();
    }, [accessToken, refresh]);


    useEffect(()=>{
        // set empty access token if it does not exist
        // save to state if it does exist
        if(!getCookie('accessToken')){
            setCookie('accessToken', JSON.stringify(""));

        }else{
            const temp:string =  String(getCookie('accessToken'));
            const token:string  = JSON.parse(temp);
            setAccessToken(token);
        }
        setIsLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={{loginAuth, logoutAuth, accessToken, setAccessToken, isLoading, setUser, user, setRefresh}}>
            {children}
        </AuthContext.Provider>
    )

}