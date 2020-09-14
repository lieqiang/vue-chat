export { parseTime } from '@/utils'

export function timeFilter(value, type) {
  if (typeof value === 'string') {
    return value
  }
  var dataTime = ''
  var data = new Date()
  data.setTime(value)
  var year = data.getFullYear()
  var month = addZero(data.getMonth() + 1)
  var day = addZero(data.getDate())
  var hour = addZero(data.getHours())
  var minute = addZero(data.getMinutes())
  var second = addZero(data.getSeconds())
  if (type === 'MD') {
    dataTime = month + '-' + day
  } else if (type === 'MDHM') {
    dataTime = month + '-' + day + ' ' + hour + ':' + minute
  } else if (type === 'HMS') {
    dataTime = hour + ':' + minute + ':' + second
  } else if (type === 'YM') {
    dataTime = year + '-' + month
  }
  return dataTime
}

export function emptyStr(val = '') {
  if (val === '' || val === undefined || val === null) {
    return '-'
  } else {
    return val
  }
}

function addZero(val) {
  if (val < 10) {
    return '0' + val
  } else {
    return val
  }
}

export function countFilter(count) {
  if (!count) {
    return ''
  }
  return count
}
