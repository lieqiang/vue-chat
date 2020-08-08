import request from '@/utils/request'

export function uploadImg(query) {
  return request({
    url: '/upload/uploadImg',
    method: 'post',
    data: query
  })
}
