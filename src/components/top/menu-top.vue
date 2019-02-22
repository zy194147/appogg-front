<template>
  <Form style="background-color: white;width: 100%;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem prop="user" style="width: 100%;">
      <Menu @on-select="articleIndex" style="float: left;width: 100%;" mode="horizontal" :theme="theme1" active-name="1">
          <FormItem>
            <a href="/">
              <!--<img style="width: 60px;height:60px;" src="../../assets/logo1.svg">-->
            </a>
          </FormItem>
          <FormItem style="margin-top: 15px;">
            <Input style="width:100%;" search enter-button placeholder="搜索..." />
          </FormItem>

        <MenuItem v-for="menu in menuList" :name="menu.menuNameEnglish">
          {{menu.menuName}}
        </MenuItem>
        <!--<MenuItem name="2" >-->
          <!--文章-->
        <!--</MenuItem>-->
        <!--<MenuItem name="33">-->
          <!--&lt;!&ndash;<template slot="title">&ndash;&gt;-->
            <!--破解软件-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
          <!--&lt;!&ndash;<MenuItem v-for="d in listdata" name="33">{{ d.id }}</MenuItem>&ndash;&gt;-->
        <!--</MenuItem>-->
        <!--<MenuItem name="44" >-->
          <!--需求-->
        <!--</MenuItem>-->
        <!--<MenuItem name="5">-->
          <!--我的地盘-->
        <!--</MenuItem>-->
        <!--<MenuItem name="6">-->
          <!--博客-->
        <!--</MenuItem>-->

        <FormItem style="margin-top: 15px;margin-left: 80px;">

          <div v-if="$store.state.userName !== null">
            <span>欢迎你，　</span><a @click="userDetails">{{$store.state.userName}}　</a>
            <Button @click="logout">注销</Button>
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
    data () {
      return {
        menuList:[],
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
      getData() {
        console.log("开始")
        axios.get('/api/menu/list')
          .then((response) => {
            console.log(1)
            console.log(response.data.data,"hahahahahaha",response.data.status);


            if(response.data.status === 200){
              console.log("yes")
              this.menuList = response.data.data
              console.log(this.listdata,"1111111111111")
            } else {
              console.log("no")

              this.menuList = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },

      articleIndex(name){
        console.log("name:",name)
        if(name === "indexPage"){
          console.log("nnn1:" + name)
          this.$router.push('/')
        }
        else if(name === "article"){
          console.log("nnn2:" + name)

          this.$router.push('/articleIndex')
        }
        else if(name === "soft"){
          this.$router.push('/soft')
        }
        else if(name === "need"){
          this.$router.push('/need')
        }
        else if(name === "selfCenter"){
          this.$router.push('/user')
        }
        else if(name === "about"){
          this.$router.push('/about')
        }
        // else {
        //   console.log("nnn3:" + name)
        //
        //   this.$router.push('/')
        // }
      },

      userDetails(){
        this.$router.push('/user')

      },

      logout(){
        this.$store.state.userName = null
        this.$router.push('/')

      },

      login(){
        this.$Loading.start()
        this.$router.push('/login')
        this.$Loading.finish()
      },
      signup(){
        this.$Loading.start()
        this.$router.push('/signup')
        this.$Loading.finish()
      },

      go(){
        this.$router.push('/test')
      }
    },
    created() {
      this.getData();
    }
  }
</script>

