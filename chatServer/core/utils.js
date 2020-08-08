const jwt = require('jsonwebtoken')
const config = require('@config/config')
const findMembers = function (instance, { // instance LinValidator
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) { // instance LinValidator
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return []
    // 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
    // const object1 = {
    //   property1: 42,
    //   property2: 13
    // };
    // const array1 = [];
    // console.log(Reflect.ownKeys(object1));
    // // expected output: Array ["property1", "property2"]
    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)] // ????????
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true
  }

  return _find(instance)
}

const generateToken = (uid, scope) => {
  const secretKey = config.security.secretKey
  const expiresIn = config.security.expiresIn
  const token = jwt.sign({
    uid,
    scope
  },secretKey,{
    expiresIn
  })
  return token
}

const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

module.exports = {
  findMembers,
  generateToken,
  parseTime
}

