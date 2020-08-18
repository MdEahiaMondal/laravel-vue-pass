import axios from 'axios'
import store from '../store/index'

import * as  auth from '../apis/auth'
export function api()
{
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: {
            Authorization: 'Bearer '+auth.getAccessToken()
        }
    })
}

export function HttpFile()
{
    return axios.create({
        baseURL: store.state.apiUrl,
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
}

