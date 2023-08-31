import * as opsService from './Ops'
import * as dataConstants from '../constants/Data.constant'

const postApiCall = async (url, data, token) => {
    try {
        let result = await opsService.postData(dataConstants.base.api + url, data, token);
        return result;
    } catch (e) {
        return { status: false, data: {}, message: e.message }
    }
   },
   postApiCallPayment = async (url, data, token) => {
    try {
        let result = await opsService.postData(dataConstants.base.apiPayment + url, data, token);
        return result;
    } catch (e) {
        return { status: false, data: {}, message: e.message }
    }
   },
    getApiCall = async (url, token) => {
        try {
            let result = await opsService.getData(dataConstants.base.api + url, token);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.response }
        }
    },
    apiImageUpload = async (url, data, token) => {
        try {
            const contentType = "multipart/form-data"
            let result = await opsService.postDataContent(dataConstants.base.api + url, data, token, contentType);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.response }
        }
    },
    deleteData = async (url, token) => {
        // console.log('---url---',url)
        try {
            let result = await opsService.deleteData(dataConstants.base.api + url, token);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.response }
        }
    }

export {
    postApiCall,
    getApiCall,
    apiImageUpload,
    deleteData,
    postApiCallPayment
}