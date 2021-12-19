import ApiService from './ApiService'


const api = ApiService()

export const createNewBanner = (body) => {
    return api.makeAuthRequest({
        url: `/admin/banner`,
        method: 'POST',
        data: body
    })
}
export const updateBanner = (body) => {
    return api.makeAuthRequest({
        url: `/admin/update/banner`,
        method: 'POST',
        data: body
    })
}
export const deleteBanner = (body) => {
    return api.makeAuthRequest({
        url: `/admin/delete/banner`,
        method: 'POST',
        data: body
    })
}
export const getListBanner = () => {
    return api.makeAuthRequest({
        url: `/admin/banner`,
        method: 'GET',
    })
}





