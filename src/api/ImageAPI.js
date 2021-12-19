import Axios from 'axios'

const url = `https://vn-9trip.com`
export const UploadImageApi = async (formdata) => {
    let request = await Axios.post(`${url}/upload/single`, formdata, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } });
    return request.data
}

export const UploadMultipleImageApi = async (formdata) => {
    try {
        let request = await Axios.post(`${url}/upload/multiple`, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
        return request.data
    } catch (err) {
        console.log('err api', err)
    }

}