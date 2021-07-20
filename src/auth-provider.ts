// firebase 第三方服务的划  不需要开发者开发
interface User {
    name: string,
    age: number,
    token: string,
}
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({user}: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
}
export const register = (data: {username: string, password: string}) => {
    return fetch(`${apiUrl}/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (res:Response) => {
            if (res.ok) {
                return handleUserResponse(await res.json())
            } else {
                return Promise.reject(data);
            }
        }
    )
}

export const login = (data: {username: string, password: string}) => {
    return fetch(`${apiUrl}/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (res:Response) => {
            if (res.ok) {
                return handleUserResponse(await res.json())
            } else {
                return Promise.reject(data);
            }
        }
    )
}

export const logout = async() => window.localStorage.removeItem(localStorageKey);