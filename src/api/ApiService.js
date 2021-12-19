import Axios from 'axios'
import { instanceData } from '../model'
const _makeRequest = createRequest => async args => {
    const _headers = args.headers ? args.headers : {}
    const body = args.body ? args.body : {}
    const defaultHeaders = {}
    args = {
        ...args,
        headers: {
            'Content-Type': 'application/json',
            ...defaultHeaders,
            ..._headers,
        },
        body,
    }

    const { data } = await createRequest(args)
    return data

}

const _makeAuthRequest = createRequest => async args => {
    const requestHeaders = args.headers ? args.headers : {}

    const token = instanceData.token;
    let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    args = {
        ...args,
        headers: {
            ...headers,
            ...requestHeaders,
        },
    }

    try {
        return await _makeRequest(createRequest)(args)
    } catch (e) {
        const { response } = e
        console.log('respone eee', args)
        if (!response || !response.data) {
            throw e
        }


    }
}

export default (options = {}) => {
    let BaseURL = 'https://vn-9trip.com/api'
    // let BaseURL = 'http://localhost:3000/api'

    if (options.BaseURL)
        BaseURL = options.BaseURL

    //const baseUrlValidated = options.baseUrl || getEnv('baseAPIUrl')
    const instance = Axios.create({
        baseURL: BaseURL,
        //timeout: 30000,
    })

    return {
        makeRequest: _makeRequest(instance),
        makeAuthRequest: _makeAuthRequest(instance),
    }
}
