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
        <!--<div style="line-height: 20px;">-->
        <!--<Tag v-if="softDetail.isFine === 1" style="float: left;" color="gold">精选文章</Tag>-->
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

          <!--<img style="width:100%;height:200px;" :src="softDetail.softTitleIcon">-->

          <p style="width: 100%;float: left;margin-right: 30px;" v-html="softDetail.softContent">
            {{softDetail.softContent}}
          </p>

        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag v-for="softTag in softDetail.softClassifyGroup" color="cyan">{{softTag}}</Tag>
        </div>

      </Card>


      <Button v-if="$store.state.userName !== null" style="width: 100%;" type="info" @click="addData">写评论</Button>

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
        <span>共计 {{softCommentTotal}} 条评论</span>
      </div>


      <!--<Divider type="vertical" style="margin-top: -45px;font-size: 30px"/>-->
      <Card v-for="comment in softCommentList" style="text-align:left;width:100%;float: left;margin-bottom: 5px;"
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
                <softCommentList :list="comment.children"></softCommentList>
              </div>


            </Card>
          </Col>
        </Row>
      </Card>
      <div style="text-align: center;">
        <Button style="text-align: center;margin:0 auto;" @click="getMoreComment">查看更多</Button>

      </div>


      <Modal v-model="addModal" title="评论" @on-cancel="cancel">
        <Form>

          <div style="width: 100%;">
            <Input style="width: 100%;margin-bottom: 20px;" v-model="commentContentMsg" type="textarea"
                   :autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入评论内容..."/>
          </div>
          <!--<FormItem :label-width="80" label="参数名称" prop="guidName" :rules="{ required: true, type: 'string', trigger: 'change', message: '参数名称不能为空'}">-->
          <!--<Input placeholder="请输入参数名称"></Input>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="80" label="参数标识" prop="guidType" :rules="{ required: true, type: 'string', trigger: 'change', message: '参数标识不能为空'}">-->
          <!--<Input  placeholder="请输入账号"></Input>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="80" label="备注" prop="remark" :rules="{ required: false, type: 'string', trigger: 'change', message: '手机号不能为空'}">-->
          <!--<Input type="textarea" placeholder="请填写备注" />-->
          <!--</FormItem>-->

          <!--<Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>-->
        </Form>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button @click="confirm" type="primary">保存</Button>
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
              发布时间: {{softDetail.modifyDateTime}}
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


          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>

        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">其他相关软件</p>
          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>写给 iView 开发者的一封信</a>
              <Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag>
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>写给 iView 开发者的一封信</a>
              <Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag>
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>写给 iV 开发者的一封信</a>
              <Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag>
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>写给 iView 开发者的一封信</a>
              <Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag>
            </li>
            <li style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>写给 iView 开信</a>
              <Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag>
            </li>

          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary">
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

        removeModal: false,
        addModal: false,

        commentContentMsg: '',

        softCommentMsg: {
          commentContent: '',
          commentSoftId: ''

        },

        softCommentList: [],
        softCommentTotal: '',

        filter: {
          // 是否精选文章：0全部，1精选
          commentSoftId: '',
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

      addData() {
        this.addModal = true;
      },
      cancel() {
        this.addModal = false;
      },

      confirm() {
        // this.updatetDictType();

        this.softCommentMsg.commentSoftId = this.softId
        this.softCommentMsg.commentContent = this.commentContentMsg

        this.$http.post('/api/soft/comment/add', this.softCommentMsg)
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info("评论成功")
              this.getCommentData(this.filter);
              this.addModal = false;

            }

            console.log("add...soft...comment:", response)
          }).catch(function (error) {
          this.$Message.info('评论失败，请稍后再试');
          this.addModal = false;

          console.log(error);
        })


        // this.addDictType();
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
              this.softCommentList = response.data.data.rows
              this.softCommentTotal = response.data.data.total

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
        this.$router.push({name: 'UserPage', params: {softUserId: this.softUserId}})
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
              this.$router.push('/softIndex')
              // this.getData(this.softId);
            }

            console.log("add...soft...comment:", response)
          })
      },

      getMoreComment() {
        this.filter.page = this.filter.page + 1;
        this.getCommentData(this.filter);
      }
    },
    created() {

      this.softId = this.$route.params.softId
      this.filter.commentSoftId = this.$route.params.softId
      this.softUserId = this.$route.params.softUserId
      this.updateReadNum(this.softId);

      this.getData(this.softId);
      this.getUserData(this.softUserId);
      this.getCommentData(this.filter);


      this.changeLimit();

    }
  }
</script>

