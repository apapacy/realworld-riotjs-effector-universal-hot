import axios from 'axios'

const baseURL = 'https://conduit.productionready.io/api'
const transport = axios.create({
  baseURL,
  withCredentials: true
})

let JWT

if (typeof window !== 'undefined') {
  JWT = window.__GWT__
  delete window.__GWT__
}

export function setJWT (value) {
  JWT = value
}

export function request (req, { url, method, params, data }) {
  const headers = {}
  if (req && req.token) {
    headers.Authorization = `Token ${req.token}`
  } else if (req && req.signedCookies.token) {
    headers.Authorization = `Token ${req.signedCookies.token}`
  } else if (JWT) {
    headers.Authorization = `Token ${JWT}`
  }
  return transport.request({ url, method, params, data, headers })
}
