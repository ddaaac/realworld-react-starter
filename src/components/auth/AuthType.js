const AUTH_TYPE = {
  NEED_LOGIN: {
    subject: 'Sign In',
    path: '/login',
    isRegister: () => false,
  },
  NEED_REGISTER: {
    subject: 'Sign Up',
    path: '/register',
    isRegister: () => true,
  },
  ALREADY_LOGIN: {
    subject: 'Logout',
    path: '',
    isRegister: () => false,
  },
};

export default AUTH_TYPE;