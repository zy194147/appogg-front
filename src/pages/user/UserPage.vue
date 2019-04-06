<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:100%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" :padding="0">

        <div style="position:absolute;width:50px;right: 15px;top:15px;">
        </div>

        <div style="width: 100%;">

          <img style="width:100%;height:200px;object-fit: cover;"
               :src=userDetail.userPageIcon>
          <img
            style="object-fit: cover;position:absolute;width:160px;height:160px;top:140px;left:30px;border-radius: 4px;border:4px #ffffff solid"
            :src=userDetail.userHeadIcon>

          <div style="text-align: left;width:70%;margin-left: 240px;">
            <p>
              <span style="font-size: 18px;"><strong>{{userDetail.userName}}</strong></span>
              <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

              {{userDetail.memberLevelName}}

              <Button v-if="articleUser.userName === loginUserName" style="margin-left: 30px;" type="dashed"
                      @click="editUserMsg">编辑我的信息
              </Button>
              <Button v-if="loginUserName === 'appogg'" style="margin-left: 30px;" type="primary"
                      @click="editMsg">发布系统通知
              </Button>
              <Button v-if="followStatus === '0' && articleUser.userName != loginUserName" style="margin-left: 30px;"
                      type="success" @click="followUser">关注Ta
              </Button>


              <!--<Button style="position: absolute;right:10px;margin-top:3px;margin-left: 30px;" @click="handleRender">-->
                <!--给ta留言-->
              <!--</Button>-->

              <Poptip
                confirm
                title="确定取消关注?"
                @on-ok="ok"
                @on-cancel="cancel">
                <Button v-if="followStatus == '1' " style="margin-left: 30px;" type="success">
                  <Icon type="md-checkmark"/>
                  已关注
                </Button>
              </Poptip>

            </p>
            <p>
              <Icon type="ios-pin"/>
              {{userDetail.userCity}}
              |
              <!--<Icon type="md-male"/>-->
              <Icon type="ios-man" />
              <span v-if="userDetail.userSex === 1">男　</span>
              <span v-if="userDetail.userSex === 2">女　</span>
              <span v-if="userDetail.userSex === 0">保密　</span>
            </p>
            <p v-if="userDetail.userIntroduce !== null">{{userDetail.userIntroduce}}</p>
            <p v-else style="margin-bottom: 10px;">
              暂时没有任何简介。
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

    <FormItem>

      <Modal v-model="leaveMessage" title="留言" @on-cancel="cancel">
        <Form>
          <FormItem style="width: 100%;" prop="commentContent">
            <Input style="width: 100%;margin-bottom: 20px;"  type="textarea"
                   :autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入留言内容..."/>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="confirm('softCommentMsg')" type="primary">保存</Button>
        </div>
      </Modal>

    </FormItem>
    <FormItem>


      <Modal v-model.trim="globalNoticeModal" title="发送系统通知" @on-cancel="cancel" >
        <Form>
          <FormItem>
            <Input v-model.trim="globalNotice" placeholder="请输入通知内容..."></Input>
          </FormItem>

          <Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>
        </Form>
        <div slot="footer">
          <Button @click="cancelNotice">取消</Button>
          <Button @click="sendGlobalNotice" :loading="sendNoticeLoading" type="primary">
            <span v-if="!sendNoticeLoading">发送</span>
            <span v-else>正在发送...</span>
          </Button>
        </div>
      </Modal>

    </FormItem>


    <FormItem style="width:72%;margin-top: -10px;">

      <Card :bordered="true" dis-hover="false">
        <Tabs :animated="false">
          <TabPane :label=articleNum>
            <Card v-if="articles.length == 0" style="text-align: center" dis-hover="false">
              <img style="height:100px;" src="../../assets/article/no_user.png">
              <p>暂无文章</p>
            </Card>
            <div v-for="article in articles">
              <p style="font-size: 20px;">
                <Tag color="green">文</Tag>
                <span style="line-height: 40px; cursor: pointer" @click="articleDetails(article)">{{article.articleTitleName}}</span>
              </p>
              <div style="width: 100%;">
                <p style="width: 76%;float: left;margin-right: 30px;" @click="articleDetails(article)">
                  {{article.articleSummary}}
                </p>
                <div>
                  <img @click="articleDetails(article)"
                       style="position:relative;right: -10px;top:-40px; width:120px;height: 80px;"
                       :src=article.articleTitleIcon>
                </div>
                <Divider/>
              </div>
            </div>
            <Page v-if="articles.length != 0" style="text-align: center" :total=articles.length show-total
                  show-elevator/>


          </TabPane>
          <TabPane :label=softNum>
            <Card v-if="softs.length == 0" style="text-align: center" dis-hover="false">
              <img style="height:100px;" src="../../assets/article/no_user.png">
              <p>暂无软件</p>
            </Card>
            <div v-for="soft in softs">
              <p style="font-size: 20px;">
                <Tag color="green">软</Tag>
                <span @click="softDetails(soft)"
                      style="line-height: 40px; cursor: pointer">{{soft.softTitleName}}</span>
              </p>
              <Divider/>
            </div>

            <Page v-if="softs.length != 0" style="text-align: center" :total=softs.length show-total show-elevator/>

          </TabPane>
          <TabPane :label=needNum>
            <Card v-if="softs.length == 0" style="text-align: center" dis-hover="false">
              <img style="height:100px;" src="../../assets/article/no_user.png">
              <p>暂无提问</p>
            </Card>
            <div v-for="need in needs">
              <p style="font-size: 20px;">
                <Tag color="green">问</Tag>
                <span @click="needdetails(need)"
                      style="line-height: 40px; cursor: pointer">{{need.needTitleName}}</span>
              </p>
              <Divider/>
            </div>

            <Page v-if="softs.length != 0" style="text-align: center" :total=needs.length show-total show-elevator/>

          </TabPane>


          <TabPane :label=followToNum>
            <Card v-if="followToUsers.length == 0" style="text-align: center" dis-hover="false">
              <img style="height:100px;" src="../../assets/article/no_user.png">
              <p>暂无关注</p>
            </Card>

            <div v-for="followToUser in followToUsers">
              <img style="width:40px;height:40px;margin-right: 10px;" :src=followToUser.userHeadIcon>
              <span style="font-size: 16px;"><strong>{{followToUser.userName}}</strong></span>
              <Divider/>
            </div>

            <Page v-if="followToUsers.length != 0" style="text-align: center" :total=followToUsers.length show-total
                  show-elevator/>

          </TabPane>
          <TabPane :label=followNum>

            <Card v-if="followers.length == 0" style="text-align: center" dis-hover="false">
              <img style="height:100px;" src="../../assets/article/no_user.png">
              <p>暂无关注者</p>
            </Card>
            <div v-for="follower in followers">
              <img style="width:40px;height:40px;margin-right: 10px;" :src=follower.userHeadIcon>
              <span style="font-size: 16px;"><strong>{{follower.userName}}</strong></span>
              <Divider/>
            </div>
            <Page v-if="followers.length != 0" style="text-align: center" :total=followers.length show-total
                  show-elevator/>


          </TabPane>
        </Tabs>
      </Card>
    </FormItem>


    <FormItem style="width:23%;margin-top: -10px;">

      <!--<Card :bordered="true" style="text-align: left;margin-bottom: 10px;">-->
      <!--<p slot="title">分类标签</p>-->
      <!--<a slot="extra">编辑</a>-->
      <!--<Tag color="cyan">java</Tag>-->
      <!--<Tag color="cyan">c语言</Tag>-->
      <!--<Tag color="cyan">python</Tag>-->
      <!--<Tag color="cyan">spring</Tag>-->
      <!--<Tag color="cyan">编程</Tag>-->
      <!--</Card>-->
      <Card :bordered="true" style="text-align: center;margin-bottom: 10px;" dis-hover="false">
        <Icon type="md-paw"/>
        <p>{{userDetail.createDateTime}}加入appogg</p>
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

        globalNotice:"",
        globalNoticeModal:false,
        sendNoticeLoading:false,
        noticeContent:"",

        sendNotice: {
          noticeContent:"",
        },

        leaveMessage:false,

        followStatus: '0',

        articles: [],
        articleNum: '',
        softs: [],
        softNum: '',
        needs: [],
        needNum: '',

        followers: [],
        followNum: '',
        followToUsers: [],
        followToNum: '',

        userId: '',
        userDetail: '',
        articleUser: '',

        loginUserName: '',

        articleUserName: '',

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
    methods: {
      sendGlobalNotice(){
        this.globalNoticeModal = false;


        // this.noticeContent = this.globalNotice
        // alert(this.noticeContent)
        if(this.globalNotice == '' || this.globalNotice == null){
          alert("通知内容不能为空")
          return false
        }
        this.sendNotice.noticeContent = this.globalNotice
        this.$http.post('/api/notice/sendGlobal', this.sendNotice)
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.success("发送系统通知成功!")
              this.globalNotice = "";
            }
          })


      },
      cancelNotice(){
        this.globalNoticeModal = false;

      },




      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      getData(userId) {
        console.log("开始")

        this.$http.get('/api/user/detail', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.userDetail = response.data.data
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.userDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getFollowStatus(userId) {
        console.log("开始")

        this.$http.get('/api/follow/status', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followStatus = '0'
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },


      handleRender() {

        this.leaveMessage = true;

        // this.$Modal.confirm({
        //   render: (h) => {
        //     return h('Input', {
        //       props: {
        //         value: this.value,
        //         autofocus: true,
        //         placeholder: '请留言...'
        //       },
        //       on: {
        //         input: (val) => {
        //           this.value = val;
        //         }
        //       }
        //     })
        //   }
        // })
      },


      getFollowers(userId) {
        console.log("开始")

        this.$http.get('/api/follow/listFollow', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followers = response.data.data.rows
              this.followNum = "关注者 " + response.data.data.rows.length
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followers = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getFollowToUsers(userId) {
        console.log("开始")

        this.$http.get('/api/follow/listFollowTo', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followToUsers = response.data.data.rows
              this.followToNum = "关注的人 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followToUsers = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getArticles(userId) {
        console.log("开始")

        this.$http.get('/api/user/listArticle', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articles = response.data.data.rows
              this.articleNum = "文章 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.articles = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getSofts(userId) {
        console.log("开始")

        this.$http.get('/api/user/listSoft', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.softs = response.data.data.rows
              this.softNum = "软件 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.softs = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getNeeds(userId) {
        console.log("开始")

        this.$http.get('/api/user/listNeed', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.needs = response.data.data.rows
              this.needNum = "需求 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.needs = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getArticleUser(userId) {
        console.log("开始")

        this.$http.get('/api/user/detail', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articleUser = response.data.data
              // console.log("111*******////***11111",this.userDetail,)
            } else {
              // console.log("no")

              // this.userDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
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

      articleDetails(article) {
        // 页面带参跳转
        this.$router.push({name: 'ArticleDetails', query: {articleId: article.id, articleUserId: article.createUserId}})
      },
      softDetails(soft) {
        this.$router.push({name: 'softDetails', query: {softId: soft.id, softUserId: soft.createUserId}})

      },
      needdetails(need) {
        this.$router.push({name: 'needDetails', query: {needId: need.id, needUserId: need.createUserId}})

      },

      followUser() {
        this.$http.get('/api/follow/followUser', {
          params: {
            'userId': this.userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              this.$Message.success('关注成功');
            }
            console.log("user.....login:", response)
          })
      },
      ok() {
        this.$http.get('/api/follow/unfollowUser', {
          params: {
            'userId': this.userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              this.$Message.success('取消关注成功');
            }
            console.log("user.....login:", response)
          })
      },
      cancel() {
        this.globalNoticeModal = false
      },

      editUserMsg(){
        var loginUserId = window.localStorage.getItem("userId");
        this.$router.push({name: 'UserPageEdit', query: {userId: loginUserId}})
      },


      editMsg(){
        this.globalNoticeModal = true;

        // this.$Modal.confirm({
        //   render: (h) => {
        //     return h('Input', {
        //       props: {
        //         value: this.value,
        //         autofocus: true,
        //         placeholder: '输入通知内容...'
        //       },
        //       on: {
        //         input: (val) => {
        //           this.globalNotice = val;
        //         }
        //       },
        //       onOk: () => {
        //         alert(this.globalNotice)
        //       }
        //     })
        //   }
        // })
      },


      go() {
        this.$router.push('/test')
      }
    },
    created() {
      this.userId = this.$route.query.userId
      this.getArticleUser(this.userId);

      this.articleUserName = this.$route.query.articleUserName
      this.loginUserName = window.localStorage.getItem("userName");


      this.getData(this.userId);
      this.getFollowStatus(this.userId);

      this.getFollowers(this.userId);
      this.getFollowToUsers(this.userId);
      this.getArticles(this.userId);
      this.getSofts(this.userId);
      this.getNeeds(this.userId);


      this.changeLimit();
    }
  }
</script>

