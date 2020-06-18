import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires) {
  return Cookies.set(TokenKey, token, expires)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
