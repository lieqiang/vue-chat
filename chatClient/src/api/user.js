import qs from 'qs'
import request from '@/utils/request'
export function signup(query) {
  return request({
    url: '/v1/user/signup',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(query)
  })
}

export function signin(query) {
  return request({
    url: '/v1/user/signin',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function getUserInfo(query) {
  return request({
    url: '/v1/user/getUserInfo',
    method: 'get',
    params: query
  })
}

export function search(query) {
  return request({
    url: '/v1/user/search',
    method: 'get',
    params: query
  })
}
