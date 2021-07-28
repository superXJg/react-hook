import React, { ReactNode, useEffect, useState } from "react";
import * as auth from 'auth-provider'
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
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

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', {token});
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const {data: user, isLoading, isError, isIdle, run, setData: setUser, error} = useAsync();
    const login = (form: AuthForm) => auth.login(form).then((res) => {
        setUser(res);
    });
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(user => setUser(null));

    useEffect(() => {
        run(bootstrapUser())
    }, [])

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }
    if (isError) {
        return <FullPageErrorFallback error={error}/>
    }

    return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用')
    }
    return context
}

