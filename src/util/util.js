import {base64encode} from '../store/base64.js'
import {b64Hmacsha1} from '../store/hmacsha1.js'

let TS = Date.parse(new Date())

// 构造加密key值
function structureKey(msg) {
  let cryptoKey = 'qqs/web-app'
  let Str = b64Hmacsha1(cryptoKey, msg)
  console.log('===========' + Str)
  let Base64Str = base64encode(Str)
  console.log('===========' + Base64Str)

  return Base64Str
}

export {
  structureKey,
  TS
}
