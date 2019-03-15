<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;margin-right: 20px;">
      <Card v-model="articleDetail" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">

        <p style="font-size: 20px;">
          <span style="line-height: 40px;"><Tag color="green">文</Tag>{{articleDetail.articleTitleName}}
          </span>


        </p>
        <div style="position:absolute;width:50px;right: 15px;top:25px;">
          <Tag v-if="articleDetail.isSticky === 1" style="float: left;" color="green">置顶</Tag>
          <Tag v-if="articleDetail.isFine === 1" style="float: left;" color="gold">精选</Tag>
        </div>
        <!--<div style="line-height: 20px;">-->
        <!--<Tag v-if="articleDetail.isFine === 1" style="float: left;" color="gold">精选文章</Tag>-->
        <!--</div>-->
        <div style="position:absolute;width:50px;right: 15px;top:15px;">
        </div>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <!--<Tag style="position:absolute;right: 15px;top:40px;" color="gold">精选</Tag>-->
        <Divider/>
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">

          <!--<img style="width:100%;height:200px;" :src="articleDetail.articleTitleIcon">-->

          <p style="width: 100%;float: left;margin-right: 30px;" v-html="articleDetail.articleContent">
            {{articleDetail.articleContent}}
          </p>

        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag v-for="articleTag in articleDetail.articleClassifyGroup" color="cyan">{{articleTag}}</Tag>
        </div>

      </Card>


      <Card v-if="isLogin" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">评论</span>
        </p>
        <Divider/>
        <div style="width: 100%;">
          <Input style="width: 90%;margin:10px;" v-model="commentContentMsg" type="textarea"
                 :autosize="{minRows: 3,maxRows: 5}" :rows="4" placeholder="输入评论内容..."/>
          <Button style="width: 90%;margin:10px;" type="primary" @click="commentPush">提交</Button>
        </div>
      </Card>

      <Card v-else style="text-align:center;width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <img style="width:180px;height:120px;" src="../../assets/article/not_login.jpg">
        <p style="font-size: 22px;">尚未登录</p>
        <p>您当前尚未登录，无法使用<strong>评论</strong>功能，请先前往登录。</p>
        <div style="width: 100%;">
          <Button style="width: 20%;margin:10px;" type="primary" @click="toLoginPage">登录</Button>
        </div>
      </Card>

      <div v-if="articleDetail.commentNum === 0" style="font-size: 14px;text-align: left">
        <span>暂无评论</span>
      </div>
      <div v-else style="font-size: 12px;text-align: left">
        <span>共计 {{articleCommentTotal}} 条评论</span>
      </div>


      <!--<Divider type="vertical" style="margin-top: -45px;font-size: 30px"/>-->
      <Card v-for="comment in articleCommentList" style="text-align:left;width:100%;float: left;margin-bottom: 5px;"
            :bordered="false" :dis-hover="true">
        <Row>
          <Col span="1">
            <img style="float: left;width:40px;height:40px;" src="../../assets/article/avatar.jpg">

          </Col>
          <Col span="23">
            <Card style="text-align:left;width:98%;float: left;margin-left: 20px;" :dis-hover="true">
              <p style="color: darkgray">
                {{comment.createUserName}}　
                <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
                　{{comment.createDateTime}}　
              </p>

              <p v-if="comment.backToUserId === 0">{{comment.commentContent}}</p>

              <p v-else>{{comment.createUserName}} @ {{comment.backToUserName}} : {{comment.commentContent}}</p>

              <div v-if="comment.children" class="children-item">
                <articleCommentList :list="comment.children"></articleCommentList>
              </div>


            </Card>
          </Col>
        </Row>
      </Card>
      <div style="text-align: center;">
        <Button style="text-align: center;margin:0 auto;" @click="getMoreComment">查看更多</Button>

      </div>

    </FormItem>


    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">关于作者</p>
          <div>
            <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
            <span style="">{{articleUserDetail.userName}}</span>
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
            <Divider/>
            <div>
              <Row style="text-align: center">
                <Col span="11">
                  <Card dis-hover :bordered="false">
                    <p>文章</p>
                    <p><Strong>{{articleUserDetail.articleNum}}</Strong></p>
                  </Card>
                </Col>
                <Col span="11" offset="2">
                  <Card dis-hover :bordered="false">
                    <p>总阅读量</p>
                    <p><Strong>{{articleUserDetail.articleReadNum}}</Strong></p>
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
            <li style="margin-bottom: 4px;">
              <Icon type="ios-time"/>
              发布时间: {{articleDetail.createDateTime}}
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book"/>
              阅读量: {{articleDetail.readNum}}
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="md-pricetags" />
              文章标签: <Tag v-for="articleTag in articleDetail.articleClassifyGroup" color="cyan">{{articleTag}}</Tag>
            </li>

          </ul>




          <!--<Tag color="cyan">java</Tag>-->
          <!--<Tag color="cyan">c语言</Tag>-->
          <!--<Tag color="cyan">python</Tag>-->
          <!--<Tag color="cyan">spring</Tag>-->
          <!--<Tag color="cyan">编程</Tag>-->

        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">ta的其他文章</p>
          <ul style="list-style:none;">
            <li v-for="trendingArticle in authorTrendingList" style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a @click="articleDetails(trendingArticle)">{{trendingArticle.articleTitleName}}</a>
              <Tag color="volcano" style="margin-left: 10px;"><Icon type="ios-chatbubbles"/>{{trendingArticle.commentNum}}</Tag>
            </li>
          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary">
          <Icon type="ios-create-outline"/>
          写文章
        </Button>
      </div>

    </FormItem>


  </Form>


</template>
<script>
  import Httpservice from '@/router/service'

  export default {
    data() {

      props: {
        list: Array
      }
      return {
        authorTrendingList:[],

        commentContentMsg: '',

        articleCommentMsg: {
          commentContent: '',
          commentArticleId: ''

        },

        articleCommentList: [],
        articleCommentTotal: '',

        filter: {
          // 是否精选文章：0全部，1精选
          commentArticleId: '',
          limit: 10,
          page: 1
        },
        trendingSort: {
          createUserId:'',
          limit: 10,
          page: 1
        },

        articleId: {},
        articleUserId: '',
        articleDetail: '',
        articleUserDetail: '',

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
      }
    },

    computed:{
      isLogin(){

        if(window.localStorage.getItem("userName") !== null && window.localStorage.getItem("userName") !== ''){
          return true
        } else {
          return false
        }
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
      getData(articleId) {
        console.log("开始")


        this.$http.get('/api/article/detail', {
          params: {
            'id': articleId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articleDetail = response.data.data
              console.log(this.articleDetail, "11111333333333333311111111")
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
      getUserData(articleUserId) {
        console.log("开始")


        this.$http.get('/api/user/detail', {
          params: {
            'userId': articleUserId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articleUserDetail = response.data.data
              console.log("111**********11111", this.articleUserDetail,)
            } else {
              console.log("no")

              this.articleUserDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },
      getCommentData(params) {
        this.$http.get('/api/article/comment/detail', {params})
          .then((response) => {
            if (response.data.status === 200) {


              console.log("yes", response.data.data.rows)
              this.articleCommentList = response.data.data.rows
              this.articleCommentTotal = response.data.data.total

              console.log("yes......", response.data.data.rows)


            } else {
              console.log("no")

              this.articleUserDetail = ''
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
      userPage() {
        this.$router.push({name: 'UserPage', query: {articleUserId: this.articleUserId}})
      },
      go() {
        this.$router.push('/test')
      },
      toLoginPage() {
        this.$router.push('/login')
      },

      updateReadNum(articleId) {

        this.$http.get('/api/article/updateReadNum', {
          params: {
            'id': articleId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.getData(this.articleId);
              // this.articleDetail = response.data.data
              // console.log(this.articleDetail,"11111333333333333311111111")
            } else {
              console.log("no")

              // this.articleDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      commentPush() {
        this.articleCommentMsg.commentArticleId = this.articleId
        this.articleCommentMsg.commentContent = this.commentContentMsg

        this.$http.post('/api/article/comment/add', this.articleCommentMsg)
          .then((response) => {
            if (response.data.status === 200) {
              // this.spinShow = false
              this.$Spin.hide();
              this.$router.push('/article')
              // this.getData(this.articleId);
            }

            console.log("add...article...comment:", response)
          })
      },

      getMoreComment(){
        this.filter.page = this.filter.page + 1;
        this.getCommentData(this.filter);
      },
      getAuthorTrendingArticle(params){
        this.$http.get('/api/article/authorTrending', {params})
          .then((response) => {
            if (response.data.status === 200) {
              console.log("yes")
              this.authorTrendingList = response.data.data.rows

            } else {
              console.log("no")

              this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      articleDetails(article) {
        // 页面带参跳转
        this.$router.push({name: 'ArticleDetails',query: {articleId:article.id,articleUserId:article.createUserId}})
        this.$router.go();
      },

    },
    created() {

      this.trendingSort.createUserId = this.$route.query.articleUserId
      this.articleId = this.$route.query.articleId
      this.filter.commentArticleId = this.$route.query.articleId
      this.articleUserId = this.$route.query.articleUserId
      this.updateReadNum(this.articleId);
      this.getAuthorTrendingArticle(this.trendingSort);
      this.getData(this.articleId);
      this.getUserData(this.articleUserId);
      this.getCommentData(this.filter);


      this.changeLimit();

      // this.loginUserName = window.localStorage.getItem("userName");

      console.log("create....$store.state.userName:")

    }
  }
</script>

