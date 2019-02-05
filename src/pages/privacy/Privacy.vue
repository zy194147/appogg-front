<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: aqua;width: 100%;">
      <Card style="width:100%;float: left" :bordered="true" :dis-hover="true" >
        <p  style="font-size: 20px;">
          账户注册隐私协议
        </p>
        <Divider />

        <p>

          一、接受条款
          1、本协议。。。。。。。。。。。
          2、本协议。。。。。。。。。。。
          3、本协议。。。。。。。。。。。
          4、本协议。。。。。。。。。。。
          二、用户信息条款
          1、用户个人信息。。。。。。
          2、用户个人信息。。。。。。
          3、用户个人信息。。。。。。
          4、用户个人信息。。。。。。
          5、用户个人信息。。。。。。
          6、用户个人信息。。。。。。
          7、用户个人信息。。。。。。
          8、用户个人信息。。。。。。
          9、用户个人信息。。。。。。
          三、服务使用规则
          1、用户完全了解并同意，，，，，，，，，，，，，
          2、用户完全了解并同意，，，，，，，，，，，，，
          3、用户完全了解并同意，，，，，，，，，，，，，
          4、用户完全了解并同意，，，，，，，，，，，，，
          5、用户完全了解并同意，，，，，，，，，，，，，
          四、信息披露的免责条款
          1、为了维护。。。。。。。。

          2、为了维护。。。。。。。。

          3、为了维护。。。。。。。。
          4、为了维护。。。。。。。。
          5、为了维护。。。。。。。。

          五、知识产权
          1、“知识产权”是。。。。。。。。。
          2、“知识产权”是。。。。。。。。。
          3、“知识产权”是。。。。。。。。。
          4、“知识产权”是。。。。。。。。。
          六、其他免责声明
          1、信息依现状提供。。。。。。。。。。
          2、信息依现状提供。。。。。。。。。。
          3、信息依现状提供。。。。。。。。。。
          4、信息依现状提供。。。。。。。。。。
          5、信息依现状提供。。。。。。。。。。
          七、适用法律和争议解决
          1、本协议的成立、生效、履行、解释及因，，，，，，，，，，，
          2、本协议的成立、生效、履行、解释及因，，，，，，，，，，，
          八、其他规定
          1、如本协议中的任何条款因任何原因。。。。。。。。。

          2、如本协议中的任何条款因任何原因。。。。。。。。
        </p>
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
        movieList: [
          {
            name: 'The Shawshank Redemption',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 9.6
          },
          {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
          },
          {
            name: 'Farewell to My Concubine',
            url: 'https://movie.douban.com/subject/1291546/',
            rate: 9.5
          },
          {
            name: 'Forrest Gump',
            url: 'https://movie.douban.com/subject/1292720/',
            rate: 9.4
          },
          {
            name: 'Life Is Beautiful',
            url: 'https://movie.douban.com/subject/1292063/',
            rate: 9.5
          },
          {
            name: 'Spirited Away',
            url: 'https://movie.douban.com/subject/1291561/',
            rate: 9.2
          },
          {
            name: 'Schindlers List',
            url: 'https://movie.douban.com/subject/1295124/',
            rate: 9.4
          },
          {
            name: 'The Legend of 1900',
            url: 'https://movie.douban.com/subject/1292001/',
            rate: 9.2
          },
          {
            name: 'WALL·E',
            url: 'https://movie.douban.com/subject/2131459/',
            rate: 9.3
          },
          {
            name: 'Inception',
            url: 'https://movie.douban.com/subject/3541415/',
            rate: 9.2
          }
        ],
        randomMovieList: [],
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

