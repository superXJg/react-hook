import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
import { useCallback } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;
interface Init extends RequestInit {
    data?: object,
    token?: string
}
export const http = async(endpoint: string,  {data, token, headers, ...customConfig}: Init = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toLocaleUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
        // debugger;
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async res => {
        if (res.status === 401) {
            debugger;
            await auth.logout();
            window.location.reload();
            return Promise.reject({message: '重新登录'})
        }
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const {user} = useAuth();
    return useCallback((endpoint: string, config: Init = {}) => http(endpoint, {...config, token: user?.token}), [user?.token])
}