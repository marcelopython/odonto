import axios from 'axios'
import Cookie from 'js-cookie'

export default class Client {

  constructor (uri) {
    this.axios = axios
  }

  boot (uri) {
    this.axios.baseURL = import.meta.env.VITE_VUE_APP_BASE_URL_API
  }

  postLogin (uri, data) {
    console.log(data)
    return fetch(import.meta.env.VITE_VUE_APP_BASE_URL_API + uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        client_id: import.meta.env.VITE_CLIENT_ID,
        grant_type: 'password'
      })
    }).then(response => response.json())
  }

  get (uri, data) {
    this.axios.defaults.headers.common.Authorization = 'Bearer ' + Cookie.get('access_token')
    return this.axios.get(import.meta.env.VITE_VUE_APP_BASE_URL_API + '/api/' + uri)
  }

  post (uri, data) {
    this.axios.defaults.headers.common.Authorization = 'Bearer ' + Cookie.get('access_token')
    return this.axios.post(import.meta.env.VITE_VUE_APP_BASE_URL_API + '/api/' + uri, data)
  }

  put (uri, data) {
    this.axios.defaults.headers.common.Authorization = 'Bearer ' + Cookie.get('access_token')
    return this.axios.put(import.meta.env.VITE_VUE_APP_BASE_URL_API + '/api/' + uri, data)
  }
}
