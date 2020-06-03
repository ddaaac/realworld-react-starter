const tokenKey = "realWorldToken";

const tokenAdmin = {
  setToken(token) {
    localStorage.setItem(tokenKey, token);
  },
  getToken() {
    return localStorage.getItem(tokenKey);
  },
  clearToken() {
    localStorage.removeItem(tokenKey);
  },
};

export default tokenAdmin;