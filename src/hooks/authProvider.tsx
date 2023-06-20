"use client"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import useCookie from "./useCookie";
import useProfileAPICall from "@/api/dashboard/profile";
import { access } from "fs";
// import { GetProfileDetails } from "@/api/dashboard/profile";

type AuthContextType = {
    loginAuth: ({}: login) => void;
    logoutAuth: () => void;
    accessToken: string;
    refreshToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setUserRole: Dispatch<SetStateAction<string>>;
    userRole: string;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    accessToken: "",
    refreshToken: "",
    setAccessToken: ()=> {},
    setRefreshToken: ()=> {},
    isLoading: true,
    setRefresh: ()=>{},
    setUserRole: ()=> {},
    userRole: "",
});

export default function useAuth(){
    return useContext(AuthContext);
}

type login = {
    accessToken: string,
    refreshToken: string,
    role: string,
}

export function AuthProvider({children}: Props){
    const {GetProfileDetails} = useProfileAPICall();
    const {getCookie, setCookie, resetItem} = useCookie();

    const [user, setUser] = useState<user>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [userRole, setUserRole] = useState<string>('');

    const loginAuth = ({accessToken, refreshToken, role}:login) => {
        setCookie('accessToken', JSON.stringify(accessToken) );
        setCookie('refreshToken', JSON.stringify(refreshToken) );
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserRole(role);
    }

    const logoutAuth = ()=> {
        resetItem("accessToken");
        resetItem("refreshToken");
        setAccessToken('');
        setRefreshToken('');
        setUserRole('');
    }


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

        // set empty refresh token if it does not exist
        // save to state if it does exist
        if(!getCookie('refreshToken')){
            setCookie('refreshToken', JSON.stringify(""));

        }else{
            const temp:string =  String(getCookie('refreshToken'));
            const token:string  = JSON.parse(temp);
            setRefreshToken(token);
        }
        setIsLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={{loginAuth, logoutAuth, accessToken, setAccessToken, refreshToken, setUserRole, userRole, setRefreshToken, isLoading, setRefresh}}>
            {children}
        </AuthContext.Provider>
    )

}