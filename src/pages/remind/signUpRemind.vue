<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: #ffffff;width: 40%;">
      <Card style="width:100%;float: left;margin-top: 40px;" :bordered="true" :dis-hover="true" >
        <div>

          <img style="width:231px;height: 300px;" src="../../assets/img/success.png">
          <p style="font-size: 16px;">恭喜您注册成功，用户名为：<strong>{{signUpUserName}}</strong>，现在可以使用用户名和密码登录了。</p>
          <Button type="success" style="width: 70%;margin:20px;" @click="login">去登录</Button>

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
        signUpUserName:'',
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

    signup(){
      this.$router.push('/signup')
    },
    created() {

      this.signUpUserName = this.$route.params.signUpUserName


      this.getData();
      this.changeLimit();
    }
  }
</script>

