/* 数据存在本地缓存 */
import Cookies from 'js-cookie'

export function setStorage (key, value) {
  let data = JSON.stringify(value)
  Cookies.set(key, data)
}

export function getStorage (key) {
  let data = Cookies.get(key)
  if (data) {
    return JSON.parse(data)
  } else {
    return ''
  }

}

export function removeStroage (key) {
  Cookies.remove(key)
}