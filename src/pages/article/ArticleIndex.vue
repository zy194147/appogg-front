<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card v-for="article in articlePublicList" style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true">
        <div>
          <img style="width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;" :src="article.articleTitleIcon">
          <span>{{article.modifyUserName}}</span>
          <!--<span>{{$store.getters.username}}</span>-->
          <Tooltip content="钻石会员" placement="bottom">
            <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">

          </Tooltip>
          <span>　{{article.modifyDateTime}}　</span>
          <Tooltip content="文章评论数" placement="bottom">
            <Icon type="ios-chatbubbles"/>
            {{ article.commentNum }}
          </Tooltip>

        </div>
        <p style="font-size: 20px;">
          <span style="line-height: 40px;cursor: pointer;" @click="articleDtails(article)">{{article.articleTitleName}}</span>
        </p>
        <div style="position:absolute;width:50px;right: 15px;top:15px;">
          <Tag v-if="article.isSticky === 1" style="float: left;" color="green">置顶</Tag>
          <Tag v-if="article.isFine === 1" style="float: left;" color="gold">精选</Tag>
        </div>
        <!--<Tag style="position:absolute;right: 15px;top:15px;" color="green">置顶</Tag>-->
        <!--<Tag style="position:absolute;right: 15px;top:40px;" color="gold">精选</Tag>-->
        <!--<Divider/>-->
        <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
        <!--<Icon type="ios-loop-strong"></Icon>-->
        <!--Change-->
        <!--</a>-->
        <div style="width: 100%;">
          <p style="width: 76%;float: left;margin-right: 30px;cursor: pointer;"@click="articleDetails(article)">{{article.articleSummary}}</p>
          <div>
            <img style="position:absolute;right: 40px; top:80px; width:120px;height: 80px;" :src="article.articleTitleIcon">
          </div>
        </div>
        <div style="width: 100%;float: left;margin:10px;">

          <Tag v-for="articleTag in article.articleClassifyGroup" color="cyan">{{articleTag}}</Tag>
        </div>

      </Card>

      <Page style="text-align: center" :total="articlePublicTotal" @on-change="pageChange" @on-page-size-change="pageSizeChange" ref="page"
            show-total show-sizer/>
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">文章类型</p>
          <RadioGroup v-model="filter.ifFine" @on-change="articleType">
            <Radio label="0">
              <span>全部</span>
            </Radio>
            <Radio label="1">
              <span>精选</span>
            </Radio>
          </RadioGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">优质文章</p>
          <ul style="list-style:none;">
            <li v-for="trendingArticle in articleTrendingList" style="margin-bottom: 4px;">
              <Icon type="ios-book-outline"/>
              <a>{{trendingArticle.articleTitleName}}</a>
              <Tag color="volcano" style="margin-left: 10px;"><Icon type="ios-chatbubbles"/>{{trendingArticle.commentNum}}</Tag>
            </li>
          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush">
          <Icon type="ios-create-outline"/>
          写文章
        </Button>
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

        articlePublicList: [],
        articlePublicTotal: '',
        filter: {
          // 是否精选文章：0全部，1精选
          ifFine:'0',
          limit: 10,
          page: 1
        },
        articleTrendingList:[],

        trendingSort: {
          limit: 10,
          page: 1
        },

        // articleListType: "all",
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


        axios.get('/api/article/list', {params})
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahah.............ahaha", response.data);


            if (response.data.status === 200) {
              console.log("yes")
              this.articlePublicList = response.data.data.rows
              this.articlePublicTotal = response.data.data.total
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
      articleDetails(article) {
        // 页面带参跳转
        this.$router.push({name: 'ArticleDetails',query: {articleId:article.id,articleUserId:article.createUserId}})
      },
      articlePush() {
        if(this.$store.state.userName !== null){
          this.$router.push('/articlePush')
        } else {
          this.$router.push('/login')
        }
      },
      go() {
        this.$router.push('/test')
      },

      pageChange(page) {
        this.filter.page = page;
        this.getData(this.filter);
      },
      pageSizeChange(limit){
        this.filter.limit = limit;
        this.getData(this.filter);
      },
      articleType(type){
        this.filter.isFine = type
        this.getData(this.filter);

      },

      getTrendingData(params) {
        console.log("开始")


        axios.get('/api/article/trendingList', {params})
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahah.....xxxxxxxxxx........ahaha", response.data);


            if (response.data.status === 200) {
              console.log("yes")
              this.articleTrendingList = response.data.data.rows

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
      this.getTrendingData(this.trendingSort);

      this.getData(this.filter);
      this.changeLimit();
      this.$Loading.finish()

    }
  }
</script>

