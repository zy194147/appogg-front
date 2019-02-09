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

        <MenuItem name="1">
          首页
        </MenuItem>
        <MenuItem name="2" >
          文章
        </MenuItem>
        <MenuItem name="33">
          <!--<template slot="title">-->
            破解软件
          <!--</template>-->
          <!--<MenuItem v-for="d in listdata" name="33">{{ d.id }}</MenuItem>-->
        </MenuItem>
        <MenuItem name="44" >
          需求
        </MenuItem>
        <MenuItem name="5">
          我的地盘
        </MenuItem>
        <MenuItem name="6">
          博客
        </MenuItem>

        <FormItem style="margin-top: 15px;margin-left: 80px;">
          <Button @click="login">登录</Button>
          <Button type="primary" @click="signup">注册</Button>
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

      articleIndex(name){
        console.log("name:",name)
        if(name === "1"){
          this.$router.push('/')
        }
        if(name === "33"){
          this.$router.push('/soft')
        }
        if(name === "44"){
          this.$router.push('/need')
        }
        else {
          this.$router.push('/articleIndex')
        }
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

