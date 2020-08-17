import {api, HttpFile} from "./apis";

export function register(data){
    return api().post('/auth/register', data)
}
