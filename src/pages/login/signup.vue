<template>


  <Form style="background-color: #F5F5F5;" ref="userSignUp" :model="userSignUp" :rules="ruleValidate" inline>

    <FormItem style="background-color: #F5F5F5;width: 40%;">
      <Card style="width:100%;float: left;margin-top: 40px;" :bordered="true" :dis-hover="true">
        <p style="font-size: 20px;">
          注册
        </p>
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div>
          <FormItem style="width: 70%;margin:20px;" :model="userSignUp" prop="userEmail">
            <Input v-model.trim="userSignUp.userEmail" prefix="ios-mail" placeholder="邮箱" style="width: 100%;"/>
          </FormItem>
          <FormItem style="width: 70%;margin:20px;" prop="userName">
            <Input v-model.trim="userSignUp.userName" prefix="ios-contact" placeholder="用户名" style="width: 100%;"/>
          </FormItem>
          <FormItem style="width: 70%;margin:20px;" prop="userPassword">
            <Input v-model.trim="userSignUp.userPassword" prefix="md-lock" type="password"  placeholder="密码" style="width: 100%;"/>
          </FormItem>
          <FormItem style="width: 70%;margin:20px;" prop="userPasswordCheck">
            <Input v-model.trim="userSignUp.userPasswordCheck" prefix="md-lock" type="password"  placeholder="确认密码" style="width: 100%;"/>
          </FormItem>
          <Button type="success" :loading="signUpLoading" style="width: 70%;margin:20px;" @click="userSignUpSubmit('userSignUp')">
            <span v-if="!signUpLoading">注册</span>
            <span v-else>正在注册...</span>
          </Button>
          <p>注册即表示您同意我们的
            <a href="/privacy">服务条款与隐私政策</a>

          </p>
          <p>
            已经拥有账户？ <a @click="login">登录</a>
          </p>
        </div>

      </Card>
    </FormItem>


  </Form>


</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data() {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userSignUp.userPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };


      return {

        signUpLoading:false,


        ruleValidate: {
          userEmail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '非法的邮箱格式', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          userPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}

          ],
          userPasswordCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],

        },

        userSignUp: {
          userEmail: "",
          userName: "",
          userPassword: "",
          userPasswordCheck: ""
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
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      login() {
        this.$Loading.start()
        this.$router.push('/login')

        this.$Loading.finish()
      },
      getData() {
        console.log("开始")


        axios.get('/api/hello/say')
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahahahaha", response.data.status);


            if (response.data.status === 200) {
              console.log("yes")
              this.listdata = response.data.data
              console.log(this.listdata, "1111111111111")
            } else {
              console.log("no")

              this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },


      userSignUpSubmit(userSignUp) {
        this.signUpLoading = true

        this.$refs[userSignUp].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');
            // 加入自己的加密规则
            this.userSignUp.userPassword = this.$md5("[9wZ)@To&4h%M&.#_DL]" + this.userSignUp.userPassword)
            this.userSignUp.userPasswordCheck = this.$md5("[9wZ)@To&4h%M&.#_DL]" + this.userSignUp.userPasswordCheck)


            axios.post('/api/user/signUp', this.userSignUp)
              .then((response) => {
                if (response.data.status === 200) {
                  if (response.data.data.status === 1) {
                    this.userSignUp.userPassword = ''
                    this.userSignUp.userPasswordCheck = ''
                    this.$Message.error(response.data.data.message)
                  } else if (response.data.data.status === 2) {
                    this.userSignUp.userPassword = ''
                    this.userSignUp.userPasswordCheck = ''
                    this.$Message.error(response.data.data.message)
                  } else {

                    this.$router.push({name: 'SignUpRemind', params: {signUpUserName: this.userSignUp.userName}})

                    // this.$router.push("/signUpRemind")


                  }
                }

                console.log("user.....login:", response)
              })
          } else {
            this.$Message.error('注册失败');
          }
        })
        this.signUpLoading = false

      },


      changeLimit() {
        function getArrayItems(arr, num) {
          const temp_array = [];
          for (let index in arr) {
            temp_array.push(arr[index]);
          }
          const return_array = [];
          for (let i = 0; i < num; i++) {
            if (temp_array.length > 0) {
              const arrIndex = Math.floor(Math.random() * temp_array.length);
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
      signup() {
        this.$router.push('/signup')

      },

      go() {
        this.$router.push('/test')
      }
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

