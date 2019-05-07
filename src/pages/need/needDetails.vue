<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;margin-right: 20px;background-color: ">
      <Card v-model="needDetail" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">

        <p style="font-size: 20px;">
          <span style="line-height: 40px;"><Tag color="green">问</Tag>{{needDetail.needTitleName}}
          </span>


        </p>
        <div style="position:absolute;width:50px;right: 15px;top:25px;">
          <Tag v-if="needDetail.isSticky === 1" style="float: left;" color="green">置顶</Tag>
          <Tag v-if="needDetail.isFine === 1" style="float: left;" color="gold">精选</Tag>
        </div>
        <!--<div style="line-height: 20px;">-->
        <!--<Tag v-if="needDetail.isFine === 1" style="float: left;" color="gold">精选文章</Tag>-->
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

          <!--<img style="width:100%;height:200px;" :src="needDetail.needTitleIcon">-->

          <p style="width: 100%;float: left;margin-right: 30px;" v-html="needDetail.needContent">
            {{needDetail.needContent}}
          </p>

        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag v-for="needTag in needDetail.needClassifyGroup" color="cyan">{{needTag}}</Tag>
        </div>

      </Card>





      <div v-if="isLogin" style="width:100%;float: left;margin-bottom: 20px;margin-top: 20px;" :dis-hover="true">
        <p style="font-size: 18px;">
          <span style="line-height: 40px;color: darkgray">我也要回答</span>
        </p>
        <!--<Divider/>-->
        <div style="width: 100%;margin-top: 10px;">

          <div ref="editor" style="text-align:left;background-color: white"></div>

          <Button style="width: 100%;margin-top: 20px;" type="primary" @click="answerPush">提交</Button>
        </div>


      </div>



      <Card v-else style="text-align:center;width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <img style="width:180px;height:120px;" src="../../assets/article/not_login.jpg">
        <p style="font-size: 22px;">尚未登录</p>
        <p>您当前尚未登录，无法使用<strong>回答</strong>功能，请先前往登录。</p>
        <div style="width: 100%;">
          <Button style="width: 20%;margin:10px;" type="primary" @click="toLoginPage">登录</Button>
        </div>
      </Card>

      <div v-if="needDetail.answerNum === 0" style="font-size: 14px;text-align: left">
        <span>暂无回答</span>
      </div>
      <div v-else style="font-size: 12px;text-align: left">
        <span>共计 {{needAnswerTotal}} 条回答</span>
      </div>


      <!--<Divider type="vertical" style="margin-top: -45px;font-size: 30px"/>-->
      <Card v-for="answer in needAnswerList" style="background-color:#EAEAEA;text-align:left;width:100%;float: left;margin-bottom: 5px;"
            :bordered="false" :dis-hover="true">
        <Row>
          <Col span="1">
            <img style="float: left;width:40px;height:40px;" :src=answer.commentUserIcon>

          </Col>
          <Col span="23">
            <Card style="text-align:left;width:98%;float: left;margin-left: 20px;" :dis-hover="true">
              <div v-if="answer.isAdopt === 1 && loginUserId == needUserId">

                <Poptip
                  confirm
                  title="确定取消推荐?"
                  @on-ok="unAdoptAnswer"
                  @on-cancel="cancel">
                  <Button type="success" style="height:30px;" @click="putAnswerId(answer.id)"><Icon type="md-checkmark" />推荐答案</Button>
                </Poptip>
                <!--<Tag checkable color="primary"></Tag>-->
              </div>
              <div v-if="answer.isAdopt === 1 && loginUserId != needUserId">
                <Button type="success" style="height:30px;"><Icon type="md-checkmark" />推荐答案</Button>

              </div>

              <p style="color: darkgray">
                {{answer.commentUserName}}　
                <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
                　{{answer.createDateTime}}　
              </p>
              <div v-if="needDetail.isSolved === 0 && loginUserId == needUserId " style="position:absolute;right: 20px;top:15px; width:120px;height: 80px;">
                <Button type="dashed" @click="adoptAnswer(answer.id)">采用</Button>
              </div>


              <div v-if="answer.backToUserId === 0"><p v-html="answer.commentContent">{{answer.commentContent}}</p></div>

              <div v-else>{{answer.createUserName}} @ {{answer.backToUserName}} : <p v-html="answer.commentContent">{{answer.commentContent}}</p></div>

              <div v-if="answer.children" class="children-item">
                <needAnswerList :list="answer.children"></needAnswerList>
              </div>


            </Card>
          </Col>
        </Row>
      </Card>


      <div style="text-align: center;">
        <Button style="text-align: center;margin:0 auto;" @click="getMoreAnswer">查看更多</Button>

      </div>

    </FormItem>

    <Modal
      v-model="modal1"
      @on-ok="ok"
      @on-cancel="cancel">
      <p style="text-align: center;font-size: 16px;">确定推荐这条回答?</p>
    </Modal>


    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">关于提问者</p>
          <div>
            <img style="width:40px;height:40px;margin-right: 10px;" :src=needUserDetail.userHeadIcon>
            <span style="">{{needUserDetail.userName}}</span>
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
            <Divider/>
            <div>
              <Row style="text-align: center">
                <Col span="11">
                  <Card dis-hover :bordered="false">
                    <p>总发布量</p>
                    <p><Strong>{{needUserDetail.articleNum}}</Strong></p>
                  </Card>
                </Col>
                <Col span="11" offset="2">
                  <Card dis-hover :bordered="false">
                    <p>总阅读量</p>
                    <p><Strong>{{needUserDetail.articleReadNum}}</Strong></p>
                  </Card>
                </Col>
              </Row>
            </div>
            <Button style="width:100%;" @click="userPage">了解作者</Button>
          </div>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">需求信息</p>


          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;">
              <Icon type="ios-time"/>
              发布时间: {{needDetail.createDateTime}}
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book"/>
              阅读量: {{needDetail.readNum}}
            </li>

          </ul>

          <Tag v-for="needTag in needDetail.needClassifyGroup" color="cyan">{{needTag}}</Tag>


        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">Ta的其他问题</p>
          <ul style="list-style:none;">
            <li v-for="trendingNeed in needTrendingList" style="margin-bottom: 4px;">
              <!--<Icon type="ios-book-outline" />-->
              <p style="float: left;width:auto;max-width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">

              <a>{{trendingNeed.needTitleName}}</a>
              </p>
              <Tag color="volcano" style="margin-left: 10px;">
                <Icon type="ios-chatbubbles"/>{{trendingNeed.answerNum}}
              </Tag>
            </li>
          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="needPush">
          <Icon type="ios-create-outline"/>
          我也要发布软件
        </Button>
      </div>

    </FormItem>


  </Form>


</template>
<script>


  import axios from 'axios'
  import Httpservice from '@/router/service'
  import E from 'wangeditor'

  export default {
    name: 'editor',

    data() {

      props: {
        list: Array
      }
      return {

        answerContentMsg: '',
        editor: {},

        needAnswerMsg: {
          answerContent: '',
          answerNeedId: '',

          answerUserId:''

        },

        modal1:false,

        answerId:'',
        unAdoptAnswerId:'',

        needTrendingList:[],
        trendingSort: {
          needUserId:'',
          limit: 10,
          page: 1
        },

        needAnswerList: [],
        needAnswerTotal: '',

        filter: {
          // 是否精选文章：0全部，1精选
          answerNeedId: '',
          limit: 10,
          page: 1
        },
        loginUserId:'',

        needId: {},
        needUserId: '',
        needDetail: '',
        needUserDetail: '',

        needListType: "all",
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
      getData(needId) {
        console.log("开始")


        this.$http.get('/api/need/detail', {
          params: {
            'id': needId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.needDetail = response.data.data
              console.log(this.needDetail, "11111333333333333311111111")
            } else {
              console.log("no")

              this.needDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },
      getUserData(needUserId) {
        console.log("开始")


        this.$http.get('/api/user/detail', {
          params: {
            'userId': needUserId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.needUserDetail = response.data.data
              console.log("111**********11111", this.needUserDetail,)
            } else {
              console.log("no")

              this.needUserDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },

      needPush(){
        this.$Loading.start()
        this.$router.push('/needPush')
        this.$Loading.finish()
      },

      getAnswerData(params) {
        this.$http.get('/api/need/answer/detail', {params})
          .then((response) => {
            if (response.data.status === 200) {


              console.log("yes", response.data.data.rows)
              this.needAnswerList = response.data.data.rows
              this.needAnswerTotal = response.data.data.total

              console.log("yes......", response.data.data.rows)


            } else {
              console.log("no")

              this.needUserDetail = ''
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
        this.$router.push({name: 'UserPage', query: {userId: this.needUserId}})
      },
      go() {
        this.$router.push('/test')
      },
      toLoginPage() {
        this.$router.push('/login')
      },

      updateReadNum(needId) {

        this.$http.get('/api/need/updateReadNum', {
          params: {
            'id': needId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.getData(this.needId);
              // this.needDetail = response.data.data
              // console.log(this.needDetail,"11111333333333333311111111")
            } else {
              console.log("no")

              // this.needDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      adoptAnswer(answerId) {
        alert(this.loginUserId)
        this.modal1 = true
        this.answerId = answerId

      },

      ok(){

        this.$http.get('/api/need/answer/adoptAnswer',{
          params: {
            'id':this.answerId,
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info('推荐答案成功');
              this.getData(this.needId);
              this.getAnswerData(this.filter);

            }
          })
          .catch(function (error) {
            this.$Message.info('推荐答案失败');

            console.log(error);
          })
      },

      putAnswerId(answerId){
        if( this.loginUserId == this.needUserId ){
          this.unAdoptAnswerId = answerId;
        } else {
          alert("无法取消")
        }
      },

      unAdoptAnswer(){

        this.$http.get('/api/need/answer/unAdoptAnswer',{
          params: {
            'id':this.unAdoptAnswerId,
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info('取消推荐成功');
              this.getData(this.needId);
              this.getAnswerData(this.filter);

            }
          })
          .catch(function (error) {
            this.$Message.info('推荐答案失败');

            console.log(error);
          })
      },
      cancel() {
        // this.$Message.info('Clicked cancel');
      },


      answerPush() {
        // alert("an:" + this.answerContentMsg);
        this.needAnswerMsg.answerNeedId = this.needId
        this.needAnswerMsg.answerContent = this.answerContentMsg

        this.needAnswerMsg.answerUserId = window.localStorage.getItem("userId")

        if(this.needAnswerMsg.answerContent === ''){
          alert("回答内容不能为空")
          return false

        }

        this.$http.post('/api/need/answer/add', this.needAnswerMsg)
          .then((response) => {
            if (response.data.status === 200) {
              // this.spinShow = false
              this.$Spin.hide();

              this.$Message.info("评论成功")

              this.needAnswerMsg.answerContent = ''
              this.getAnswerData(this.filter);

              // this.$router.push('/need')
              // this.getData(this.needId);
            }

            console.log("add...need...answer:", response)
          })
      },

      getTrendingData(params) {
        console.log("开始")


        this.$http.get('/api/need/trendingList', {params})
          .then((response) => {
            if (response.data.status === 200) {
              console.log("yes")
              this.needTrendingList = response.data.data.rows
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

      getEditorContent() {
        this.editor.customConfig.onchange = html => {
          this.answerContentMsg = html;
        };
      },




      getMoreAnswer() {
        this.filter.limit = this.filter.limit + 10;
        this.getAnswerData(this.filter);
      }
    },

    mounted() {
      this.editor = new E(this.$refs.editor)
      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.answerContentMsg = html
      }



      this.editor.customConfig.uploadImgMaxSize = 0.5 * 1024 * 1024; // 一张图片最大0.5MB
      this.editor.customConfig.uploadImgMaxLength = 1; // 限一次只能上传1张
      this.editor.customConfig.uploadImgServer = '/api/image/upload'
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // console.log(result);
          // editor.insert(result)
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          insertImg(result.data)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      // this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      // 普通的自定义菜单
      this.editor.customConfig.menus = [
        // "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        // "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        // "list", // 列表
        // "justify", // 对齐方式
        // "quote", // 引用
        // 'emoticon',  // 表情
        "image", // 插入图片
        // "table", // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        "undo", // 撤销
        "redo" // 重复


      ];
      this.editor.create()
      this.getEditorContent();
    },



    created() {


      this.loginUserId = window.localStorage.getItem('userId')

      this.needId = this.$route.query.needId
      this.filter.answerNeedId = this.$route.query.needId
      this.needUserId = this.$route.query.needUserId

      this.getTrendingData(this.trendingSort);


      this.updateReadNum(this.needId);

      this.getData(this.needId);
      this.getUserData(this.needUserId);
      this.getAnswerData(this.filter);


      this.changeLimit();

    }
  }
</script>

