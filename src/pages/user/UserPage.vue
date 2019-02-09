<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:100%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" :padding="0">

        <div style="position:absolute;width:50px;right: 15px;top:15px;">
        </div>

        <div style="width: 100%;">

          <img style="width:100%;height:200px;"
               src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">
          <img style="position:absolute;width:160px;height:160px;top:140px;left:30px;"
               src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">

          <div style="text-align: left;width:70%;margin-left: 240px;">
            <p>
              <span style="font-size: 18px;"><strong>张永江</strong></span>
              <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

              钻石会员
            </p>
            <p>
              <Icon type="ios-briefcase"/>
              TalkingData |
              <Icon type="ios-pin"/>
              贵阳 |
              <Icon type="ios-create"/>
              专栏作者
              |
              <Icon type="md-male"/>
            </p>
            <p style="margin-bottom: 10px;">
              暂时没有任何简介。
              <!--Hi，我是 Aresn，基于 Vue.js 的开源 UI 组件库 — iView 的作者。-->
              <!--现担任大数据公司 TalkingData 前端架构师。-->
              <!--畅销书籍《Vue.js实战》的作者（Vue.js 作者尤雨溪作序）。-->
              <!--除了前端，也对 Python、Hybrid、Electron 等技术感兴趣。-->
            </p>
          </div>


        </div>


      </Card>


      <!--<div>-->
      <!--<Tabs :animated="false">-->
      <!--<TabPane label="标签一">标签一的内容</TabPane>-->
      <!--<TabPane label="标签二">标签二的内容</TabPane>-->
      <!--<TabPane label="标签三">标签三的内容</TabPane>-->
      <!--</Tabs>-->
      <!--</div>-->


    </FormItem>


    <FormItem style="width:74%;margin-top: -10px;">

      <Card :bordered="true">
        <Tabs :animated="false">
          <TabPane label="文章 22">

            <div>
              <p style="font-size: 20px;">
                <span style="line-height: 40px; cursor: pointer">写给 iView 开发者的一封信</span>
              </p>
              <div style="width: 100%;">
                <p style="width: 76%;float: left;margin-right: 30px;">
                  你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
                  iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
                  我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
                  这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
                </p>
                <div>
                  <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
                </div>
                <Divider/>
              </div>
            </div>
            <div>
              <p style="font-size: 20px;">
                <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
              </p>
              <div style="width: 100%;">
                <p style="width: 76%;float: left;margin-right: 30px;">
                  你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
                  iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
                  我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
                  这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
                </p>
                <div>
                  <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
                </div>
                <Divider/>
              </div>
            </div>
            <div>
              <p style="font-size: 20px;">
                <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
              </p>
              <div style="width: 100%;">
                <p style="width: 76%;float: left;margin-right: 30px;">
                  你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
                  iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
                  我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
                  这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
                </p>
                <div>
                  <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
                </div>
                <Divider/>
              </div>
            </div>
            <div>
              <p style="font-size: 20px;">
                <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
              </p>
              <div style="width: 100%;">
                <p style="width: 76%;float: left;margin-right: 30px;">
                  你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
                  iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
                  我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
                  这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
                </p>
                <div>
                  <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
                </div>
                <Divider/>
              </div>
            </div>

            <Page style="text-align: center" :total="29" show-total show-elevator />


          </TabPane>

          <TabPane label="关注的人 43">

            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>张永福</strong></span>

              <Divider/>

            </div>
            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>张勇赴</strong></span>

              <Divider/>

            </div>
            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>张永富</strong></span>

              <Divider/>

            </div>

            <Page style="text-align: center" :total="29" show-total show-elevator />

          </TabPane>
          <TabPane label="关注者 288">


            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>Aresn</strong></span>

              <Divider/>

            </div>
            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>Aresn</strong></span>

              <Divider/>

            </div>
            <div>
              <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
              <span style="font-size: 16px;"><strong>Aresn</strong></span>

              <Divider/>

            </div>

            <Page style="text-align: center" :total="29" show-total show-elevator />


          </TabPane>
        </Tabs>
      </Card>
    </FormItem>


    <FormItem style="width:23%;margin-top: -10px;">

      <Card :bordered="true" style="text-align: left;margin-bottom: 10px;">
        <p slot="title">分类标签</p>
        <a slot="extra">编辑</a>
        <Tag color="cyan">java</Tag>
        <Tag color="cyan">c语言</Tag>
        <Tag color="cyan">python</Tag>
        <Tag color="cyan">spring</Tag>
        <Tag color="cyan">编程</Tag>
      </Card>
      <Card :bordered="true" style="text-align: center;margin-bottom: 10px;">
        <Icon type="md-paw"/>
        <p>07-11 16:01加入appogg</p>
      </Card>

    </FormItem>


  </Form>


</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data() {
      return {

        articleListType: "all",
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        http: Httpservice.getAxios,
        listdata: [],
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

