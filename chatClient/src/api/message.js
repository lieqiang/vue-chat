import request from '@/utils/request'

export function getNewFriendsMsg(query) {
  return request({
    url: '/message/getNewFriendsMsg',
    method: 'get',
    params: query
  })
}
