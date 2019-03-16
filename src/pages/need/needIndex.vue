<template>
  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card v-if="needPublicList.length == 0" style="text-align: center" dis-hover="false">
        <img src="../../assets/article/not_login.jpg">
        <p>暂无数据</p>
      </Card>

      <Card v-for="need in needPublicList" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;" :src=need.userHeadIcon>
          <span>{{need.createUserName}}</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　{{need.createDateTime}}　</span>
        </div>
        <div style="width: 100%;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="needdetails(need)">{{need.needTitleName}}　
            <Tag v-if="need.isSolved === 1" color="green">已解决</Tag>

            <Tag v-else color="orange">未解决</Tag></span>
        </div>
        <div style="position:absolute;right: 40px;top:30px; width:120px;height: 80px;">
          <Icon type="ios-chatbubbles" />32
        </div>
      </Card>
      <Page v-if="needPublicList.length != 0" style="text-align: center" :total="needPublicTotal" show-total show-elevator />
    </FormItem>
    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">状态</p>
          <RadioGroup v-model="needListType" @on-change="needSolved">
            <Radio label="">
              <span>全部</span>
            </Radio>
            <Radio label=1>
              <span>已解决</span>
            </Radio>
            <Radio label=0>
              <span>未解决</span>
            </Radio>
          </RadioGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">来源</p>
          <RadioGroup v-model="needListType1" @on-change="selfNeed">
            <Radio label="">
              <span>全部</span>
            </Radio>
            <Radio :label=loginUserId>
              <span>仅自己发布</span>
            </Radio>
          </RadioGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">最新需求</p>
          <ul style="list-style:none;">
            <li v-for="trendingNeed in needTrendingList" style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>{{trendingNeed.needTitleName}}</a><Tag color="volcano" style="margin-left: 10px;"><Icon type="ios-chatbubbles"/>{{trendingNeed.answerNum}}</Tag></li>
          </ul>
        </Card>
        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="needPush"><Icon type="ios-create-outline"/> 发布需求</Button>
      </div>
    </FormItem>
  </Form>
</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data () {
      return {

        needPublicList:[],
        needPublicTotal:"",

        needTrendingList:[],
        trendingSort: {
          limit: 10,
          page: 1
        },

        loginUserId:'',

        filter: {
          // 全部系统：0全部，，，，
          isSolved:0,
          createUserId:'',
          limit: 10,
          page: 1
        },


        needListType:"",
        needListType1:"",
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
      getData(params) {
        console.log("开始")
        axios.get('/api/need/list', {params})
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahah.............ahaha", response.data);


            if (response.data.status === 200) {
              console.log("yes")
              this.needPublicList = response.data.data.rows
              this.needPublicTotal = response.data.data.total
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
      changeLimit () {
        function getArrayItems(arr, num) {
          const temp_array = [];
          for (let index in arr) {
            temp_array.push(arr[index]);
          }
          const return_array = [];
          for (let i = 0; i<num; i++) {
            if (temp_array.length>0) {
              const arrIndex = Math.floor(Math.random()*temp_array.length);
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
      needdetails(need){
        this.$router.push({name: 'needDetails',query: {needId:need.id,needUserId:need.createUserId}})

      },
      needPush(){
        this.$Loading.start()
        this.$router.push('/needPush')
        this.$Loading.finish()
      },
      go(){
        this.$router.push('/test')
      },

      needSolved(type){
        this.filter.isSolved = type
        this.getData(this.filter);

      },
      selfNeed(type){
        this.filter.createUserId = type
        this.getData(this.filter);

      },


      getTrendingData(params) {
        console.log("开始")


        axios.get('/api/need/trendingList', {params})
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
    },
    created() {

      this.$Loading.start()
      this.loginUserId = window.localStorage.getItem("userId");

      this.getTrendingData(this.trendingSort);

      this.getData(this.filter);
      this.changeLimit();
      this.$Loading.finish()

    }
  }
</script>

