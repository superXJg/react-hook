import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
interface AuthForm {
    username: string,
    password: string
}
interface User {
    name: string,
    age: number,
    token: string,
}
const AuthContext = React.createContext<{
    user: any,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<any>(null);

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(user => setUser(null));

    return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用')
    }
    return context
}

