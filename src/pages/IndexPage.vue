<template>



  <Form style="background-color: darkblue;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: aqua">
      <Card style="width:26%;float: left;margin:20px;" class="mb-10" >
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
      <Card style="width:26%;float: left;margin:20px;" class="mb-8" >
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
      <Card style="width:26%;float: left;margin:20px;" class="mb-3" >
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
      <Card style="width:26%;float: left;margin:20px;">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
      <Card style="width:26%;float: left;margin:20px;">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
      <Card style="width:26%;float: left;margin:20px;">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
        </a>
        <ul style="list-style: none">
          <li v-for="item in randomMovieList">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
            <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
          </li>
        </ul>
      </Card>
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

    <Button type="primary" @click="go">登录</Button>

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
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

