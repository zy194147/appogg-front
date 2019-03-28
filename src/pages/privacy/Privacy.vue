<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: aqua;width: 100%;">
      <Card style="width:100%;float: left" :bordered="true" :dis-hover="true" >
        <p  style="font-size: 20px;">
          账户注册隐私协议
        </p>
        <Divider />
        <div style="text-align: left">

          <p><span style="font-size:16px">
          一、注册邮箱仅用于在您的密码忘记时重置密码使用，我们不会向您发送任何其他邮件。
        </span></p><p><span style="font-size:16px">
        二、注册用户名是唯一的。</span></p><p><span style="font-size:16px">
        三、您的注册密码将会加密，任何人都不会知道您的密码。
      </span></p><p><span style="font-size:16px">
        四、注册者用户信息将会完全保密，我们绝不会对任何第三方泄露用户的任何隐私信息。
      </span></p><p><span style="font-size:16px">
        五、网站允许用户以文章形式上传软件、发布文章、发布需求等信息，用户注册即表示不得上传
        <span style="color:#000000">
          违法、<span style="white-space: normal;">
          传播任何虚假的、骚扰性的、中伤他人的、种族歧视性的、辱骂性的、恐吓性的、
          情色的或其他任何非法的信息。</span></span></span>
        </p><p><span style="font-size:16px;color:#000000">
        <span style="white-space: normal;">
          六、您在网站上发布的任何信息的权限归个人所有，同时，您传播的信息所产生的法律效应也自行承担。
        </span></span></p><p><span style="font-size:16px;color:#000000">
        <span style="white-space: normal;"><br/></span>
      </span></p><p><span style="font-size:16px"><br/>
      </span></p><p><span style="font-size:16px"><br/>
      </span></p>
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
      go(){
        this.$router.push('/test')
      }
    },

    signup(){
      this.$router.push('/signup')
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

