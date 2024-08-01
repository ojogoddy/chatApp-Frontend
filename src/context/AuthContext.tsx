import { useState, createContext, ReactNode, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";

// Define the type for the user object
interface UserProps {
    name: string;
    email: string;
    password: string
}
interface UserLoginProps {
    email: string;
    password: string
}

// Define the type for the context value
interface AuthContextType {
    user: string | null;
    registerInfo:UserProps ;
    loginInfo: UserLoginProps ;
    registerError:  number| null;
    loginError:  number| null;
    updateRegisterInfo: (info: UserProps) => void;
    updateLoginInfo: (info: UserProps) => void;
    registerUser: (e: any) => void;
    isRegisterLoading: Boolean;
    isLoginLoading: Boolean;
    logoutUser: ()=>void;
    loginUser: (e:any)=>void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the type for the AuthContextProvider's props
interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider:React.FC<AuthContextProviderProps> = ({children})=>{
    const [user, setUser] = useState<string | null>(null)
    const [registerError, setRegisterError] = useState<number | null>(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState<number | null>(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)

    console.log("useerr", user)

    useEffect(()=>{
        const user = localStorage.getItem("user")
        setUser(JSON.parse(user))
    }, [])
    const updateRegisterInfo = useCallback((info:UserProps)=>{
        setRegisterInfo(info)
    }, [])
    const updateLoginInfo = useCallback((info:UserLoginProps)=>{
        setLoginInfo(info)
    }, [])

    const registerUser = useCallback(async(e:any)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)

       const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

       setIsRegisterLoading(false)

       if(response.error){
        return setRegisterError(response)
       }

       //save our user to local storage so that when we refresh we dont have login again, cos we would get the user back
       localStorage.setItem("user", JSON.stringify(response))
       setUser(response)
    }, [registerInfo])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("user")
        setUser(null)
    }, [])


    //loginUser function
    const loginUser = useCallback(async(e:any)=>{
        //prevent default so that the action doesnt refresh our page
    e.preventDefault()

    //handle loading state and error state
    setIsLoginLoading(true)
    setLoginError(null)

    const  response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
    setIsLoginLoading(false)
    if(response.error){
        return setLoginError(response)
    }
    localStorage.setItem("user", JSON.stringify(response))
    setUser(response)
    }, [loginInfo])

    return <AuthContext.Provider value={{
        user, registerInfo, updateRegisterInfo, isRegisterLoading, registerUser, registerError, logoutUser, loginUser, updateLoginInfo, loginInfo, loginError, isLoginLoading
    }}>
        {children}
    </AuthContext.Provider>
}
