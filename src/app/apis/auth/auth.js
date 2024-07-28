import axios from '@/utils/request'

const prefix = '/auth';

export const login = (data) => {
    return axios({
        method: "POST",
        data,
        url: `${prefix}/login`
    })
}

export const logoutRequest = () => {
    return axios({
        method: "POST",
        url: `${prefix}/logout`
    })
}