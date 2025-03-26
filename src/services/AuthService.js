import { productAxios } from './BaseService';

const AuthService = {
    login(body) {
        return productAxios.post(`/account/login`, { ...body }, { params: null });
    },
    signUp(body) {
        return productAxios.post(`/account/sign-up`, { ...body }, { params: null });
    },
    getListUser() {
        return productAxios.get(`/account/users`, { params: null });
    },
};

export default AuthService;