/**
 * 接口地址与请求方法
 * @type {{ name : {path: string, method: string} }}
 */
const common = {
  getPaperId: {
    path: 'paper/id.do',
    method: 'GET'
  },
  getProblem: {
    path: 'questions.do',
    method: 'GET'
  },
  handin: {
    path: 'paper/handin.do',
    method: 'POST'
  },
  score: {
    path: 'answer/result.do',
    method: 'POST'
  }
}

export default common
