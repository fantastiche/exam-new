import apiConfig from '../config/api-config'
import $http from '../util/api-util'

// 获取考试试卷ID
function getPaperId (params, successCallback, failCallback) {
  let api = apiConfig.getPaperId
  $http(api, params, function (res) {
    successCallback(res.data)
  })
}

// 获取考试试卷题目
function getProblem (params, successCallback, failCallback) {
  let api = apiConfig.getProblem
  $http(api, params, function (res) {
    successCallback(res.data)
  })
}

// 提交考试答案
function handin (params, successCallback, failCallback) {
  let api = apiConfig.handin
  $http(api, params, function (res) {
    successCallback(res.data)
  })
}

// 获取考试成绩
function getScore (params, successCallback, failCallback) {
  let api = apiConfig.score
  $http(api, params, function (res) {
    successCallback(res.data)
  })
}

export {
  getPaperId,
  getProblem,
  handin,
  getScore
}
