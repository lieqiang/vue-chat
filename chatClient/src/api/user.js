import qs from 'qs'
import request from '@/utils/request'
export function signup(query) {
  return request({
    url: '/v1/user/signup',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // params: query
    data: qs.stringify(query)
  })
}

export function test(query) {
  return request({
    url: '/v1/user/test',
    method: 'get'
  })
}
