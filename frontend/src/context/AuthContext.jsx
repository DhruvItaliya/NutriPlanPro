import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [user, setUser] = useState({});
    const contextValue = { isAuthenticate, setIsAuthenticate, user, setUser };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}