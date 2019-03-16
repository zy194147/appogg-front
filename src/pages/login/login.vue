<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: #ffffff;width: 40%;">
      <Card style="width:100%;float: left;margin-top: 40px;" :bordered="true" :dis-hover="true" >
        <p  style="font-size: 20px;">
          登录
        </p>
        <Divider />
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div>

          <Input v-model="userLogin.userName" prefix="ios-contact" placeholder="用户名或邮箱" style="width: 70%;margin:20px;" /><br/>
          <Input v-model="userLogin.userPassword" prefix="md-lock" type="password" placeholder="密码" style="width: 70%;margin:10px;" /><br/>

          <Button type="success" style="width: 70%;margin:20px;" @click="userLoginSubmit">登录</Button>



          <p>
            <a href="/recover">忘记密码？</a>

          </p>
          <p>
            尚未拥有账户？ <a  @click="signup" >注册</a>
          </p>
        </div>

      </Card>
    </FormItem>


  </Form>




</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'
  import { mapMutations } from 'vuex';

  export default {
    data () {
      return {


        userToken:'',
        userLogin:{
          userName:"",
          userPassword:""
        },
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        http:Httpservice.getAxios,
        listdata:[],
        theme1: 'light',
      }
    },
    methods: {

      ...mapMutations(['changeLogin']),
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      getData() {
        console.log("开始")

        console.log("结束")
      },

      userLoginSubmit(){

        this.userLogin.userPassword = this.$md5(this.userLogin.userPassword)

        axios.post('/api/user/login', this.userLogin)
          .then((response) => {
            let data  = response.data;
            this.$store.commit('changeLogin', data);
            if(response.data.status === 200){

              // this.spinShow = false

              this.userToken = response.data.data.token

              // this.changeLogin({ Authorization: this.userToken });

              // window.localStorage.setItem('token',this.userToken)
              // console.log("userName:" ,response.data.data.user.userName,this.$store)
              // this.$store.commit('handleUserName',response.data.data.user.userName);
              // window.localStorage.setItem('loginUser',response.data.data.user)

              console.log("loginUser:",window.localStorage.getItem("loginUser"))
              this.$router.go("/")
              this.$router.push("/soft")
            }

            console.log("user.....login:" , response)
          })
      },

      signup() {
        this.$Loading.start()
        this.$router.push('/signup')
        this.$Loading.finish()
      },
      go(){
        this.$router.push('/test')
      }
    },

    signup(){
      this.$router.push('/signup')
    },
    created() {

      this.getData();
    }
  }
</script>

