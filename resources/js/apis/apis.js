import axios from 'axios'
import store from '../store/index'

export function api()
{
    return axios.create({
        baseURL: store.state.apiUrl
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

