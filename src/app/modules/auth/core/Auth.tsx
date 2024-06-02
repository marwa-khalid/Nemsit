/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getProfileInfo} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import { toast,ToastOptions, Id } from 'react-toastify'; 
import { handleError } from './_exception'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  

  const requestUser = async (apiToken: string) => {
    try {
      if (!currentUser) {
        const data = await getProfileInfo(apiToken)
        if (data) {  
          setCurrentUser(data)  
          console.log("hello")
          toast.success("Logged in successfully");
        }
      }
    } catch (error) {
      console.error(error)
    } 
  }
  
  const saveAuth = (auth: AuthModel | undefined) => {
    
    if (auth) {
      authHelper.setAuth(auth);
      //Check if the token has expired
      if(auth.isValid && auth.result.tokenIsValid){
        console.log("Token is valid");
        
        requestUser(auth.result.token);
      }
      else {
       handleError(auth);

      }
    } 
    else {
         authHelper.removeAuth()
      }
    }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
    toast.error("Logged out")
     window.location.href = '/';
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, currentUser, logout, setCurrentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

 
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!currentUser) {
          const data = await getProfileInfo(apiToken)
          if (data) {
            console.log(data)
            setCurrentUser(data)
            
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (auth && auth.result.token) {
      
      // Check if the token has expired
      if (auth.result.tokenIsValid) {
        console.log("Token is valid");
        requestUser(auth.result.token);
      } else {
        console.log("Token has expired. Please log in again.");
     
        setShowSplashScreen(false);
    
    }} else {
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
