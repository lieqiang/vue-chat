import qs from 'qs'
import request from '@/utils/request'
export function signup(query) {
  return request({
    url: '/user/signup',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(query)
  })
}

export function signin(query) {
  return request({
    url: '/user/signin',
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

export function getVchatInfo(query) {
  return request({
    url: '/user/getVchatInfo',
    method: 'get',
    params: query
  })
}

export function search(query) {
  return request({
    url: '/user/search',
    method: 'get',
    params: query
  })
}

// export function addToFriendsList(query) {
//   return request({
//     url: '/user/addToFriendsList',
//     method: 'get',
//     params: query
//   })
// }
