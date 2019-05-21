<template>


  <Form style="background-color: #F5F5F5;margin-top: -25px;" ref="formInline" :model="formInline" :rules="ruleInline"
        inline>

    <FormItem style="background-color: #F5F5F5;width: 100%;margin-top: -8px;">

      <div style="float: left;background-color: #fff;width: 100%;height:80px;text-align: center">

        <Input v-model.trim="searchWord" style="width: 40%;margin: 20px auto;" search enter-button="搜索"
               placeholder="输入文字搜索......" @on-search="searchSubmit"/>

      </div>

      <Form style="text-align: left;" inline>

        <FormItem style="width:100%;text-align: left;margin-top: 10px;">

          <Card v-for="soft in searchSoftList" style="width:100%;float: left;margin-bottom: 6px;height:100px;" :dis-hover="true">
            <!--<div>-->
              <!--<img @click="userDetail(soft.createUserId)"-->
                   <!--style="cursor:pointer;width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;"-->
                   <!--:src=soft.userHeadIcon>-->
              <!--<span style="cursor: pointer" @click="userDetail(soft.createUserId)">{{soft.createUserName}}</span>-->

              <!--<Tooltip :content="soft.userAuthName" placement="bottom">-->
                <!--<img style="width: 20px;height: 20px;" :src="soft.userAuthIcon">-->
              <!--</Tooltip>-->
              <!--&lt;!&ndash;<img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">&ndash;&gt;-->
              <!--<span>　{{soft.createDateTime}}　</span>-->
              <!--<Icon type="ios-chatbubbles"/>-->
              <!--{{soft.commentNum}}-->

            <!--</div>-->
            <div
              style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
              <Tag color="green">软件</Tag>

              <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="softDetails(soft)">{{soft.softTitleName}}</span>
            </div>
            <div>
              <img style="object-fit: cover;position:absolute;right: 40px;top:10px; width:100px;height: 80px;"
                   :src=soft.softTitleIcon>
            </div>
            <!--<div v-for="softTag in soft.softClassifyGroup" style="width: 100%;margin:10px;">-->
              <!--<Tag style="float: left" color="cyan">{{softTag}}</Tag>-->
            <!--</div>-->
          </Card>

          <Card v-for="article in searchArticleList" style="width:100%;float: left;margin-bottom: 6px;"
                :dis-hover="true">
            <!--<div>-->

              <!--<img @click="userDetail(article.createUserId)"-->
                   <!--style="width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;cursor: pointer"-->
                   <!--:src="article.userHeadIcon">-->
              <!--<span style="cursor: pointer" @click="userDetail(article.createUserId)">{{article.createUserName}}</span>-->
              <!--&lt;!&ndash;<span>{{$store.getters.username}}</span>&ndash;&gt;-->

              <!--<Tooltip :content="article.userAuthName" placement="bottom">-->
                <!--<img style="width: 20px;height: 20px;" :src="article.userAuthIcon">-->
              <!--</Tooltip>-->
              <!--<span>　{{article.createDateTime}}　</span>-->
              <!--<Tooltip content="文章评论数" placement="bottom">-->
                <!--<Icon type="ios-chatbubbles"/>-->
                <!--{{ article.commentNum }}-->
              <!--</Tooltip>-->

            <!--</div>-->
            <p style="width:76%;font-size: 20px;">
              <Tag color="green">文章</Tag>

              <span style="line-height: 40px;cursor: pointer;"
                @click="articleDetails(article)">{{article.articleTitleName}}</span>
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
              <p style="width: 76%;float: left;margin-right: 30px;cursor: pointer;" @click="articleDetails(article)">
                {{article.articleSummary}}</p>
              <!--<div>-->
                <!--<img @click="articleDetails(article)"-->
                     <!--style="object-fit: cover;position:absolute;right: 40px; top:80px; width:120px;height: 80px;cursor:pointer;"-->
                     <!--:src="article.articleTitleIcon">-->
              <!--</div>-->
            </div>
            <!--<div style="width: 100%;float: left;margin:10px;">-->

              <!--<Tag v-for="articleTag in article.articleClassifyGroup" color="cyan">{{articleTag}}</Tag>-->
            <!--</div>-->

          </Card>

          <Card v-for="need in searchNeedList" style="width:100%;float: left;margin-bottom: 6px;" :dis-hover="true" >
            <!--<Spin size="large" fix v-if="needPublicList.length != 0"></Spin>-->

            <!--<div>-->
              <!--<img  @click="userDetail(need.createUserId)" style="cursor:pointer;width:30px;height:30px;margin-right: 10px;border-radius:50%; overflow:hidden;" :src=need.userHeadIcon>-->
              <!--<span style="cursor: pointer" @click="userDetail(need.createUserId)">{{need.createUserName}}</span>-->
              <!--<Tooltip :content="need.userAuthName" placement="bottom">-->
                <!--<img style="width: 20px;height: 20px;" :src="need.userAuthIcon">-->
              <!--</Tooltip>-->
              <!--&lt;!&ndash;<img  style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">&ndash;&gt;-->
              <!--<span>　{{need.createDateTime}}　</span>-->
            <!--</div>-->
            <div style="width: 100%;">
              <Tag color="green">问题</Tag>

              <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="needdetails(need)">{{need.needTitleName}}　
            <Tag v-if="need.isSolved === 1" color="green">已解决</Tag>

            <Tag v-else color="orange">未解决</Tag></span>
            </div>
            <div style="position:absolute;right: 40px;top:30px; width:120px;height: 80px;">
              <Icon type="ios-chatbubbles" />{{need.answerNum}}
            </div>
          </Card>


        </FormItem>
      </Form>

      <div v-if="searchNeedList.length <= 0 && searchArticleList.length <= 0 && searchSoftList.length <= 0">
        <Card style="width:100%;float: left" :bordered="true" :dis-hover="true">

          <img style="height:100px;" src="../../assets/article/no_user.png">
          <p>没有结果</p>
          <!--<p style="font-size: 20px;">-->
          <!--关于我们——appogg-->
          <!--</p>-->
          <!--<Divider/>-->

          <!--<div style="text-align: left">-->


          <!--<p><strong>-->
          <!--<span style="font-size:18px">一、我们是谁</span>-->
          <!--</strong>-->
          <!--</p>-->
          <!--<p>appogg(www.appogg.com)显然是一个网站，仅仅用于向大家-->
          <!--<strong>推荐软件</strong>-->
          <!--的网站，我们则作为搬运工向大家搬运好用的软件，包括小众但是很使用的的软件，-->
          <!--当然，我们也会向大家推荐网友破解的软件、游戏等，-->
          <!--如果你在这里发现任何侵害了你利益的东西，请联系我们处理。-->
          <!--推荐的软件我们会以系统区分，你可以以系统方式筛选出你需要的软件，-->
          <!--我们会陆续加入以软件的功能和类别等方式区分。-->
          <!--软件的下载将使用网盘的方式，一律免费。</p>-->
          <!--<p><br/></p>-->
          <!--<p>-->
          <!--<strong><span style="font-size:18px">二、我们的愿景</span></strong>-->
          <!--</p>-->
          <!--<p><span style="font-size:16px">我们希望打造一个和谐的、乐于分享的环境。</span>-->
          <!--</p>-->
          <!--<p><span style="font-size:18px"><br/></span></p>-->
          <!--<p><strong><span style="font-size:18px">三、你能得到什么</span></strong>-->
          <!--</p>-->
          <!--<p><span style="font-size:16px">-->
          <!--在这里你能得到很多大家分享出来的软件，-->
          <!--你也可以加入分享软件的队伍中，分享你觉得好用的工具。-->
          <!--</span></p>-->
          <!--<p><span style="font-size:16px"><br/></span></p>-->
          <!--<p><span style="font-size:16px"><br/></span></p>-->
          <!--<p><span style="font-size:16px"><br/></span>-->
          <!--</p>-->

          <!--</div>-->


        </Card>
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

        searchArticleList: [],
        searchSoftList: [],
        searchNeedList: [],


        searchWord: '',
        http: Httpservice.getAxios,
        listdata: [],
        theme1: 'light',

      }
    },
    methods: {

      softDetails(soft) {
        this.$router.push({name: 'softDetails', query: {softId: soft.id, softUserId: soft.createUserId}})

      },

      needdetails(need){
        this.$router.push({name: 'needDetails',query: {needId:need.id,needUserId:need.createUserId}})

      },

      articleDetails(article) {
        // 页面带参跳转
        this.$router.push({name: 'ArticleDetails', query: {articleId: article.id, articleUserId: article.createUserId}})
      },


      searchSubmit() {
        console.log("sss", this.searchWord)

        if (this.searchWord === ''){
          this.$Message.info("请输入文字搜索")
          return false;
        }

        this.$http.get('/api/word/search', {
          params: {
            'wd': this.searchWord
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              console.log("search.....yes")
              this.searchArticleList = response.data.data.articleList
              this.searchSoftList = response.data.data.softList
              this.searchNeedList = response.data.data.needList
            } else {
              console.log("search.....no")

              // this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
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


        axios.get('/api/hello/say')
          .then((response) => {
            console.log(1)
            console.log(response.data.data, "hahahahahaha", response.data.status);


            if (response.data.status === 200) {
              console.log("yes")
              this.listdata = response.data.data
              console.log(this.listdata, "1111111111111")
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
      go() {
        this.$router.push('/test')
      }
    },

    signup() {
      this.$router.push('/signup')
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

