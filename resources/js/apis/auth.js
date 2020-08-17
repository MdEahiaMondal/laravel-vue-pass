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

