<template>



  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card v-for="soft in softPublicList" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>{{soft.createUserName}}</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　{{soft.createDateTime}}　</span>
          <Icon type="ios-chatbubbles" />{{soft.commentNum}}
        </div>
        <div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="softDetails(soft)">{{soft.softTitleName}}</span>
        </div>
        <div>
          <img style="position:absolute;right: 40px;top:40px; width:120px;height: 80px;" :src=soft.softTitleIcon>
        </div>
        <div v-for="softTag in soft.softClassifyGroup" style="width: 100%;margin:10px;">
          <Tag style="float: left" color="cyan">{{softTag}}</Tag>
        </div>
      </Card>
      <Page style="text-align: center" :total="softPublicTotal" show-total show-elevator />
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">

        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">平台</p>
          <RadioGroup v-model="articleListType">
            <Radio label="all">
              <span>全部</span>
            </Radio>
            <Radio label="android">
              <span>安卓</span>
            </Radio>
            <Radio label="iphone">
              <span>苹果</span>
            </Radio>
            <Radio label="windows">
              <span>windows</span>
            </Radio>
            <Radio label="linux">
              <span>linux</span>
            </Radio>
            <Radio label="mac">
              <span>mac</span>
            </Radio>
            <Radio label="other">
              <span>其他</span>
            </Radio>
          </RadioGroup>
        </Card>

        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">分类</p>
          <a slot="extra">换一批</a>
          <CheckboxGroup  v-model="articleListType1">
            <Checkbox  label="all1">
              <span>实用</span>
            </Checkbox >
            <Checkbox  label="android1">
              <span>好用的工具</span>
            </Checkbox >
            <Checkbox  label="iphone1">
              <span>破解</span>
            </Checkbox >
            <Checkbox  label="windows1">
              <span>阅读</span>
            </Checkbox >
            <Checkbox  label="linux1">
              <span>视频</span>
            </Checkbox >
            <Checkbox  label="mac1">
              <span>音乐</span>
            </Checkbox >
            <Checkbox  label="other1">
              <span>其他1</span>
            </Checkbox >
            <Checkbox  label="other2">
              <span>其他2</span>
            </Checkbox >
          </CheckboxGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">最新发布</p>
          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iV 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush"><Icon type="ios-create-outline"/> 发布软件</Button>
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

        softPublicList:[],
        softPublicTotal:"",

        filter: {
          // 全部系统：0全部，，，，
          softSystemPlatform:'0',
          limit: 10,
          page: 1
        },
        articleListType:"all",
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


        axios.get('/api/soft/list', {params})
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahah.............ahaha", response.data);


            if (response.data.status === 200) {
              console.log("yes")
              this.softPublicList = response.data.data.rows
              this.softPublicTotal = response.data.data.total
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
      softDetails(soft){
        this.$router.push({name: 'softDetails',params: {softId:soft.id,softUserId:soft.createUserId}})

      },
      articlePush(){
        this.$router.push('/softPush')
      },
      go(){
        this.$router.push('/test')
      },
    },
    created() {

      this.getData(this.filter);
      this.changeLimit();
    }
  }
</script>

