<template>
  <Form style="width:80%;margin-left: 10%;background-color: green;" ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem>
      <img style="width: 60px;height:60px;" src="../assets/logo1.svg">
    </FormItem>
    <FormItem style="margin-top: 15px;">
      <Input style="width:100%;" search enter-button placeholder="搜索..." />
    </FormItem>
    <FormItem prop="user" style="background-color: black">
      <Menu style="float: left;" mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          文章
        </MenuItem>
        <MenuItem name="2">
          破解
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            软件
          </template>
          <MenuItem v-for="d in listdata">{{ d.id }}</MenuItem>
        </Submenu>
        <MenuItem name="4">
          我的地盘
        </MenuItem>
        <MenuItem name="5">
          博客
        </MenuItem>
      </Menu>
      <FormItem style="margin-top: 15px;margin-left: 80px;text-align: right">
        <Button>登录</Button>
        <Button type="primary">注册</Button>
      </FormItem>
    </FormItem>

  </Form>
</template>
<script>
  import axios from 'axios'
  import Httpservice from '@/router/service'
  export default {
    data () {
      return {
        // formInline: {
        //   user: '',
        //   password: ''
        // },
        // ruleInline: {
        //   user: [
        //     { required: true, message: '请填写用户名', trigger: 'blur' }
        //   ],
        //   password: [
        //     { required: true, message: '请填写密码', trigger: 'blur' },
        //     { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        //   ]
        // },
        http:Httpservice.getAxios,
        listdata:[],
        theme1: 'light',
      }
    },
    methods: {
      // handleSubmit (name) {
      //   this.$refs[name].validate((valid) => {
      //     if (valid) {
      //       this.$Message.success('提交成功!')
      //     } else {
      //       this.$Message.error('表单验证失败!')
      //     }
      //   })
      // },
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
    },
    created() {
      this.getData();
    }
  }
</script>

