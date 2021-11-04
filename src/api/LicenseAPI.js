import ApiService from './ApiService'


const api = ApiService()

export const getListLicenseAPI = (page_number, page_size) => {
    return api.makeAuthRequest({
        url: `/admin/license?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET'
    })
}

export const acceptLicenseAPI = (license_id) => {
    return api.makeAuthRequest({
        url: `/admin/license/approve`,
        method: 'POST',
        data: { license_id: license_id }
    })
}
export const declineLicenseAPI = (license_id, reason) => {
    return api.makeAuthRequest({
        url: `/admin/license/decline`,
        method: 'POST',
        data: { license_id: license_id, reason: reason }
    })
}
