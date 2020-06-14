import Cookies from 'js-cookie'
import { getToken, verifyToken } from '@/api/user'
class Token {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  verify(callBack) {
    var token = Cookies.get('token')
    if (!token) {
      this.getTokenFromServer(callBack)
    } else {
      this._veirfyFromServer(token, callBack)
    }
  }

  async _veirfyFromServer(token, callBack) {
    const res = await verifyToken({ token: token })
    const valid = res.data.isValid
    if (!valid) {
      this.getTokenFromServer(callBack)
    } else {
      callBack && callBack()
    }
  }

  async getTokenFromServer(callBack) {
    const res = await getToken({ username: this.username, password: this.password })
    if (res.data.token) {
      Cookies.set('token', res.data.token, { expires: 7 })
      callBack && callBack()
    }
  }
}

export {
  Token
}
