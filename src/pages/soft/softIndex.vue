<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Spin size="large" fix v-if="softPublicList.length == 0"></Spin>


      <Card v-for="soft in softPublicList" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <div>
          <img @click="userDetail(soft.createUserId)"
               style="cursor:pointer;width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;"
               :src=soft.userHeadIcon>
          <span style="cursor: pointer" @click="userDetail(soft.createUserId)">{{soft.createUserName}}</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　{{soft.createDateTime}}　</span>
          <Icon type="ios-chatbubbles"/>
          {{soft.commentNum}}
        </div>
        <div
          style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="softDetails(soft)">{{soft.softTitleName}}</span>
        </div>
        <div>
          <img style="object-fit: cover;position:absolute;right: 40px;top:40px; width:120px;height: 80px;"
               :src=soft.softTitleIcon>
        </div>
        <div v-for="softTag in soft.softClassifyGroup" style="width: 100%;margin:10px;">
          <Tag style="float: left" color="cyan">{{softTag}}</Tag>
        </div>
      </Card>
      <Page style="text-align: center" :total="softPublicTotal" show-total show-elevator @on-change="pageChange"
            @on-page-size-change="pageSizeChange"/>
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">

        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">平台</p>
          <RadioGroup v-model="articleListType" @on-change="systemChange">
            <Radio label="">
              <span>全部</span>
            </Radio>
            <Radio label="安卓">
              <span>安卓</span>
            </Radio>
            <Radio label="苹果">
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
            <Radio label="其他">
              <span>其他</span>
            </Radio>
          </RadioGroup>
        </Card>


        <!--<Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">-->
        <!--<p slot="title">分类</p>-->
        <!--<a slot="extra">换一批</a>-->
        <!--<CheckboxGroup>-->
        <!--<Checkbox v-for="classify in softClassifyList" :label="classify.id">-->
        <!--<span>{{classify.classifyName}}</span>-->
        <!--</Checkbox>-->
        <!--</CheckboxGroup>-->
        <!--</Card>-->
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">最热</p>
          <ul style="list-style:none;">
            <li v-for="trendingSoft in softTrendingList" style="margin-bottom: 4px;">
              <!--<Icon type="ios-book-outline"/>-->

              <!--<div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">-->

              <p
                style="float: left;width:auto;max-width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
                <a @click="softDetails(trendingSoft)">{{trendingSoft.softTitleName}}</a>

              </p>
              <Tag color="volcano" style="margin-left: 10px;">

                <Icon type="ios-chatbubbles"/>
                {{trendingSoft.commentNum}}
              </Tag>
              <!--</div>-->
              <!--<Tag color="volcano" style="margin-left: 10px;">-->

              <!--<Icon type="ios-chatbubbles"/>-->
              <!--{{trendingSoft.commentNum}}-->
              <!--</Tag>-->
            </li>
          </ul>
        </Card>


        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">没找到想要的?</p>
          <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="needPush">
            <Icon type="ios-create-outline"/>
            去发布需求
          </Button>
        </Card>

        <!--<Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush">-->
        <!--<Icon type="ios-create-outline"/>-->
        <!--发布软件-->
        <!--</Button>-->
      </div>

    </FormItem>


  </Form>


</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data() {
      return {
        softClassifyList: [],
        listClassifyType: {
          classifyType: "soft"
        },


        softPublicList: [],
        softPublicTotal: "",

        softTrendingList: [],

        filter: {
          // 全部系统：0全部，，，，
          softSystemPlatform: '',
          limit: 10,
          page: 1
        },
        trendingSort: {
          limit: 10,
          page: 1
        },
        articleListType: "",
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


      userDetail(userId) {
        this.$router.push({name: 'UserPage', query: {userId: userId}})

      },

      needPush() {
        this.$Loading.start()
        this.$router.push('/needPush')
        this.$Loading.finish()
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
      getData(params) {
        console.log("开始")
        this.$Spin.show();

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
        this.$Spin.hide();
        console.log("结束")
      },
      getTrendingData(params) {
        console.log("开始")


        axios.get('/api/soft/trendingList', {params})
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahah.....xxxxxxxxxx........ahaha", response.data);


            if (response.data.status === 200) {
              console.log("yes")
              this.softTrendingList = response.data.data.rows
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
      softDetails(soft) {
        this.$router.push({name: 'softDetails', query: {softId: soft.id, softUserId: soft.createUserId}})

      },
      // articlePush() {
      //   this.$router.push('/softPush')
      // },
      go() {
        this.$router.push('/test')
      },

      systemChange(type) {
        this.filter.softSystemPlatform = type
        this.getData(this.filter);

      },

      info(nodesc) {
        this.$Notice.info({
          title: '通知',
          desc: nodesc ? '' : '多读书，多看报，少吃零食多睡觉！'
        });
      },

      pageChange(page) {
        this.filter.page = page;
        this.getData(this.filter);
      },
      pageSizeChange(limit) {
        this.filter.limit = limit;
        this.getData(this.filter);
      },


      getClassifyData(params) {

        this.$http.get('/api/classify/list', {params})
          .then((response) => {
            if (response.data.status === 200) {

              this.softClassifyList = response.data.data.rows
            } else {
              console.log("no")

              this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
    },
    created() {
      this.$Loading.start()


      if (window.localStorage.getItem("userName") === "zhangyj") {

        this.info(false)
      }

      this.getClassifyData(this.listClassifyType)

      this.getData(this.filter);
      this.getTrendingData(this.trendingSort);
      this.changeLimit();
      this.$Loading.finish()

    }
  }
</script>

