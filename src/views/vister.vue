<template>
  <div class="visitor">
    <span class='title'>来访信息</span>
    <van-cell-group>
      <van-cell title="访客类型">
        <van-radio-group v-model="userForm.userType">
          <van-radio class='user-type-radio' :name="1">员工</van-radio>
          <van-radio class='user-type-radio' :name="2">访客</van-radio>
        </van-radio-group>
      </van-cell>
      <div v-if='userForm.userType===1'>
        <van-field required input-align='right' label='选择日期' v-model="userForm.startTime" readonly="readonly"
                   placeholder="请输入用户名"/>
        <van-field required input-align='right' label='人员姓名' v-model="userForm.name" placeholder="请输入真实姓名"/>
        <van-field required input-align='right' label='手机号码' v-model="userForm.tel" placeholder="请输入真实手机号码"/>
        <van-field required input-align='right' label='所属部门' v-model="userForm.department" placeholder="请输入所属部门"/>
        <div class='submit'>
          <van-button size='large' type='danger'>提交</van-button>
        </div>
      </div>
      <div v-else>
        <van-field required input-align='right' label='来访日期' v-model="userForm.startTime" readonly="readonly"
                   placeholder="请输入用户名"/>
        <van-field required error-message='' input-align='right' label='来访姓名' v-model="userForm.name"
                   placeholder="请输入真实姓名"/>
        <van-field required input-align='right' label='手机号码' v-model="userForm.tel" placeholder="请输入真实手机号码"/>
        <van-field required input-align='right' label='从何处来' v-model="userForm.from" placeholder="请输入来处单位或地址"/>
        <van-field required input-align='right' label='拜访人员' v-model="userForm.visitStaff" placeholder="请输入所属部门"/>
        <van-field required input-align='right' label='何时离开' v-model="userForm.endTime" readonly="readonly"
                   @click="timePop = true"
                   placeholder="请输入您将几时几分离开"/>

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
            @change="timeChange"
          />
        </van-popup>
        <van-popup v-model="departmentPop" label="选择日期" position="bottom" :close-on-click-overlay='false'
                   :overlay="true">
          <van-datetime-picker
            v-model="userForm.department"
            type="datetime"
            @cancel="departmentPop = false"
            @confirm="departmentPop = false"
            :min-date="minTime"
            @change="departmentChange"
          />
        </van-popup>
        <van-popup v-model="departmentPop" position="bottom" :close-on-click-overlay='false' :overlay="true">
          <van-picker
            show-toolbar
            :columns="departmentMap"
            @cancel="departmentPop = false"
            @confirm="departmentChange"
          />
        </van-popup>
      </div>
      <van-divider>数智云科提供技术支持</van-divider>
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { departmentMap } from '../config'

export default {
  name: 'home',
  data () {
    return {
      departmentMap,
      timePop: false,
      departmentPop: false,
      minTime: new Date(),
      currentTime: null,
      userForm: {
        userType: 1, // 1访客 2员工,
        startTime: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    timeChange (e) {
      let endTimeArr = e.getValues()
      this.userForm.endTime = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
    },
    departmentChange (value) {
      this.userForm.department = value
      this.departmentPop = false
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
