import ApiService from './ApiService'


const api = ApiService()
export const loginAPI = (body) => {
    return api.makeRequest({
        url: `/admin/login`,
        method: 'POST',
        data: body
    })
}
export const logoutAPI = () => {
    return api.makeAuthRequest({
        url: `/admin/logout`,
        method: 'POST'
    })
}

