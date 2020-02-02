<template>
  <div class="visitor">
    <span class='title'>来访信息</span>
    <van-cell-group>
      <van-field input-align='right' label='来访日期' v-model="userForm.startTime" readonly="readonly"/>
      <van-field input-align='right' label='来访姓名' v-model="userForm.name" readonly="readonly"/>
      <van-field input-align='right' label='手机号码' v-model="userForm.tel" readonly="readonly"/>
      <van-field input-align='right' label='从何处来' v-model="userForm.from" readonly="readonly"/>
      <van-field input-align='right' label='拜访人员' v-model="userForm.visitStaff" readonly="readonly"/>
      <van-field input-align='right' label='何时离开' v-model="userForm.endTime" readonly="readonly"/>
      <van-field required input-align='right' label='体温' v-model="userForm.temperature" placeholder='请输入体温'>
        <template slot='right-icon'>
          ℃
        </template>
      </van-field>
      <div class='submit'>
        <van-button size='large' type='danger'>提交</van-button>
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

export default {
  name: 'home',
  data () {
    return {
      timePop: false,
      minTime: new Date(),
      currentTime: null,
      userForm: {
        userType: 1, // 1访客 2员工,
        startTime: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.userForm.endTime = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
    }
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
