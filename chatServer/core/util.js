// const jwt = require('jsonwebtoken') // 生成jwt令牌

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

// const generateToken = function(uid, scope) {
//     const secretKey = global.config.security.secretKey
//     const expiresIn = global.config.security.expiresIn
//     const token = jwt.sign({
//         uid,
//         scope
//     },secretKey,{
//         expiresIn
//     })
//     return token
// }



module.exports = {
  findMembers,
  // generateToken,
}