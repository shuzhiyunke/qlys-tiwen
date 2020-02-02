<template>
  <div class="visitor">
    <span class='title'>来访信息</span>
    <van-cell-group>
      <van-field input-align='right' label='选择日期' v-model="userForm.comeTime" readonly="readonly"/>
      <van-field input-align='right' label='人员姓名' v-model="userForm.name" readonly="readonly"/>
      <van-field input-align='right' label='手机号码' v-model="userForm.phone" readonly="readonly"/>
      <van-field input-align='right' label='所属部门' v-model="userForm.dept" readonly="readonly"/>
      <van-field required input-align='right' label='体温' v-model="userForm.temperature" placeholder='请输入体温'>
        <template slot='right-icon'>
          ℃
        </template>
      </van-field>
      <div class='submit'>
        <van-button size='large' type='danger'>提交</van-button>
      </div>
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
        visitorName: 1, // 1访客 2员工,
        comeTime: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.userForm.leaveTime = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
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
