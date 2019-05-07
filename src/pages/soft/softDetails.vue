<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;margin-right: 20px;">
      <Card v-model="softDetail" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <p style="font-size: 20px;">
          <span style="line-height: 40px;"><Tag color="green">软</Tag>{{softDetail.softTitleName}}
          </span>


        </p>
        <div style="position:absolute;width:50px;right: 15px;top:25px;">
          <Tag v-if="softDetail.isSticky === 1" style="float: left;" color="green">置顶</Tag>
          <Tag v-if="softDetail.isFine === 1" style="float: left;" color="gold">精选</Tag>
        </div>
        <Tabs :animated="false">
          <TabPane label="详情">
            <div style="width: 100%;">
              <p style="width: 100%;float: left;margin-right: 30px;" v-html="softDetail.softContent">
                {{softDetail.softContent}}
              </p>

            </div>
            <div style="width: 100%;float: left;margin:10px;">
              <Tag v-for="softTag in softDetail.softClassifyGroup" color="cyan">{{softTag}}</Tag>
            </div>

            <div v-if="softDetail.createUserName === 'appogg' || softDetail.createUserName === 'zhangyj' " style="text-align: center;margin:10px;">

              <Button type="primary" @click="modal3 = true">打赏</Button>

            </div>
          </TabPane>

          <TabPane label="下载地址">
            <div v-for="(addr,index) in softDetail.softDownloadAddr">
              <span>下载地址{{index+1}}:</span>
              <a :href="addr">{{addr}}</a>
              <br/>
            </div>
          </TabPane>
        </Tabs>


      </Card>

      <Modal v-model="modal3" footer-hide="true">

        <br/>
        <br/>
        <Alert style="font-size: 16px;text-align: center">

          您的支持就是我前进的动力
        </Alert>
        <div>
          <div style="float: left;left:20px;margin-right: 50px;text-align: center">
            <img style="width:200px;height:auto" src="../../assets/pay/wechatmoney.png">
            <p style="font-size: 20px;color: green"><strong>微信</strong></p>
          </div>
          <div style="text-align: center">
            <img style="width:200px;height:auto" src="../../assets/pay/alipaymoney.jpg">
            <p style="font-size: 20px;color: deepskyblue;"><strong>支付宝</strong></p>

          </div>
        </div>
      </Modal>


      <!--<Button v-if="isLogin" style="width: 100%;" type="info" @click="addData">写评论</Button>-->

      <Card v-if="isLogin" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <p style="font-size: 20px;">
          <span style="line-height: 40px;">评论</span>
        </p>
        <Divider/>

        <Form ref="softCommentMsg" :model="softCommentMsg" :rules="ruleValidate">

          <FormItem style="width: 100%;"  prop="commentContent">
            <Input style="width: 100%;margin-bottom: 20px;" v-model="softCommentMsg.commentContent" type="textarea"
                   :autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入评论内容..."/>
          </FormItem>
          <Button style="width: 90%;margin:25px;" type="primary" @click="confirm('softCommentMsg')">提交</Button>

        </Form>
        <!--<div style="width: 100%;">-->
          <!--<Input style="width: 90%;margin:10px;" v-model="commentContentMsg" type="textarea"-->
                 <!--:autosize="{minRows: 3,maxRows: 5}" :rows="4" placeholder="输入评论内容..."/>-->
        <!--</div>-->
      </Card>

      <Card v-else style="text-align:center;width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <img style="width:180px;height:120px;" src="../../assets/article/not_login.jpg">
        <p style="font-size: 22px;">尚未登录</p>
        <p>您当前尚未登录，无法使用<strong>评论</strong>功能，请先前往登录。</p>
        <div style="width: 100%;">
          <Button style="width: 20%;margin:10px;" type="primary" @click="toLoginPage">登录</Button>
        </div>
      </Card>

      <div v-if="softDetail.commentNum === 0" style="font-size: 14px;text-align: left">
        <span>暂无评论</span>
      </div>
      <div v-else style="font-size: 12px;text-align: left">
        <span>共计 {{softDetail.commentNum}} 条评论</span>


      </div>

      <!--<Divider type="vertical" style="margin-top: -45px;font-size: 30px"/>-->
      <Card v-for="comment in softCommentList" style="background-color:#EAEAEA;text-align:left;width:100%;float: left;margin-bottom: 0;"
            :bordered="false" :dis-hover="true">
        <Row>
          <Col span="1">
            <img style="float: left;width:40px;height:40px;" :src=comment.commentUserIcon>

          </Col>
          <Col span="23">
            <Card style="text-align:left;width:98%;float: left;margin-left: 20px;" :dis-hover="true">
              <p style="color: darkgray">
                {{comment.commentUserName}}　
                <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
                　{{comment.createDateTime}}　
              </p>
              <div style="position: absolute;right: 20px;top:10px;">
                <Tooltip content="回复">
                  <Icon type="md-chatboxes" style="cursor: pointer;" @click="backCommentModal(comment)"/>
                </Tooltip>
              </div>


              <p v-if="comment.backToUserId === 0">{{comment.commentContent}}</p>

              <p v-else><strong>@ {{comment.backToUserName}} : </strong>{{comment.commentContent}}</p>

              <div v-if="comment.children" class="children-item">
                <softCommentList :list="comment.children"></softCommentList>
              </div>

            </Card>
          </Col>
        </Row>
      </Card>
      <div style="text-align: center;">
        <!--<Button style="text-align: center;margin:0 auto;" @click="getMoreComment">查看更多</Button>-->

      </div>



      <Modal v-model="backComment" :title="backCommentModalTitle" @on-cancel="cancelBackComment">
        <Form ref="softCommentMsg" :model="softCommentMsg" :rules="ruleValidate">
          <strong style="margin-bottom: 10px;">Ta说：{{backCommentContent}}</strong>

          <FormItem style="width: 100%;margin-top: 20px;"  prop="commentContent">

            <Input style="width: 100%;margin-bottom: 20px;" v-model="softCommentMsg.commentContent" type="textarea"
                   :autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入回复内容..."/>
          </FormItem>

        </Form>
        <div slot="footer">
          <Button @click="cancelBackComment">取消</Button>
          <Button @click="confirm('softCommentMsg')" type="primary">保存</Button>
        </div>
      </Modal>

    </FormItem>


    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <!--<Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">-->
        <!--<p slot="title">关于作者</p>-->
        <!--<div>-->
        <!--<img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">-->
        <!--<span style="">{{softUserDetail.userName}}</span>-->
        <!--<img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">-->
        <!--<Divider/>-->
        <!--<div>-->
        <!--<Row style="text-align: center">-->
        <!--<Col span="11">-->
        <!--<Card dis-hover :bordered="false">-->
        <!--<p>软件</p>-->
        <!--<p><Strong>{{softUserDetail.softNum}}</Strong></p>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--<Col span="11" offset="2">-->
        <!--<Card dis-hover :bordered="false">-->
        <!--<p>总阅读量</p>-->
        <!--<p><Strong>{{softUserDetail.softReadNum}}</Strong></p>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--</div>-->
        <!--<Button style="width:100%;" @click="userPage">了解作者</Button>-->
        <!--</div>-->
        <!--</Card>-->
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">软件信息</p>


          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;">
              <Icon type="ios-time"/>
              发布时间: {{softDetail.createDateTime}}
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="md-settings"/>
              适用系统: {{softDetail.softSystemPlatform}}
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book"/>
              阅读量: {{softDetail.readNum}}
            </li>

          </ul>
          <Tag v-for="softTag in softDetail.softClassifyGroup" color="cyan">{{softTag}}</Tag>


        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">

          <p slot="title">其他相关软件</p>
          <ul style="list-style:none;">
            <li v-for="soft in softRecommendList" style="margin-bottom: 4px;">
              <!--<Icon type="ios-book-outline"/>-->
              <p style="float: left;width:auto;max-width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">

              <!--<a :href="'/softDetails?id='+soft.id">链接</a>-->
              <a @click="getOtherSoftDetails(soft)">{{soft.softTitleName}}</a>
              </p>
              <Tag color="volcano" style="margin-left: 10px;"><Icon type="ios-chatbubbles"/>{{soft.commentNum}}</Tag>
            </li>

          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush">
          <Icon type="ios-create-outline"/>
          我也要发布软件
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

        modal3: false,


        backComment:false,


        ruleValidate: {
          commentContent: [
            { required: true, message: '评论内容不能为空', trigger: 'blur' }
          ],

        },

        softRecommendList:[],


        removeModal: false,
        addModal: false,

        commentContentMsg: '',

        softCommentMsg: {
          commentContent: '',
          commentSoftId: '',
          commentUserId:'',
          commentParentId:'',
          backToUserId:0,
          backToUserName:null,

        },
        backCommentModalTitle:'',
        backCommentUserName:'',
        backCommentUserId:'',
        backCommentContent:'',

        softCommentList: [],
        softCommentTotal: '',

        systemPlatform:{
          // 是否精选文章：0全部，1精选
          commentSoftId: '',
          limit: 10,
          page: 1
        },

        filter: {
          // 是否精选文章：0全部，1精选
          commentSoftId: '',
          softSystemPlatform:'',
          limit: 10,
          page: 1
        },


        softId: {},
        softUserId: '',
        softDetail: '',
        softUserDetail: '',

        softListType: "all",
        formInline: {
          user: '',
          password: ''
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

      addData() {
        this.addModal = true;
      },
      cancel() {
        this.addModal = false;
      },
      cancelBackComment() {
        this.backComment = false;
      },

      backCommentModal(comment){

        let loginUserId = window.localStorage.getItem("userId")
        if(loginUserId !== null){
          this.backComment = true;
          this.backCommentUserName = comment.commentUserName
          this.backCommentUserId = comment.commentUserId
          this.softCommentMsg.commentParentId = comment.id
          this.backCommentModalTitle = "回复" + comment.commentUserName + "的评论"
          this.backCommentContent = comment.commentContent
        } else {
          this.$Message.warning('登录后才能回复');
        }
      },

      confirm(softCommentMsg) {
        // this.updatetDictType();

        this.softCommentMsg.commentSoftId = this.softId
        this.softCommentMsg.commentUserId = window.localStorage.getItem("userId")
        this.softCommentMsg.backToUserId = this.backCommentUserId
        this.softCommentMsg.backToUserName = this.backCommentUserName
        // this.softCommentMsg.commentContent = this.commentContentMsg

        this.$refs[softCommentMsg].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');

            this.$http.post('/api/soft/comment/add', this.softCommentMsg)
              .then((response) => {
                if (response.data.status === 200) {
                  this.$Message.info("评论成功")
                  this.softCommentMsg.commentContent = ''
                  this.getCommentData(this.systemPlatform);
                  this.addModal = false;
                  this.backComment = false;

                }

                console.log("add...soft...comment:", response)
              }).catch(function (error) {
              this.$Message.info('评论失败，请稍后再试');
              this.addModal = false;

              console.log(error);
            })
          } else {
            this.$Message.error('Fail!');
          }
        })





        // this.addDictType();
      },

      articlePush() {
        this.$router.push('/softPush')
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
      getData(softId) {
        console.log("开始")


        this.$http.get('/api/soft/detail', {
          params: {
            'id': softId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.softDetail = response.data.data
              console.log(this.softDetail, "11111333333333333311111111")
            } else {
              console.log("no")

              this.softDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },

      getRecommend(params){

        this.$http.get('/api/soft/list', {params})
          .then((response) => {
            if (response.data.status === 200) {

              this.softRecommendList = response.data.data.rows
            } else {
              console.log("no")

              this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getUserData(softUserId) {
        console.log("开始")


        this.$http.get('/api/user/detail', {
          params: {
            'userId': softUserId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.softUserDetail = response.data.data
              console.log("111**********11111", this.softUserDetail,)
            } else {
              console.log("no")

              this.softUserDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },
      getCommentData(params) {
        this.$http.get('/api/soft/comment/detail', {params})
          .then((response) => {
            if (response.data.status === 200) {


              console.log("yes", response.data.data.rows)
              this.softCommentList = response.data.data
              this.softCommentTotal = response.data.total

              console.log("yes......", response.data.data.rows)


            } else {
              console.log("no")

              this.softUserDetail = ''
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
        this.$router.push({name: 'UserPage', query: {softUserId: this.softUserId}})
      },
      go() {
        this.$router.push('/test')
      },
      toLoginPage() {
        this.$router.push('/login')
      },

      updateReadNum(softId) {

        this.$http.get('/api/soft/updateReadNum', {
          params: {
            'id': softId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.getData(this.softId);
              // this.softDetail = response.data.data
              // console.log(this.softDetail,"11111333333333333311111111")
            } else {
              console.log("no")

              // this.softDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      commentPush() {
        this.softCommentMsg.commentSoftId = this.softId
        this.softCommentMsg.commentContent = this.commentContentMsg

        this.$http.post('/api/soft/comment/add', this.softCommentMsg)
          .then((response) => {
            if (response.data.status === 200) {
              // this.spinShow = false
              this.$Spin.hide();
              this.$router.push('/soft')
              // this.getData(this.softId);
            }

            console.log("add...soft...comment:", response)
          })
      },
      softDetails(soft){
        this.$router.push({name: 'softDetails',query: {softId:soft.id,softUserId:soft.createUserId}})

      },




      getMoreComment() {
        this.systemPlatform.limit = this.systemPlatform.limit + 10;
        this.getCommentData(this.systemPlatform);
      },

      getOtherSoftDetails(soft){
        let routeData = this.$router.push({name: 'softDetails',query: {softId:soft.id,softUserId:soft.createUserId}})
        // window.open(routeData.href, '_blank');
        this.softId = soft.id;
        this.softUserId = soft.createUserId;
        this.systemPlatform.commentSoftId = soft.id;
        this.updateReadNum(this.softId);
        this.getData(this.softId);
        this.getUserData(this.softUserId);
        this.getCommentData(this.systemPlatform);


      }
    },
    created() {


      this.softId = this.$route.query.softId
      this.systemPlatform.commentSoftId = this.$route.query.softId
      this.softUserId = this.$route.query.softUserId
      this.updateReadNum(this.softId);
      this.getData(this.softId);
      this.getUserData(this.softUserId);
      this.getCommentData(this.systemPlatform);



      this.getRecommend(this.filter);
      this.changeLimit();

    }
  }
</script>

<style>
  .ivu-card-body {
    padding: 6px;
  }
</style>
