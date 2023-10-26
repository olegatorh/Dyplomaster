import React, { useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store';


export const Context = createContext();

export const Provider = ( { children } ) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ userObj, setUserObj ] = useState()
  const [ token, setToken ] = useState()


  const globalContext = {
    isLoggedIn,
    setIsLoggedIn,
    userObj,
    setUserObj,
    setToken,
    token
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

