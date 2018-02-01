<template>
  <scroll ref="wrapper" :data="list">
    <div class="content">
      <div class="wrap" v-if="wrap">
        <span class="weui-loading"></span>
        <span class="wrapper-font">结果计算中....</span>
      </div>
      <div>
        <div class="question" v-for="(item, index) in list">
          <div class="question-title">{{index+1}}、{{item.titles}}</div>
          <div class="question-answer">
            <div v-for="(itemAnswer,itemAnswerIndex) in item.options">
              <span :class="{'choose':option[index][itemAnswerIndex]=== true}"
                    @click="choose(index, itemAnswerIndex, item.id)">{{itemAnswer}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="question-button">
        <div class="question-button-wrap">
          <button class="pageUp" @click="pre()">上一页</button>
          <button class="pageDown" @click="sub">提交</button>
        </div>
      </div>
      <div v-transfer-dom>
        <confirm v-model="show"
                 :title="'提示'"
                 @on-confirm="onConfirm">
          <p style="text-align:center;">确定提交答案？（提交后不可修改）</p>
        </confirm>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../components/Scroll/Scroll'
  import {getPaperId, getProblem, handin} from '../../models/common-model'
  import {TS, structureKey} from '../../util/util'
  import {Confirm, TransferDomDirective as TransferDom, LoadMore} from 'vux'

  export default {
    components: {
      Scroll,
      Confirm,
      LoadMore
    },
    directives: {
      TransferDom
    },
    data: function () {
      return {
        list: [0, 0, 0, 0, 0],
        answer: [],
        answerId: [],
        answerList: '',
        option: [],
        show: false,
        wrap: false
      }
    },
    methods: {
      choose: function (index, itemAnswerIndex, id) {
        let flag = this.option[index][itemAnswerIndex]
        this.option[index][itemAnswerIndex] = !flag
        this.$set(this.option[index], itemAnswerIndex, this.option[index][itemAnswerIndex])
        let str = ''
        let strArray = ''
        this.option[index].forEach((item, itemIndex, array) => {
          if (item === true) {
            str = String.fromCharCode(65 + itemIndex)
            strArray += str
          }
        })
        this.answer[index] = strArray
        this.answerId[index] = id
        let answerStr = ''
        this.answer.forEach((item, itemIndex, array) => {
          if (itemIndex === array.length - 1) {
            answerStr += '{"' + this.answerId[itemIndex] + '":"' + item + '"}'
          } else {
            answerStr += '{"' + this.answerId[itemIndex] + '":"' + item + '"},'
          }
        })
        this.answerList = '[' + answerStr + ']'
        localStorage.setItem('multiSelect', this.answerList)
      },
      pre: function () {
        this.$router.push({
          path: '/singleSelect'
        })
      },
      sub: function () {
        this.show = true
      },
      onConfirm: function () {
        this.wrap = true
        let judgment = localStorage.getItem('judgment')
        let singleSelect = localStorage.getItem('singleSelect')
        let multiSelect = localStorage.getItem('multiSelect')
        let str = ''
        let judgmentJson = JSON.parse(judgment)
        let singleSelectJson = JSON.parse(singleSelect)
        let multiSelectJson = JSON.parse(multiSelect)
        judgmentJson.forEach((item, index, array) => {
          for (let p in item) {
            str += '"' + p + '"' + ':' + '"' + `${item[p]}` + '"' + ','
          }
        })
        singleSelectJson.forEach((item, index, array) => {
          for (let p in item) {
            str += '"' + p + '"' + ':' + '"' + `${item[p]}` + '"' + ','
          }
        })
        multiSelectJson.forEach((item, index, array) => {
          for (let p in item) {
            if (index === array.length - 1) {
              str += '"' + p + '"' + ':' + '"' + `${item[p]}` + '"'
            } else {
              str += '"' + p + '"' + ':' + '"' + `${item[p]}` + '"' + ','
            }
          }
        })
        str = '{' + str + '}'
        let params = {
          SHOPCODE: 'B00035',
          USERID: '8949',
          CONTENT: str,
          PAPERID: this.paperId,
          DEVICECODE: 'web',
          TS: TS,
          KEY: structureKey('B00035' + '8949' + 'web' + TS + '/exam/paper/handin.do')
        }
        handin(params, (res) => {
          localStorage.removeItem('judgment')
          localStorage.removeItem('singleSelect')
          localStorage.removeItem('multiSelect')
          this.$router.push({
            path: '/score'
          })
        })
      }
    },
    created: function () {
      let params = {
        USERID: localStorage.getItem('USERID'),
        LEVEL: localStorage.getItem('LEVEL'),
        CATALOGUE: localStorage.getItem('CATALOGUE'),
        DEVICECODE: 'web',
        TS: TS,
        KEY: structureKey('web' + TS + '/exam/paper/id.do')
      }
      getPaperId(params, (res) => {
        this.paperId = res.pd.paperId
        let params = {
          PAPERID: this.paperId,
          TYPE: 2,
          DEVICECODE: 'web',
          TS: TS,
          KEY: structureKey('2' + 'web' + TS + '/exam/questions.do')
        }
        getProblem(params, (res) => {
          console.log(res)
          this.list = res.pd
          res.pd.forEach((item, index, array) => {
            let optionHelper = []
            item.options.forEach((item2, index2, array2) => {
              optionHelper.push(false)
            })
            this.option.push(optionHelper)
          })
          if (localStorage.getItem('multiSelect')) {
            let str = localStorage.getItem('multiSelect')
            let json = JSON.parse(str)
            json.forEach((item, index, array) => {
              console.log(index)
              for (let p in item) {
                this.answerId.push(p)
              }
              for (let p in item) {
                let flag = `${item[p]}`
                let flagArray = flag.split('')
                flagArray.forEach((item2, index2, array2) => {
                  let flagIndex = item2.charCodeAt() - 65
                  console.log(flagIndex)
                  this.option[index][flagIndex] = true
                })
                console.log(flagArray)
                this.answer.push(`${item[p]}`)
              }
            })
          }
        })
      })
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import "../../common/less/mixin";

  .content {
    position: relative;
    min-height: 100%;
  }

  .question:first-child {
    margin-top: 0;
  }

  .question:last-child {
    padding-bottom: 200/@rem;
  }

  .question {
    padding: 40/@rem 30/@rem;
    margin-top: 20/@rem;
    background: #ffffff;
    .question-title {
      .dpr-font(15px);
      color: #323232;
      margin-bottom: 20/@rem;
    }
    .question-answer {
      div {
        margin-top: 10/@rem;
        padding: 20/@rem;
        padding-left: 50/@rem;
        span {
          padding: 16/@rem 20/@rem;
          background: #fff8fb;
          color: #ff73b7;
          border: 2/@rem solid #ff73b7;
          border-radius: 8/@rem;
          margin-top: 20/@rem;
        }
      }
    }
  }

  .question-button {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    .question-button-wrap {
      display: flex;
      justify-content: space-between;
      padding: 30/@rem;
      button {
        padding: 29/@rem 84/@rem;
        .dpr-font(14px);
        border-radius: 6px;
      }
      .pageUp {
        background: #ffffff;
        color: #ff73b7;
        border: 2/@rem solid #ff73b7;
      }
      .pageDown {
        color: #ffffff;
        background: #ff73b7;
        border: 2/@rem solid #ff73b7;
      }
    }
  }

  .choose {
    background: #ff73b7 !important;
    color: #ffffff !important;
  }

  .wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10005;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .wrapper-font {
      .dpr-font(15px);
      color: #ffffff;
    }
  }
</style>
<style>
  .weui-dialog__btn_primary {
    color: #ff73b7 !important;
  }
</style>
