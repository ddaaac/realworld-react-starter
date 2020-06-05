import axios from "axios";

const BASE_URL = "https://conduit.productionready.io/api";

const METHOD = {
  GET(url, config) {
    return axios.get(url, config);
  },
  POST(url, data, config) {
    return axios.post(url, data, {
      ...config,
      "Accept": "application/json",
      "Content-Type": "application/json",
    });
  },
  PUT(url, data, config) {
    return axios.put(url, data, {
      ...config,
      "Accept": "application/json",
      "Content-Type": "application/json",
    });
  },
  DELETE(url, config) {
    return axios.delete(url, config);
  }
};

const setTokenHeader = (headers, token) => {
  if (!token) {
    return headers;
  }
  return {
    ...headers,
    "Authorization": `Token ${token}`,
  };
};

const api = (() => {
  const users = {
    getMyInfo(token) {
      return METHOD.GET(`${BASE_URL}/user`, {
        headers: setTokenHeader({}, token),
      });
    },
    login({email, password}) {
      return METHOD.POST(`${BASE_URL}/users/login`, {
        user: {
          email,
          password,
        },
      });
    },
    register({email, password, username}) {
      return METHOD.POST(`${BASE_URL}/users`, {
        user: {
          email,
          password,
          username,
        },
      });
    },
    updateMyInfo(token, {email, password, username, bio, image}) {
      const data = {
        user: {
          email,
          password,
          username,
          bio,
          image,
        },
      };
      const config = {
        headers: setTokenHeader({}, token),
      };
      return METHOD.PUT(`${BASE_URL}/user`, data, config);
    },
  };

  const articles = {
    create(token, {title, description, body, tagList}) {
      return METHOD.POST(`${BASE_URL}/articles`, {
        article: {
          title,
          description,
          body,
          tagList,
        },
      }, {headers: setTokenHeader({}, token)});
    },
    get({tag, author, favorited, limit, offset, token}) {
      return METHOD.GET(`${BASE_URL}/articles`, {
        params: {tag, author, favorited, limit, offset},
        headers: setTokenHeader({}, token),
      });
    },
    getBySlug(slug) {
      return METHOD.GET(`${BASE_URL}/articles/${slug}`);
    },
    update(token, slug, {title, description, body}) {
      const data = {
        article: {
          title,
          description,
          body,
        },
      };
      const config = {
        headers: setTokenHeader({}, token),
      };
      return METHOD.PUT(`${BASE_URL}/articles/${slug}`, data, config);
    },
    delete(token, slug) {
      return METHOD.DELETE(`${BASE_URL}/articles/${slug}`, {headers: setTokenHeader({}, token)});
    },
  };

  return {
    users,
    articles,
  }
})();

export default api;