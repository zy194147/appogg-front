<template>



  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>
          <span>　2018-12-11 21:34　</span>
          <Tooltip content="文章评论数" placement="bottom">
            <Icon type="ios-chatbubbles" />32
          </Tooltip>

        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;cursor: pointer;" @click="articleDtails">写给 iView 开发者的一封信</span>
        </p>
        <div  style="position:absolute;width:50px;right: 15px;top:15px;">
          <Tag style="float: left;" color="green">置顶</Tag>
          <Tag style="float: left;" color="gold">精选</Tag>
        </div>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <!--<Tag style="position:absolute;right: 15px;top:40px;" color="gold">精选</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
            iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
            我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
            这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>

      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>          <span>　2018-12-11 21:34　</span>
          <Tooltip content="文章评论数" placement="bottom">
            <Icon type="ios-chatbubbles" />32
          </Tooltip>

        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>



      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>          <span>2018-12-11 21:34</span>
        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <div  style="position:absolute;width:50px;right: 15px;top:15px;">
          <Tag style="float: left;" color="gold">精选</Tag>
        </div>
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
            我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
            这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>


        <div  style="position:absolute;width:50px;right: 15px;bottom:15px;">
          <Icon type="ios-chatbubbles" />32
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>          <span>2018-12-11 21:34</span>
        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。
            iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，
            我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，
            这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>


        <div  style="position:absolute;width:50px;right: 15px;bottom:15px;">
          <Icon type="ios-chatbubbles" />32
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>          <span>2018-12-11 21:34</span>
        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>


        <div  style="position:absolute;width:50px;right: 15px;bottom:15px;">
          <Icon type="ios-chatbubbles" />32
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>          <span>2018-12-11 21:34</span>
        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">写给 iView 开发者的一封信</span>
        </p>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
          <!--<Icon type="ios-loop-strong"></Icon>-->
          <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;">
            这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
          </p>
          <div >
            <img style="position:absolute;right: 40px; width:120px;height: 80px;" src="../../assets/logo.png">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>


        <div  style="position:absolute;width:50px;right: 15px;bottom:15px;">
          <Icon type="ios-chatbubbles" />32
        </div>
      </Card>


      <Page style="text-align: center" :total="29" show-total show-elevator />
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">文章类型</p>
          <RadioGroup v-model="articleListType">
            <Radio label="all">
              <span>全部</span>
            </Radio>
            <Radio label="useful">
              <span>精选</span>
            </Radio>
          </RadioGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">最新发布</p>
          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iV 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>

          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush"><Icon type="ios-create-outline"/> 写文章</Button>
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
      articleDtails(){
        this.$router.push('/articleDetails')
      },
      articlePush(){
        this.$router.push('/articlePush')
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

