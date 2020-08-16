import {api, HttpFile} from "./apis";


export function all()
{
    return api().get('/categories')
}

export function create(data)
{
    return HttpFile().post('/categories', data)
}

export function destroy(id)
{
    return api().delete('/categories/'+id)
}

export function update(data, id)
{
    return HttpFile().post(`/categories/${id}`, data)
}

export function loadMore(nextPage)
{
    return api().get(`/categories?page=${nextPage}`)
}




