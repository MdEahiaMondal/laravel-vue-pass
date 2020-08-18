import {api, HttpFile} from "./apis";

export function register(data){
    return api().post('/auth/register', data)
}

export function login(data){
    return api().post('/auth/login', data)
}


export function isLogedIn(){
   const token = localStorage.getItem('authenticated')
    return token != null
}

export function logout()
{
    return api().get('/auth/logout')
}


export function getAccessToken()
{
    const token = localStorage.getItem('authenticated')
    if (token == null){
        return  null
    }
    let access_token = JSON.parse(token)
    return access_token.access_token
}
