<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: aqua;width: 100%;">
      <Card style="width:100%;float: left" :bordered="true" :dis-hover="true" >
        <p style="font-size: 20px;">
          <span >您当前的会员等级为：</span><img style="width:24px;height:auto" :src="userDetail.userAuthIcon"><strong> {{userDetail.memberLevelName}}</strong>
        </p>
        <p>
          到期时间：未知
        </p>
        <Divider />

        <div style="text-align: left;width:100%;">

          <FormItem>
            <Card v-for="grade in userMemberGrade" style="width:220px;float: left;margin-right: 10px;margin-bottom: 10px" :dis-hover="true" >
              <div style="text-align:center;width:100%;" >
                <h3>{{grade.authName}}</h3>
                <img :src="grade.authIcon">
                <p>¥ {{ grade.authPrice }} /年</p>

                <Button type="primary" shape="circle" v-if="grade.authPrice != 0"  @click="modal3 = true">购买</Button>
                <Button type="primary" shape="circle" v-else>永久有效</Button>
                <Divider/>
                <div style="text-align:left;width:100%;">

                  <div v-for="operateGrade in userAuthOperateGrade">

                    <p v-if="grade.authId >= operateGrade.authGradeId">
                      <Icon type="md-checkmark" /> {{operateGrade.authOperateContent}}

                      <Tooltip :content="operateGrade.authOperateIntr">
                        <Icon type="ios-help-circle-outline" />
                      </Tooltip>
                    </p>
                    <p v-else>
                       <span style="color: #aaaaaa"><Icon type="md-close" /> {{operateGrade.authOperateContent}}</span>
                    </p>

                  </div>


                </div>


              </div>
            </Card>
          </FormItem>

          <Modal v-model="modal3">

            <br/>
            <br/>
            <Alert>
              提示
              <template slot="desc">请先添加管理员 微信 或 支付宝 为好友，然后完成转账。
                付款完成后，请联系管理员，我们会尽快为您开通对应会员，并以邮件和站内消息通知您。</template>
            </Alert>
            <div>
              <div style="float: left;margin-right: 20px;text-align: center">
                <img style="width:200px;height:auto" src="../../assets/pay/wechat.jpg">
                <p style="font-size: 20px;color: green"><strong>微信</strong></p>
              </div>
              <div style="text-align: center">
                <img style="width:200px;height:auto" src="../../assets/pay/alipay.jpg">
                <p style="font-size: 20px;color: deepskyblue;"><strong>支付宝</strong></p>

              </div>
            </div>
          </Modal>

        </div>
      </Card>
    </FormItem>


  </Form>




</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data () {
      return {

        modal3: false,

        userId: '',
        userLoginId:'',
        userDetail: '',
        userMemberGrade:[],
        userAuthOperateGrade:[],

        http:Httpservice.getAxios,
        listdata:[],
        theme1: 'light',

      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },

      getData(userId) {
        console.log("开始")

        this.$http.get('/api/user/detail', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.userDetail = response.data.data
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.userDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getMemberGrade() {
        console.log("开始")

        this.$http.get('/api/user/memberGrade')
          .then((response) => {
            if (response.data.status === 200) {
              this.userMemberGrade = response.data.data.rows
              console.log("111*******////***11111", this.userDetail,)
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      getAuthGradeOperate() {
        console.log("开始")

        this.$http.get('/api/user/authGrade')
          .then((response) => {
            if (response.data.status === 200) {
              this.userAuthOperateGrade = response.data.data.rows
              console.log("111*******////***11111", this.userDetail,)
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      changeLimit () {
        function getArrayItems(arr, num) {
          const temp_array = [];
          for (let index in arr) {
            temp_array.push(arr[index]);
          }
          const return_array = [];
          for (let i = 0; i<num; i++) {
            if (temp_array.length>0) {
              const arrIndex = Math.floor(Math.random()*temp_array.length);
              return_array[i] = temp_array[arrIndex];
              temp_array.splice(arrIndex, 1);
            } else {
              break;
            }
          }
          return return_array;
        }
        this.randomMovieList = getArrayItems(this.movieList, 5);
      },
      go(){
        this.$router.push('/test')
      }
    },





    signup(){
      this.$router.push('/signup')
    },
    created() {
      this.userId = this.$route.query.userId
      this.getData(this.userId);
      this.getMemberGrade();
      this.getAuthGradeOperate();
      this.changeLimit();
    }
  }
</script>

