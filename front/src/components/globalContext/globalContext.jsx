import React, {useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store';


export const Context = createContext();

export const Provider = ({children}) => {
    const [userObj, setUserObj] = useState()
    const globalContext = {
        userObj,
        setUserObj,
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export async function saveInfo(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
    return await SecureStore.getItemAsync(key)
}