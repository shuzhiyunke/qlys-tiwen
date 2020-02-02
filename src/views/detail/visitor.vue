<template>
  <div class="visitor">
    <span class='title'>来访信息</span>
    <van-cell-group>
      <van-field input-align='right' label='来访日期' v-model="userForm.comeTime" :formatter="$dayjs" readonly="readonly"/>
      <van-field input-align='right' label='来访姓名' v-model="userForm.visitorName" readonly="readonly"/>
      <van-field input-align='right' label='手机号码' v-model="userForm.phone" readonly="readonly"/>
      <van-field input-align='right' label='从何处来' v-model="userForm.visitorFrom" readonly="readonly"/>
      <van-field input-align='right' label='拜访人员' v-model="userForm.visitorCall" readonly="readonly"/>
      <van-field input-align='right' label='何时离开' v-model="userForm.leaveTime" readonly="readonly"/>
      <van-field required input-align='right' label='体温' v-model="userForm.temperature" placeholder='请输入体温'>
        <template slot='right-icon'>
          ℃
        </template>
      </van-field>
      <div class='submit'>
        <van-button size='large' type='danger' @click='addTemperature' :disabled='isDisabled'>提交体温</van-button>
      </div>
      <van-popup v-model="timePop" label="选择日期" position="bottom" :close-on-click-overlay='false' :overlay="true">
        <van-datetime-picker
          v-model="currentTime"
          type="datetime"
          @cancel="timePop = false"
          @confirm="timePop = false"
          :min-date="minTime"
          @change="endTimeChange"
        />
      </van-popup>
      <van-divider>数智云科提供技术支持</van-divider>
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { visitorDetail, addTemperature } from '@/api/index'
import { Toast } from 'vant'

export default {
  name: 'home',
  data () {
    return {
      timePop: false,
      minTime: new Date(),
      currentTime: null,
      isDisabled: false,
      userForm: {
        visitorName: 1, // 1访客 2员工,
        comeTime: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.userForm.leaveTime = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
    },
    async onload () {
      try {
        let res = await visitorDetail({ id: this.$route.params.id })
        this.userForm = { ...res[0] }
        console.log(res)
      } catch (e) {
        console.log(e)
        Toast.fail('查询失败')
      }
    },
    async addTemperature () {
      try {
        let res = await addTemperature({ id: this.$route.params.id, temperature: this.userForm.temperature })
        if (res === null) {
          this.isDisabled = true
          Toast.success('提交成功')
        }
      } catch (e) {
        console.log(e)
        Toast.fail('添加失败')
      }
    }
  },
  mounted () {
    this.onload()
  }
}
</script>
<style lang='less' scoped>
  .visitor {
    text-align: left;
    .van-cell-group::after {
      content: normal;
    }
    .title {
      margin: 0;
      margin: 40px 16px 16px;
      padding-left: 5px;
      color: rgba(69, 90, 100);
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      border-left: black 5px solid;
    }
    .user-type-radio {
      font-size: 14px;
      float: left;
      margin: 0 10px;
    }
    .submit {
      padding: 20px 20px;
    }
  }
</style>
