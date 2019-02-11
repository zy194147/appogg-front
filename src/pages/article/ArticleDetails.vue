<template>



  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card v-model="articleDetail" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >

        <p style="font-size: 20px;">
          <span style="line-height: 40px;">{{articleDetail.articleTitleName}}</span>
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
            {{articleDetail.articleContent}}
          </p>

        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag v-for="articleTag in articleDetail.articleClassifyGroup" color="cyan">{{articleTag}}</Tag>
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
          <Input style="width: 90%;margin:10px;" v-model="value6" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :rows="4" placeholder="输入评论内容..." />
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
                  <Card dis-hover :bordered="false">
                    <p>文章</p>
                    <p><Strong>22</Strong></p>
                  </Card>
                </Col>
                <Col span="11" offset="2">
                  <Card dis-hover :bordered="false">
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

        articleId:{},
        articleDetail:'',

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
      getData(articleId) {
        console.log("开始")


        axios.get('/api/article/detail',{
          params : {
            'id' : articleId
          }})
          .then((response) => {
            if(response.data.status === 200){
              this.articleDetail = response.data.data
              console.log(this.articleDetail,"11111333333333333311111111")
            } else {
              console.log("no")

              this.articleDetail = ''
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

      this.articleId = this.$route.params.articleId

      this.getData(this.articleId);
      this.changeLimit();
    }
  }
</script>

