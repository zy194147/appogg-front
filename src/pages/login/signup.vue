<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: #ffffff;width: 40%;">
      <Card style="width:100%;float: left;margin-top: 40px;" :bordered="true" :dis-hover="true">
        <p  style="font-size: 20px;">
          注册
        </p>
        <Divider />
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div>
          <Input v-model="userSignUp.userEmail" prefix="ios-mail" placeholder="邮箱" style="width: 70%;margin:20px;" /><br/>
          <Input v-model="userSignUp.userName" prefix="ios-contact" placeholder="用户名" style="width: 70%;margin:10px;" /><br/>
          <Input v-model="userSignUp.userPassword" prefix="md-lock" placeholder="密码" style="width: 70%;margin:20px;" /><br/>

          <Button type="success" style="width: 70%;margin:20px;" @click="userSignUpSubmit">注册</Button>



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
    data () {
      return {


        userSignUp:{
          userEmail:"",
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
      handleSubmit (name) {
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
            console.log(response.data.data,"hahahahahaha",response.data.status);


            if(response.data.status === 200){
              console.log("yes")
              this.listdata = response.data.data
              console.log(this.listdata,"1111111111111")
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


      userSignUpSubmit(){
        this.userSignUp.userPassword = this.$md5(this.userSignUp.userPassword)

        axios.post('/api/user/signUp', this.userSignUp)
          .then((response) => {
            if(response.data.status === 200){
              if(response.data.data.status === 1){
                alert("用户已存在")
              } else {

                this.$router.push({name: 'SignUpRemind', params: {signUpUserName: this.userSignUp.userName}})

                // this.$router.push("/signUpRemind")


              }
            }

            console.log("user.....login:" , response)
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
      signup(){
        this.$router.push('/signup')

      },

      go(){
        this.$router.push('/test')
      }
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

