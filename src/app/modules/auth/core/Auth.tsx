/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getProfileInfo} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import { toast,ToastOptions, Id } from 'react-toastify'; 
import { TraceInfoType } from '../core/_models';
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

  function getToastOptions(messageType: number): { type: string; color: string } {
  switch (messageType) {
    case TraceInfoType.Debug:
      return { type: 'info', color: 'grey' };
    case TraceInfoType.Success:
      return { type: 'success', color: 'green' };
    case TraceInfoType.Information:
      return { type: 'info', color: 'blue' };
    case TraceInfoType.Warning:
      return { type: 'warning', color: 'orange' };
    case TraceInfoType.Error:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Critical:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Fatal:
      return { type: 'error', color: 'red' };
    case TraceInfoType.UpgradeError:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Upgrade:
      return { type: 'info', color: 'blue' };
    default:
      return { type: 'error', color: 'black' }; 
  }
}


    const requestUser = async (apiToken: string) => {
      try {
        if (!currentUser) {
          const {data} = await getProfileInfo(apiToken)
          if (data) {
            
            setCurrentUser(data)  
            toast.success("Logged in successfully");
          }
        }
      } catch (error) {
        console.error(error)
        if (currentUser) {
          logout()
        }
      } 
    }
  const saveAuth = (auth: AuthModel | undefined) => {
    
    if (auth) {
      //Check if the token has expired
      if(auth.isValid && auth.result.tokenIsValid){
        console.log("Token is valid");
        authHelper.setAuth(auth)
        requestUser(auth.result.token);
      }
      else {
        let errorMessage = auth.messages[0].message
        let messageType = auth.messages[0].type;
        saveAuth(undefined);
        const { type, color } = getToastOptions(messageType);
        const toastFunction = toast[type as keyof typeof toast] as (errorMessage: string, options?: ToastOptions) => Id;
        toastFunction(errorMessage);
        throw new Error(errorMessage);
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
          const {data} = await getProfileInfo(apiToken)
          if (data) {
            console.log(data)
            setCurrentUser(data)
            
          }
        }
      } catch (error) {
        console.error(error)
        if (currentUser) {
          logout()
        }
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
     
        logout();
        setShowSplashScreen(false);
    
    }} else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
