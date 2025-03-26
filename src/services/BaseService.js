import qs from 'qs';
import axios from 'axios';
 
const process = import.meta.env;
 
let accessToken = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null') ? JSON.parse(window.localStorage.getItem("data")).token : "";
let timeout = 60000 * 3;
function config(url) {
    return {
        baseURL: url,
        timeout,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "token": `Bearer ${accessToken}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": '*',
            // "Content-Type": 'multipart/form-data',
            // 'Access-Control-Allow-Methods':'"GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"'
        },
        params: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        },
        withCredentials: false
    }
}
 
function resolve(axiosInstance) {
    axiosInstance.interceptors.response.use((response) => {
        if (response.status === 401) {
            alert("You are not authorized");
        }
        return response;
    }, (error) => {
        console.error(error)
        if (error.response && error.response.data) {
            if (error.response.data.code == 4000) {
                // window.location.href = "/login";
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    });
}
 
const productAxios = axios.create(config(`${process.VITE_API_URL}`));
const multipartAxios = axios.create(configMultipart(`${process.VITE_API_URL}`));
 
resolve(productAxios)
resolve(multipartAxios)
 
function configMultipart(url) {
    return {
        baseURL: url,
        timeout,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "token": `Bearer ${accessToken}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": '*',
            "Content-type": "multipart/form-data",
        },
        params: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        },
        withCredentials: false
    }
}
 
export function ApiCallService(baseURL) {
 
    return axios.create({
        baseURL: baseURL,
        timeout,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "token": `Bearer ${accessToken}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": '*',
        },
        params: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        },
        withCredentials: false
    });
}
 
export { productAxios, multipartAxios };