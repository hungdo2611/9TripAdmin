import ApiService from './ApiService'


const api = ApiService()

export const getListDriverAPI = (page_number, page_size) => {
    return api.makeAuthRequest({
        url: `/admin/driver?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET'
    })
}

export const getInfoDriver = (phone) => {
    return api.makeAuthRequest({
        url: `/admin/driver/info?phone=${phone}`,
        method: 'GET'
    })
}
export const getRecentJourneyAPI = (id) => {
    return api.makeAuthRequest({
        url: `/admin/driver/recentJourney?id=${id}`,
        method: 'GET'
    })
}
export const adminLockedAccountAPI = (id) => {
    return api.makeAuthRequest({
        url: `/admin/lock/driver`,
        method: 'POST',
        data: { _id: id }
    })
}
export const adminUnLockedAccountAPI = (id) => {
    return api.makeAuthRequest({
        url: `/admin/unlock/driver`,
        method: 'POST',
        data: { _id: id }
    })
}
