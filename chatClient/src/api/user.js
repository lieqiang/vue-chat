import qs from 'qs'
import request from '@/utils/request'

export function getAccessToken(query) {
  return request({
    url: '/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(query)
  })
}

export function verifyToken(query) {
  return request({
    url: '/token/verify',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(query)
  })
}

export function signup(query) {
  return request({
    url: '/user/signup',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function getUserInfo(query) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: query
  })
}

export function getVchatInfo() {
  return request({
    url: '/user/getVchatInfo',
    method: 'get'
  })
}

export function search(query) {
  return request({
    url: '/user/search',
    method: 'get',
    params: query
  })
}

export function findMyfriends(query) {
  return request({
    url: '/user/findMyfriends',
    method: 'get',
    params: query
  })
}

export function updateUserInfo(query) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data: query
  })
}
