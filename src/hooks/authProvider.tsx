"use client"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import useCookie from "./useCookie";
import { useRouter } from "next/navigation";
import useCart from "./cartProvider";

type AuthContextType = {
    loginAuth: (token: string) => void;
    logoutAuth: () => void;
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    accessToken: "",
    setAccessToken: ()=> {},
    isLoading: true,
});

export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}: Props){
    const {getCookie, setCookie, resetItem} = useCookie();
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const loginAuth = (token:string) => {
        setCookie('accessToken', JSON.stringify(token) );
        setAccessToken(token);
    }

    const logoutAuth = ()=> resetItem("accessToken");

    useEffect(()=>{
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
        <AuthContext.Provider value={{loginAuth, logoutAuth, accessToken, setAccessToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

}