import ApiService from './ApiService'


const api = ApiService()

export const getListCoupon = (page_number, page_size) => {
    return api.makeAuthRequest({
        url: `/admin/coupon?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET'
    })
}

export const addNewCoupon = (body) => {
    return api.makeAuthRequest({
        url: `/coupon/add`,
        method: 'POST',
        data: body
    })
}
export const updateCoupon = (body) => {
    return api.makeAuthRequest({
        url: `/coupon/update`,
        method: 'POST',
        data: body
    })
}



