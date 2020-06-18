import Vue from 'vue'
import { Toast } from 'vant'
import { getToken, setToken } from '@/utils/auth'
import { getAccessToken, verifyToken } from '@/api/user'
Vue.use(Toast)

class Token {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  verify(callBack) {
    var token = getToken()
    if (!token) {
      this.getTokenFromServer(callBack)
    } else {
      this._veirfyFromServer(token, callBack)
    }
  }

  async _veirfyFromServer(token, callBack) {
    const res = await verifyToken({ username: this.username, password: this.password, token: token })
    if (res.data.error_code !== 0) {
      Toast(res.data.msg)
      return
    }
    const valid = res.data.isValid
    if (!valid) {
      this.getTokenFromServer(callBack)
    } else {
      callBack && callBack()
    }
  }

  async getTokenFromServer(callBack) {
    const res = await getAccessToken({ username: this.username, password: this.password })
    if (res.data.token) {
      setToken(res.data.token, { expires: 7 })
      callBack && callBack()
    }
  }
}

export {
  Token
}
