<template>
  <Form style="background-color: white;width: 100%;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem prop="user" style="width: 100%;">
      <Menu @on-select="articleIndex" style="float: left;width: 100%;" mode="horizontal" :theme="theme1"
            active-name="1">
        <!--<FormItem>-->
        <a href="/">
          <img style="height:40px;width: 116px;left:0;top:10px;position: absolute;" src="../../assets/logo3.png">
        </a>
        <!--</FormItem>-->
        <FormItem style="margin-top: 15px;position: relative;left:120px;">
          <Input v-model.trim="searchText" style="width:100%;" search icon placeholder="搜索..."
                 @on-search="goSearch(searchText)"/>
        </FormItem>

        <MenuItem style="position: relative;left:130px;" v-for="menu in menuList" :name="menu.menuNameEnglish">
          {{menu.menuName}}
        </MenuItem>
        <FormItem style="margin-top: 15px;position: relative;left: 200px;">
          <div v-if="loginUserName !== null && loginUserName !== ''">

            <!--<span>欢迎你，　</span>-->

            <Dropdown trigger="click" @on-click="userAction">
              <Badge :count="noticeTotal" type="error">

                <a href="javascript:void(0)">
                  <img
                    style="width:30px;height:30px;border-radius:50%; overflow:hidden;object-fit: cover;"
                    :src=loginUserIcon>

                  <a href="#" class="demo-badge"></a>

                </a>
              </Badge>

              <DropdownMenu slot="list" style="text-align: left">


                <DropdownItem>
                  <strong style="font-size: 16px;">{{loginUserName}}</strong><br/>
                  <span>普通会员</span>
                </DropdownItem>
                <DropdownItem divided name="user">
                  <Icon type="ios-person-outline"/>
                  个人中心
                </DropdownItem>
                <DropdownItem name="notice">

                  <Badge v-if="noticeTotal != 0" type="error" dot>
                    <Icon type="md-notifications-outline"/>
                    <span> 通知</span>

                  </Badge>
                  <div v-else>
                    <Icon type="md-notifications-outline"/>
                    <span> 通知</span>
                  </div>


                </DropdownItem>
                <DropdownItem divided name="logout">
                  <Icon type="ios-log-out"/>
                  退出登录
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" @on-click="userAction" style="margin-left: 10px;">
              <a href="javascript:void(0)">
                <img style="width:20px;height:20px;margin-bottom: 4px;" src="../../assets/head/add_menu.svg">
                <!--<Icon style="width:10px;height:10px;" type="md-add"/>-->
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="pushSoft">发布软件</DropdownItem>
                <DropdownItem name="pushArticle">发布文章</DropdownItem>
                <DropdownItem name="pushNeed">发布需求</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <!--<Badge :count="5" type="error">-->
            <!--<Poptip placement="bottom" width="80">-->
            <!--<img style="width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;" :src=loginUserIcon>-->

            <!--<a>{{loginUserName}}</a>-->
            <!--<div class="api" slot="content">-->
            <!--<a @click="userDetails">个人中心</a><Divider/>-->
            <!--<a @click="softPush">发布软件</a><Divider/>-->
            <!--<a @click="articlePush">发布文章</a><Divider/>-->
            <!--<a @click="needPush">发布需求</a><Divider/>-->
            <!--<a @click="modal1 = true">退出登录</a>-->
            <!--</div>-->
            <!--</Poptip>-->

            <!--<a @click="value1 = true" type="primary">{{loginUserName}}</a>-->
            <!--<Drawer :title=loginUserName :closable="false" v-model="value1" >-->
            <!--<a @click="userDetails">个人中心</a><Divider/>-->
            <!--<a @click="softPush">发布软件</a><Divider/>-->
            <!--<a @click="articlePush">发布文章</a><Divider/>-->
            <!--<a @click="needPush">发布需求</a><Divider/>-->
            <!--<a @click="modal1 = true">退出登录</a><Divider/>-->

            <!--</Drawer>-->

            <!--<Poptip title="Title" content="content" placement="bottom">-->
            <!--<Button>{{loginUserName}}</Button>-->
            <!--</Poptip>-->

            <!--<a @click="userDetails">{{loginUserName}}　</a>-->
            <!--</Badge>-->
            <!--<Button @click="modal1 = true">退出登录</Button>-->

            <Modal
              v-model="modal1"
              @on-ok="ok"
              @on-cancel="cancel">
              <p style="text-align: center;font-size: 16px;">确定退出登录?</p>
            </Modal>
          </div>
          <div v-else>
            <Button @click="login">登录</Button>
            <Button type="primary" @click="signup">注册</Button>
          </div>
        </FormItem>
      </Menu>

    </FormItem>
  </Form>
</template>
<script>
  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data() {
      return {
        value1: false,
        modal1: false,

        noticeFilter: {
          id: '',
        },

        noticeTotal: '',

        loginUserIcon: '',

        loginUserName: '',
        // modal6: false,
        // loading: true,

        menuList: [],
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

      ok() {

        this.$http.get('/api/user/logout')
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info('退出登录成功');
              this.$store.state.userName = null
              this.$store.state.token = null
              window.localStorage.removeItem("token")
              window.localStorage.removeItem("userName")
              window.localStorage.removeItem("userId")
              window.localStorage.removeItem("userIcon")
              // this.getData();
              this.$router.go('/')
            } else { // 后台redis中的用户登录信息已失效，直接退出登录
              this.$Message.info('退出登录成功');
              this.$store.state.userName = null
              this.$store.state.token = null
              window.localStorage.removeItem("token")
              window.localStorage.removeItem("userName")
              window.localStorage.removeItem("userId")
              window.localStorage.removeItem("userIcon")
              // this.getData();
              this.$router.go('/')
            }
          })
          .catch(function (error) {
            this.$Message.info('退出登录失败');

            console.log(error);
          })
      },
      cancel() {
        // this.$Message.info('Clicked cancel');
      },
      logoutModal() {
        const title = 'Title';
        const content = '<p>Content of dialog</p><p>Content of dialog</p>';
        this.$Modal.info({
          title: title,
          content: content
        });
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
      getData() {
        console.log("开始")
        axios.get('/api/menu/list')
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahahahaha", response.data.status);


            if (response.data.status === 200) {
              console.log("yes")
              this.menuList = response.data.data
              console.log(this.listdata, "1111111111111")
            } else {
              console.log("no")

              this.menuList = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },

      getNoticeTotal(params) {
        console.log("开始")
        axios.get('/api/notice/noticeTotal', {params})
          .then((response) => {

            if (response.data.status === 200) {
              this.noticeTotal = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },

      articleIndex(name) {
        console.log("name:", name)
        if (name === "indexPage") {
          console.log("nnn1:" + name)
          this.$router.push('/')
        }
        else if (name === "article") {
          console.log("nnn2:" + name)

          this.$router.push('/article')
        }
        else if (name === "soft") {
          this.$router.push('/soft')
        }
        else if (name === "need") {
          this.$router.push('/need')
        }
        else if (name === "selfCenter") {
          this.$router.push('/user')
        }
        else if (name === "about") {
          this.$router.push('/about')
        }
        // else {
        //   console.log("nnn3:" + name)
        //
        //   this.$router.push('/')
        // }
      },
      softPush() {
        this.$router.push('/softPush')
        this.value1 = false

      },

      articlePush() {
        if (this.$store.state.userName !== null) {
          this.$router.push('/articlePush')
        } else {
          this.$router.push('/login')
        }
        this.value1 = false

      },
      needPush() {
        this.$Loading.start()
        this.$router.push('/needPush')
        this.$Loading.finish()
        this.value1 = false

      },


      toNoticePage() {
        this.$Loading.start()
        this.$router.push('/notice')
        this.$Loading.finish()
        this.value1 = false
      },

      userAction(item) {
        if (item === 'user') {
          this.userDetails();
        } else if (item === 'pushSoft') {
          this.softPush();
        }
        else if (item === 'pushArticle') {
          this.articlePush();
        }
        else if (item === 'pushNeed') {
          this.needPush();
        }
        else if (item === 'logout') {
          this.modal1 = true
        }
        else if (item === 'notice') {
          this.toNoticePage();
        }


      },

      userDetails() {
        var loginUserId = window.localStorage.getItem("userId");
        this.$router.push({name: 'UserPage', query: {userId: loginUserId}})
        this.value1 = false

      },
      // cancel(){
      // this.modal6 = false;
      // },

      login() {
        this.$Loading.start()
        this.$router.push('/login')

        this.$Loading.finish()
      },
      signup() {
        this.$Loading.start()
        this.$router.push('/signup')
        this.$Loading.finish()
      },
      goSearch(searchText) {
        this.$Message.warning("暂不能搜索")
      },

      go() {
        this.$router.push('/test')
      },
      // asyncOK() {
      // this.modal6 = true;

      // }

    },
    created() {
      this.getData();

      this.noticeFilter.id = window.localStorage.getItem("userId")
      this.getNoticeTotal(this.noticeFilter);
    }
  }
</script>

