<template>



  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >

        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <div  style="position:absolute;width:50px;right: 15px;top:15px;">
        </div>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <!--<Tag style="position:absolute;right: 15px;top:40px;" color="gold">精选</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">

            <img style="width:100%;height:200px;" src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">

          <p style="width: 100%;float: left;margin-right: 30px;">
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
            iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
            我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
            这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。



            写给 iView 开发者的一封信
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。

            一般遇到问题怎么办
            许多开发者，尤其是刚入行的小伙伴，在工作中或多或少都会遇到难解的问题，曾今的我也是一样，好在我一直很幸运，每个阶段都会遇到很厉害的同事，帮我“渡过难关”。但并不是所有的人遇到困难都会有效的得到帮助。我们先分析一下，遇到编程问题，一般有哪些渠道来解决。

            QQ / 微信群
            SegmentFault / Stackoverflow 等技术社区
            问同事
            每个人都期望加入大群，但都在小群活跃。QQ / 微信群是程序员很活跃的地方，iView 也组建过官方的 QQ 群，累计有 5000 人左右，每天都沉淀了大量的讨论，虽然我不会一一过目，但偶尔也会快速浏览一下。其中一部分问题是文档中已有的，一部分是比较基础的用法，还有一些相对综合的问题。提问的人很多，解答的人缺少，因为群里的人，绝大多数都是和“你”一类的用户，他们加群也是想解决问题来的，但事实上，并没有得到很好和及时的解决。

            Stackoverflow 就不说了，这是一个门槛较高的程序员社区，不过对于高级程序员来说，是寻找答案最好的地方。我们来说说国内的技术社区。以 SegmentFault 为例，我们以往也一直鼓励除了 bug 反馈，都到 SF 提问，因为 GitHub 只适合处理 bug 本身的问题，对于如何使用不适合在上面探讨。下面是随便截取的一张 SF 关于 iView 标签下的提问：
          </p>

        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>

      </Card>


      <Card style="text-align:center;width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <img style="width:180px;height:120px;" src="../../assets/article/not_login.jpg">
        <p style="font-size: 22px;">尚未登录</p>
        <p>您当前尚未登录，无法使用<strong>评论</strong>功能，请先前往登录。</p>
        <div style="width: 100%;">
          <Button style="width: 20%;margin:10px;" type="primary">登录</Button>
        </div>
      </Card>

      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">评论</span>
        </p>
        <Divider/>
        <div style="width: 100%;">
          <Input style="width: 90%;margin:10px;" v-model="value6" type="textarea" :rows="4" placeholder="输入评论内容..." />
          <Button style="width: 90%;margin:10px;" type="primary">提交</Button>
        </div>
      </Card>
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">关于作者</p>
          <div>
            <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
            <span style="">Aresn</span>
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
            <Divider/>
            <div>
              <Row style="text-align: center">
                <Col span="11">
                  <Card dis-hover :bordered="true">
                    <p>文章</p>
                    <p><Strong>22</Strong></p>
                  </Card>
                </Col>
                <Col span="11" offset="2">
                  <Card dis-hover :bordered="true">
                    <p>总阅读量</p>
                    <p><Strong>3522</Strong></p>
                  </Card>
                </Col>
              </Row>
            </div>


            <Button style="width:100%;" @click="userPage">了解作者</Button>

          </div>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">文章信息</p>


          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;"><Icon type="ios-time" /> 发布时间: 2018-02-14 12:32</li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book" /> 阅读量: 2123</li>

          </ul>


            <Tag color="cyan">java</Tag>
            <Tag color="cyan">c语言</Tag>
            <Tag color="cyan">python</Tag>
            <Tag color="cyan">spring</Tag>
            <Tag color="cyan">编程</Tag>

        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">ta的其他文章</p>
          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iV 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>

          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary"><Icon type="ios-create-outline" /> 写文章</Button>
      </div>

    </FormItem>


  </Form>




</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data () {
      return {

        articleListType:"all",
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
      userPage(){
        this.$router.push('/user')
      },
      go(){
        this.$router.push('/test')
      },
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

