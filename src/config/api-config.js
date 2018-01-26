/**
 * 接口地址与请求方法
 * @type {{ name : {path: string, method: string} }}
 */
const common = {
  serveRecord: {
    path: 'getServeRecord.do',
    method: 'GET'
  },
  expenseRecord: {
    path: 'getExpenseRecord.do',
    method: 'GET'
  }
}

export default common
