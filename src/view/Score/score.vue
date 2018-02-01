<template>
  <scroll ref="wrapper" :data="list">
    <div class="content">
      <div>
        <div class="score border-1px">
          <div class="score-title">你的答案得分为：<span>{{score}}分</span></div>
          <div class="score-more" v-if="score<80&&enable==='true'">你的得分不足<span>80分</span>，未及格，你有一次补考的机会，请点击左上角返回重新考试
          </div>
        </div>
        <div class="wrong-title">答错<span>{{list.length}}</span>道题</div>
        <div class="question" v-for="(item, index) in list" v-if="item.questiontype
===0">
          <div class="question-title">{{index+1}}、{{item.titles}}</div>
          <div class="question-answer">
            <div>
              <span :class="{'choose':item.rightAnswer==='T'}">A、正确</span>
            </div>
            <div>
              <span :class="{'choose':item.rightAnswer==='F'}">B、错误</span>
            </div>
          </div>
        </div>
        <div class="question" v-for="(item, index) in list" v-if="item.questiontype
!=0">
          <div class="question-title">{{index+1}}、{{item.titles}}</div>
          <div class="question-answer">
            <div v-for="(itemAnswer,itemAnswerIndex) in item.options">
              <span :class="{'choose':item.rightAnswer.indexOf(String.fromCharCode(65+itemAnswerIndex))>-1}">{{itemAnswer}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../components/Scroll/Scroll'
  import {getScore, getPaperId} from '../../models/common-model'
  import {TS, structureKey} from '../../util/util'

  export default {
    components: {
      Scroll
    },
    data: function () {
      return {
        list: [],
        score: 0,
        enable: ''
      }
    },
    methods: {},
    created: function () {
      let that = this
      let params = {
        USERID: localStorage.getItem('USERID'),
        LEVEL: localStorage.getItem('LEVEL'),
        CATALOGUE: localStorage.getItem('CATALOGUE'),
        DEVICECODE: 'web',
        TS: TS,
        KEY: structureKey('web' + TS + '/exam/paper/id.do')
      }
      getPaperId(params, (res) => {
        that.enable = res.pd.enable
        let params = {
          SHOPCODE: localStorage.getItem('SHOPCODE'),
          USERID: localStorage.getItem('USERID'),
          PAPERID: res.pd.paperId,
          DEVICECODE: 'web',
          TS: TS,
          KEY: structureKey(localStorage.getItem('SHOPCODE') + localStorage.getItem('USERID') + 'web' + TS + '/exam/answer/result.do')
        }
        getScore(params, (res) => {
          console.log(res)
          that.list = res.pd.resultList
          that.score = res.pd.score
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

  .score {
    padding: 47/@rem;
    text-align: center;
    .score-title {
      .dpr-font(17px);
      color: #323232;
      span {
        color: #ff73b7;
      }
    }
    .score-more {
      .dpr-font(12px);
      color: #888888;
      margin-top: 20/@rem;
      span {
        color: #ff73b7;
      }
    }
  }

  .wrong-title {
    padding: 30/@rem 30/@rem 0/@rem 30/@rem;
    .dpr-font(14px);
    color: #323232;
    span {
      color: #ff73b7;
      margin: 0 15/@rem;
    }
  }
</style>
