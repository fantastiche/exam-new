import apiConfig from '../config/api-config'
import $http from '../util/api-util'

// 消费记录
function baseHttp(params, successCallback, failCallback) {
  let api = apiConfig.expenseRecord
  $http(api, params, function (res) {
    successCallback(res)
  })
}

export {
  baseHttp
}
