import ApiService from './ApiService'


const api = ApiService()

export const getListCustomer = (page_number, page_size) => {
    return api.makeAuthRequest({
        url: `/admin/customer?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET'
    })
}

export const getInfoCustomer = (phone) => {
    return api.makeAuthRequest({
        url: `/admin/customer/info?phone=${phone}`,
        method: 'GET'
    })
}
export const getRecentBooking = (id) => {
    return api.makeAuthRequest({
        url: `/admin/customer/recentBooking?id=${id}`,
        method: 'GET'
    })
}

