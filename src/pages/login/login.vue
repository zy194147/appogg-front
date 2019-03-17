<template>


  <Form style="background-color: #ffffff;" ref="userLogin" :model="userLogin" :rules="ruleValidate" inline>

    <FormItem style="background-color: #ffffff;width: 40%;">
      <Card style="width:100%;float: left;margin-top: 40px;" :bordered="true" :dis-hover="true">
        <p style="font-size: 20px;">
          登录
        </p>
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div>
          <FormItem style="width: 70%;margin:20px;" prop="userName">
            <Input v-model.trim="userLogin.userName" prefix="ios-contact" placeholder="用户名或邮箱"
                   style="width: 100%;"/>
          </FormItem>
          <FormItem style="width: 70%;margin:20px;" prop="userPassword">
            <Input v-model.trim="userLogin.userPassword" prefix="md-lock" type="password" placeholder="密码"
                   style="width: 100%;"/>
          </FormItem>
          <Button type="success" style="width: 70%;margin:20px;" @click="userLoginSubmit('userLogin')">登录</Button>


          <p>
            <a href="/recover">忘记密码？</a>

          </p>
          <p>
            尚未拥有账户？ <a @click="signup">注册</a>
          </p>
        </div>

      </Card>
    </FormItem>


  </Form>


</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {

        ruleValidate: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}

          ],
        },

        userToken: '',
        userLogin: {
          userName: "",
          userPassword: ""
        },
        formInline: {
          user: '',
          password: ''
        },
        http: Httpservice.getAxios,
        listdata: [],
        theme1: 'light',
      }
    },
    methods: {

      ...mapMutations(['changeLogin']),
      handleSubmit(name) {
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

      userLoginSubmit(userLogin) {


        this.$refs[userLogin].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');

            this.userLogin.userPassword = this.$md5(this.userLogin.userPassword)

            axios.post('/api/user/login', this.userLogin)
              .then((response) => {
                let data = response.data;
                this.$store.commit('changeLogin', data);
                if (response.data.status === 200) {

                  // this.spinShow = false

                  this.userToken = response.data.data.token

                  // this.changeLogin({ Authorization: this.userToken });

                  // window.localStorage.setItem('token',this.userToken)
                  // console.log("userName:" ,response.data.data.user.userName,this.$store)
                  // this.$store.commit('handleUserName',response.data.data.user.userName);
                  // window.localStorage.setItem('loginUser',response.data.data.user)

                  console.log("loginUser:", window.localStorage.getItem("loginUser"))
                  this.$router.go("/")
                  this.$router.push("/")
                }

                console.log("user.....login:", response)
              })
          } else {
            this.$Message.error('登录失败');
          }
        })

      },

      signup() {
        this.$Loading.start()
        this.$router.push('/signup')
        this.$Loading.finish()
      },
      go() {
        this.$router.push('/test')
      }
    },

    signup() {
      this.$router.push('/signup')
    },
    created() {

      this.getData();
    }
  }
</script>

