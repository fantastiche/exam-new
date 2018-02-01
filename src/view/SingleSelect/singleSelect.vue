<template>
  <scroll ref="wrapper" :data="list">
    <div class="content">
      <div>
        <div class="question" v-for="(item, index) in list">
          <div class="question-title">{{index+1}}、{{item.titles}}</div>
          <div class="question-answer">
            <div v-for="(itemAnswer,itemAnswerIndex) in item.options">
              <span :class="{'choose':answer[index]=== itemAnswerIndex}"
                    @click="choose(index, itemAnswerIndex, item.id)">{{itemAnswer}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="question-button">
        <div class="question-button-wrap">
          <button class="pageUp" @click="pre()">上一页</button>
          <button class="pageDown" @click="next()">下一页</button>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../components/Scroll/Scroll'
  import {getPaperId, getProblem} from '../../models/common-model'
  import {TS, structureKey} from '../../util/util'

  export default {
    components: {
      Scroll
    },
    data: function () {
      return {
        list: [0, 0, 0, 0, 0],
        answer: [],
        answerId: [],
        answerList: ''
      }
    },
    methods: {
      choose: function (index, answer, id) {
        console.log(index + ',' + id)
        this.$set(this.answer, index, answer)
        this.$set(this.answerId, index, id)
        let str = ''
        this.answer.forEach((item, i, array) => {
          let answerIndex = ''
          switch (item) {
            case 0 :
              answerIndex = 'A'
              break
            case 1:
              answerIndex = 'B'
              break
            case 2:
              answerIndex = 'C'
              break
            case 3:
              answerIndex = 'D'
              break
          }
          if (i === array.length - 1) {
            str += '{"' + this.answerId[i] + '":"' + answerIndex + '"}'
          } else {
            str += '{"' + this.answerId[i] + '":"' + answerIndex + '"}' + ','
          }
        })
        this.answerList = '[' + str + ']'
        localStorage.setItem('singleSelect', this.answerList)
      },
      next: function () {
        this.$router.push({
          path: '/multiSelect'
        })
      },
      pre: function () {
        this.$router.push({
          path: '/judgment'
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
          TYPE: 1,
          DEVICECODE: 'web',
          TS: TS,
          KEY: structureKey('1' + 'web' + TS + '/exam/questions.do')
        }
        getProblem(params, (res) => {
          console.log(res)
          this.list = res.pd
          if (localStorage.getItem('singleSelect')) {
            let str = localStorage.getItem('singleSelect')
            let json = JSON.parse(str)
            json.forEach((item, index, array) => {
              for (let p in item) {
                this.answerId.push(p)
              }
              for (let p in item) {
                let flag = `${item[p]}`
                let num = 0
                switch (flag) {
                  case 'A':
                    num = 0
                    break
                  case 'B':
                    num = 1
                    break
                  case 'C':
                    num = 2
                    break
                  case 'D':
                    num = 3
                    break
                }
                this.answer.push(num)
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
</style>
