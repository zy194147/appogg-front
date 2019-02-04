<template>



  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="user">

      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          文章
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people" />
          破解
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            软件

          </template>
          <!--<MenuGroup title="使用">-->
          <MenuItem v-for="d in listdata">{{ d.id }}</MenuItem>
          <!--<MenuItem name="3-2">iphone</MenuItem>-->
          <!--<MenuItem name="3-3">windows</MenuItem>-->
          <!--</MenuGroup>-->
          <!--<MenuGroup title="留存">-->
          <!--<MenuItem name="3-4">linux</MenuItem>-->
          <!--<MenuItem name="3-5">mac</MenuItem>-->
          <!--<MenuItem name="3-6">其他</MenuItem>-->
          <!--</MenuGroup>-->
        </Submenu>
        <MenuItem name="4">
          <Icon type="ios-construct" />
          我的地盘
        </MenuItem>
      </Menu>
    </FormItem>
    <br/>
    <FormItem>
      <!--<Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
      <!--<Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
      <!--<Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
      <!--<Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
    </FormItem>





    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider>With Text</Divider>
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider dashed />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>


    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider>With Text</Divider>
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider dashed />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>


    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider>With Text</Divider>
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider dashed />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>


    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider>With Text</Divider>
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
    <Divider dashed />
    <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>


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
      }
    },
    created() {

      this.getData();
      this.changeLimit();

      // 页面顶部
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
    }
  }
</script>

