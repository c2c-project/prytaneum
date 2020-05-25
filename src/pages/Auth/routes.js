const BASE_PATH = '/auth';

export default {
    login: `${BASE_PATH}/login`,
    register: `${BASE_PATH}/register`,
    loginTemp: `${BASE_PATH}/login-temporary`,
    logout: `${BASE_PATH}/logoout`,
    forgotPasswordReset: `${BASE_PATH}/forgot-password/reset/:token`,
    forgotPassRequest: `${BASE_PATH}/forgot-password/request`,
    verifyEmail: `${BASE_PATH}/verify-email/:userId`,
    authHome: `${BASE_PATH}/login`,
};
