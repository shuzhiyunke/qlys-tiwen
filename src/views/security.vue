<template>
  <div class="security">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item,index) in list" :key="index"  value="详细信息" is-link :url='item.type===1?"/detail/member/"+item.id:"/detail/visitor/"+item.id'>
            <template v-if='item.type===1'>
              <template slot='title'>
                <span class='name-title'>{{item.name}}</span>
                <van-tag type="primary">员工</van-tag>
              </template>
              <template slot='label'>
                <van-cell class='small-cell' title="手机号码" :value="item.tel"></van-cell>
                <van-cell class='small-cell' title="所属部门" :value="item.department"></van-cell>
              </template>
            </template>
            <template v-else>
              <template slot='title'>
                <span class='name-title'>{{item.name}}</span>
                <van-tag type="danger">访客</van-tag>
              </template>
              <template slot='label'>
                <van-cell class='small-cell' title="手机号码" :value="item.tel"></van-cell>
                <van-cell class='small-cell' title="拜访人员" :value="item.visitStuff"></van-cell>
                <van-cell class='small-cell' title="来访日期" :value="item.time | dayjs"></van-cell>
              </template>
            </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <van-divider>数智云科提供技术支持</van-divider>
  </div>
</template>

<script>
export default {
  name: 'security',
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      refreshing: false,
      typeMap: {
        1: {
          color: 'primary',
          name: '员工'
        },
        2: {
          color: 'danger',
          name: '访客'
        }
      }
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push({
            id: 'bububuuububuub',
            name: '张艺谋',
            visitStuff: '徐峥',
            tel: '13543432233',
            department: '综合部',
            type: i % 2 ? 1 : 2,
            time: new Date()
          })
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

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
      padding-right: 10px;
    }
    .van-cell__title{
      text-align: left;
      padding-right: 10px;
      flex: none;
      width: 70%;
    }
    .van-cell__value{
      flex: none;
      float: right;
    }
    .small-cell{
      font-size: 12px;
      padding: 0;
      .van-cell__title{
        text-align: left;
        padding-right: 10px;
        flex: none;
        width: 25%;
      }
      .van-cell__value{
        text-align: left;
      }
    }
    .small-cell::after{
      content: none;
    }
  }
</style>
