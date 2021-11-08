import ApiService from './ApiService'


const api = ApiService()

export const sendNotificationAPI = (body) => {
    return api.makeAuthRequest({
        url: `/admin/notification`,
        method: 'POST',
        data: body
    })
}



