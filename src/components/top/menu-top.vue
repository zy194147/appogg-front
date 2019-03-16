<template>
  <Form style="background-color: white;width: 100%;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem prop="user" style="width: 100%;">
      <Menu @on-select="articleIndex" style="float: left;width: 100%;" mode="horizontal" :theme="theme1"
            active-name="1">
        <!--<FormItem>-->
        <a href="/" >
          <img style="height:40px;width: 116px;left:0;top:10px;position: absolute;" src="../../assets/logo2.svg">
        </a>
        <!--</FormItem>-->
        <FormItem style="margin-top: 15px;position: relative;left:120px;">
          <Input style="width:100%;" search enter-button placeholder="搜索..."/>
        </FormItem>

        <MenuItem style="position: relative;left:130px;" v-for="menu in menuList" :name="menu.menuNameEnglish">
          {{menu.menuName}}
        </MenuItem>
        <FormItem style="margin-top: 15px;position: relative;left: 200px;">
          <div v-if="loginUserName !== null && loginUserName !== ''">
            <span>欢迎你，　</span>

            <!--<Badge :count="5" type="error">-->
              <a @click="userDetails">{{loginUserName}}　</a>
            <!--</Badge>-->
            <Button @click="modal1 = true">退出登录</Button>

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

        modal1: false,

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

      ok () {

        this.$http.get('/api/user/logout')
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info('退出登录成功');
              this.$store.state.userName = null
              this.$store.state.token = null
              window.localStorage.removeItem("token")
              window.localStorage.removeItem("userName")
              // this.getData();
              this.$router.go('/')
            } else {
              console.log("no")

              this.articleDetail = ''
            }
          })
          .catch(function (error) {
            this.$Message.info('退出登录失败');

            console.log(error);
          })
      },
      cancel () {
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

      userDetails() {
        var loginUserId = window.localStorage.getItem("userId");
        this.$router.push({name: 'UserPage', query: {userId: loginUserId}})


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

      go() {
        this.$router.push('/test')
      },
      // asyncOK() {
      // this.modal6 = true;

      // }

    },
    created() {
      this.getData();
    }
  }
</script>

