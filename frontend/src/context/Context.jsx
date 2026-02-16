import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../../constant.js";
import { useGetUserById } from "@/api/userApi.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { data } = useGetUserById();

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}