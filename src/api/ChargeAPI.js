import ApiService from './ApiService'


const api = ApiService()

export const getListChargeAPI = (page_number, page_size) => {
    return api.makeAuthRequest({
        url: `/admin/charge?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET'
    })
}

export const acceptChargeAPI = (id) => {
    return api.makeAuthRequest({
        url: `/admin/charge/accept?id=${id}`,
        method: 'POST'
    })
}

export const declineChargeAPI = (id) => {
    return api.makeAuthRequest({
        url: `/admin/charge/decline?id=${id}`,
        method: 'POST'
    })
}



