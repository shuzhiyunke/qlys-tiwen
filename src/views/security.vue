<template>
  <div class="security">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item,index) in list" :key="index" value="详细信息" is-link
                  :url='item.visitorType==="1"?"/#/detail/member/"+item.id:"/#/detail/visitor/"+item.id'>
          <template v-if='item.visitorType==="1"'>
            <template slot='title'>
              <span class='name-title'>{{item.visitorName||'--'}}</span>
              <van-tag type="primary">员工</van-tag>
            </template>
            <template slot='label'>
              <van-cell class='small-cell' title="手机号码" :value="item.phone"></van-cell>
              <van-cell class='small-cell' title="所属部门" :value="item.dept"></van-cell>
            </template>
          </template>
          <template v-else>
            <template slot='title'>
              <span class='name-title'>{{item.visitorName||'--'}}</span>
              <van-tag type="danger">访客</van-tag>
            </template>
            <template slot='label'>
              <van-cell class='small-cell' title="手机号码" :value="item.phone"></van-cell>
              <van-cell class='small-cell' title="拜访人员" :value="item.visitorCall"></van-cell>
              <van-cell class='small-cell' title="来访日期" :value="item.comeTime | dayjs"></van-cell>
            </template>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <van-divider>数智云科提供技术支持</van-divider>
  </div>
</template>

<script>
import { viewVisitor } from '../api'
import { Toast } from 'vant'

export default {
  name: 'security',
  data () {
    return {
      loading: false,
      list: [],
      refreshing: false,
      isFinished: false,
      typeMap: {
        1: {
          color: 'primary',
          visitorName: '员工'
        },
        2: {
          color: 'danger',
          visitorName: '访客'
        }
      }
    }
  },
  methods: {
    async onLoad () {
      try {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        let res = await viewVisitor()
        this.list = res[0]
        this.loading = false
        this.isFinished = true
      } catch (e) {
        Toast.fail('查询失败')
        this.loading = false
        this.isFinished = true
      }
    },
    onRefresh () {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang='less' scoped>
  .security {
    .name-title {
      display: inline-block;
      min-width: 45px;
      padding-right: 10px;
    }
    .van-cell__title {
      text-align: left;
      padding-right: 10px;
      flex: none;
      width: 70%;
    }
    .van-cell__value {
      flex: none;
      float: right;
    }
    .small-cell {
      font-size: 12px;
      padding: 0;
      .van-cell__title {
        text-align: left;
        padding-right: 10px;
        flex: none;
        width: 25%;
      }
      .van-cell__value {
        text-align: left;
      }
    }
    .small-cell::after {
      content: none;
    }
  }
</style>
