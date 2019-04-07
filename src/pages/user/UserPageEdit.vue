<template>


  <Form style="text-align: left" ref="userMsgEdit" :model="userMsgEdit" :rules="ruleInline" inline>

    <FormItem style="width:100%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" :padding="0">

        <div style="position:absolute;width:50px;right: 15px;top:15px;">
        </div>

        <div style="width: 100%;">

          <img v-if="userPageImage === ''" style="width:100%;height:200px;object-fit: cover;"
               :src=userDetail.userPageIcon>
          <img v-else style="width:100%;height:200px;object-fit: cover;"
               :src=userPageImage>

          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="/api/image/upload"
            style="position:absolute;top:10px;left:10px">
            <div style="width: 20px;height:20px;line-height: 16px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>

          <!--<Icon style="object-fit: cover;position:absolute;top:10px;right:10px;cursor:pointer" type="ios-camera"  size="20"></Icon>-->

          <img
            style="object-fit: cover;position:absolute;width:160px;height:160px;top:140px;left:30px;border-radius: 4px;border:4px #ffffff solid"
            :src=userDetail.userHeadIcon>

          <img v-if="userHeadImage === ''"
               style="object-fit: cover;position:absolute;width:160px;height:160px;top:140px;left:30px;border-radius: 4px;border:4px #ffffff solid"
               :src=userDetail.userHeadIcon>
          <img v-else
               style="object-fit: cover;position:absolute;width:160px;height:160px;top:140px;left:30px;border-radius: 4px;border:4px #ffffff solid"
               :src=userHeadImage>

          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess1"
            :format="['jpg','jpeg','png']"
            :max-size="1024"
            :on-format-error="handleFormatError1"
            :on-exceeded-size="handleMaxSize1"
            :before-upload="handleBeforeUpload1"
            type="drag"
            action="/api/image/upload"
            style="position:absolute;top:140px;left:30px">
            <div style="width: 20px;height:20px;line-height: 16px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>

          <!--<Icon style="object-fit: cover;position:absolute;top:140px;left:30px;cursor:pointer" type="ios-camera"  size="20"></Icon>-->

          <div style="text-align: left;width:70%;margin-left: 240px;">

            <span style="font-size: 18px;"><strong>{{userDetail.userName}}</strong></span>
            <Poptip
              v-model="nameVisible"
              @on-ok="ok"
              @on-cancel="cancel">
              <!--暂时不可编辑用户名-->
              <!--<a>编辑用户名</a>-->
              <div class="api" slot="content" style="text-align: right">
                <FormItem>
                  <Input v-model.trim="userMsgEdit.userName" :placeholder="userDetail.userName"
                         style="width: 100%;margin-bottom: 20px;"/>
                </FormItem>
                <br/>
                <Button size="small" @click="nameCancel">取消</Button>
                <Button size="small" type="primary" @click="nameSure">确定</Button>
              </div>
            </Poptip>
            <br/>

            <p>
              <Icon type="ios-pin"/>
              {{userDetail.userCity}}　
              <Poptip
                v-model="cityVisible">
                <a>编辑城市</a>
                <div class="api" slot="content" style="text-align: right">
                  <FormItem>
                    <Input v-model.trim="userMsgEdit.userCity" placeholder="城市"
                           style="width: 100%;margin-bottom: 20px;"/>
                  </FormItem>
                  <br/>
                  <Button size="small" @click="cityCancel">取消</Button>
                  <Button size="small" type="primary" @click="citySure">确定</Button>
                </div>
              </Poptip>
              |
              <!--<Icon type="md-male"/>-->
              <span v-if="userDetail.userSex === 1">男　</span>
              <span v-if="userDetail.userSex === 2">女　</span>
              <span v-if="userDetail.userSex === 0">保密　</span>
              <Poptip
                v-model="sexVisible">
                <a>编辑性别</a>
                <div class="api" slot="content" style="text-align: right">
                  <FormItem>
                    <Select v-model.trim="userMsgEdit.userSex" size="small" style="width:200px">
                      <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Button size="small" @click="sexCancel">取消</Button>
                  <Button size="small" type="primary" @click="sexSure">确定</Button>
                </div>
              </Poptip>
            </p>
            <p>{{userDetail.userIntroduce}}
              <!--<p v-else style="margin-bottom: 10px;"></p>-->
              <Poptip
                v-model="intrVisible" width="400">
                <a>编辑简介</a>
                <div class="api" slot="content" style="width: 96%;text-align: right">
                  <FormItem style="width: 100%;margin-bottom: 20px">
                    <Input v-model.trim="userMsgEdit.userIntroduce" placeholder="一句话介绍下自己"
                           style="width: 100%"/>
                  </FormItem>
                  <br/>
                  <Button size="small" @click="intrCancel">取消</Button>
                  <Button size="small" type="primary" @click="intrSure">确定</Button>
                </div>
              </Poptip>
            </p>

            <!--<FormItem>-->
            <!--<Input placeholder="输入简介"-->
            <!--style="width: 100%;margin-bottom: 20px;"/>-->
            <!--</FormItem>-->


            <!--<FormItem>-->
            <!--<Select v-model="model1" style="width:200px">-->
            <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
            <!--</Select>-->
            <!--</FormItem>-->


          </div>


        </div>


        <div style="text-align: center;margin-bottom: 30px">
          <Button @click="cancelUserEdit">取消</Button>
          <Button type="primary" @click="saveUserMsg('userMsgEdit')">保存</Button>

        </div>


      </Card>

    </FormItem>

  </Form>


</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data() {
      return {

        nameVisible: false,
        cityVisible: false,
        sexVisible: false,
        intrVisible: false,

        userPageImage: '',
        visible: false,
        uploadList: [],

        userHeadImage: '',
        visible1: false,
        uploadList1: [],

        userMsgEdit: {
          id:"",
          userPageIcon: "",
          userHeadIcon: "",
          userName: "",
          userCity: "",
          userSex: 0,
          userIntroduce: ""
        },


        userCheckByName: {
          userName: "",
        },


        sexList: [
          {
            value: 0,
            label: '保密'
          },
          {
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          },

        ],
        model1: '',

        leaveMessage: false,

        followStatus: '0',

        articles: [],
        articleNum: '',
        softs: [],
        softNum: '',
        needs: [],
        needNum: '',

        followers: [],
        followNum: '',
        followToUsers: [],
        followToNum: '',

        userId: '',
        userDetail: '',
        articleUser: '',

        loginUserName: '',

        articleUserName: '',

        articleListType: "all",
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

    computed:{

    },
    methods: {
      initUserMsg(){
        this.userMsgEdit.id = window.localStorage.getItem("userId");
        if(this.userPageImage === ''){
          this.userMsgEdit.userPageIcon = this.userDetail.userPageIcon
        } else {
          this.userMsgEdit.userPageIcon = this.userPageImage
        }
        if(this.userHeadImage === ''){
          this.userMsgEdit.userHeadIcon = this.userDetail.userHeadIcon
        } else {
          this.userMsgEdit.userHeadIcon = this.userHeadImage
        }
        this.userMsgEdit.userName = this.userDetail.userName
        this.userMsgEdit.userCity = this.userDetail.userCity
        this.userMsgEdit.userSex = this.userDetail.userSex
        this.userMsgEdit.userIntroduce = this.userDetail.userIntroduce
      },


      //图片上传
      handleView(name) {
        this.userPageImage = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        console.log(res.data)
        console.log(file)
        this.userPageImage = res.data
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      },

      //图片上传
      handleView1(name) {
        this.userHeadImage = name;
        this.visible1 = true;
      },
      handleRemove2(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess1(res, file) {
        console.log(res.data)
        console.log(file)
        this.userHeadImage = res.data
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError1(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize1(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload1() {
        const check = this.uploadList1.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      },

      nameCancel() {
        // alert("cancel")
        this.nameVisible = false;
      },

      nameSure() {
        // alert("sure")

        this.userCheckByName.userName = this.userMsgEdit.userName

        axios.post('/api/user/checkNameExist', this.userCheckByName)
          .then((response) => {
            if (response.data.status === 200) {
              if (response.data.data.status === 1) {
                alert("用户已存在")
              } else {
                this.userDetail.userName=this.userMsgEdit.userName
              }
            }
          })
        this.nameVisible = false;


      },
      cityCancel() {
        // alert("cancel")
        this.cityVisible = false;
      },

      citySure() {
        // alert("sure")

        this.userDetail.userCity=this.userMsgEdit.userCity
        this.cityVisible = false;


      },
      sexCancel() {
        // alert("cancel")
        this.sexVisible = false;
      },

      sexSure() {
        // alert("sure")

        this.userDetail.userSex=this.userMsgEdit.userSex

        this.sexVisible = false;


      },
      intrCancel() {
        // alert("cancel")
        this.intrVisible = false;
      },

      intrSure() {
        // alert("sure")

        this.userDetail.userIntroduce=this.userMsgEdit.userIntroduce
        this.intrVisible = false;


      },

      cancelUserEdit(){
        var loginUserId = window.localStorage.getItem("userId");
        this.$router.push({name: 'UserPage', query: {userId: loginUserId}})
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
      getData(userId) {
        console.log("开始")

        this.$http.get('/api/user/detail', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.userDetail = response.data.data
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.userDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getFollowStatus(userId) {
        console.log("开始")

        this.$http.get('/api/follow/status', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followStatus = '0'
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },


      handleRender() {

        this.leaveMessage = true;

        // this.$Modal.confirm({
        //   render: (h) => {
        //     return h('Input', {
        //       props: {
        //         value: this.value,
        //         autofocus: true,
        //         placeholder: '请留言...'
        //       },
        //       on: {
        //         input: (val) => {
        //           this.value = val;
        //         }
        //       }
        //     })
        //   }
        // })
      },



      saveUserMsg(userEditMsg){
        this.initUserMsg()

        console.log("===========",userEditMsg,"------",this.userMsgEdit)

        this.userMsgEdit.id = window.localStorage.getItem("userId");

        axios.post('/api/user/updateMsg', this.userMsgEdit)
          .then((response) => {
            if (response.data.status === 200) {
              if (response.data.data.status === 0) {

                var loginUserId = window.localStorage.getItem("userId");
                this.$router.push({name: 'UserPage', query: {userId: loginUserId}})

                this.$Message.success('修改成功!')
              } else {
                this.$Message.error('修改失败!')
              }
            }
            console.log("user.....login:", response)
          })
      },


      getFollowers(userId) {
        console.log("开始")

        this.$http.get('/api/follow/listFollow', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followers = response.data.data.rows
              this.followNum = "关注者 " + response.data.data.rows.length
              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followers = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getFollowToUsers(userId) {
        console.log("开始")

        this.$http.get('/api/follow/listFollowTo', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followToUsers = response.data.data.rows
              this.followToNum = "关注的人 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.followToUsers = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getArticles(userId) {
        console.log("开始")

        this.$http.get('/api/user/listArticle', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articles = response.data.data.rows
              this.articleNum = "文章 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.articles = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getSofts(userId) {
        console.log("开始")

        this.$http.get('/api/user/listSoft', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.softs = response.data.data.rows
              this.softNum = "软件 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.softs = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getNeeds(userId) {
        console.log("开始")

        this.$http.get('/api/user/listNeed', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.needs = response.data.data.rows
              this.needNum = "需求 " + response.data.data.rows.length

              console.log("111*******////***11111", this.userDetail,)
            } else {
              console.log("no")

              this.needs = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getArticleUser(userId) {
        console.log("开始")

        this.$http.get('/api/user/detail', {
          params: {
            'userId': userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articleUser = response.data.data
              // console.log("111*******////***11111",this.userDetail,)
            } else {
              // console.log("no")

              // this.userDetail = ''
            }
          })
          .catch(function (error) {
            console.log(error);
          })
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
        this.$router.push({name: 'ArticleDetails', query: {articleId: article.id, articleUserId: article.createUserId}})
      },
      softDetails(soft) {
        this.$router.push({name: 'softDetails', query: {softId: soft.id, softUserId: soft.createUserId}})

      },
      needdetails(need) {
        this.$router.push({name: 'needDetails', query: {needId: need.id, needUserId: need.createUserId}})

      },

      followUser() {
        this.$http.get('/api/follow/followUser', {
          params: {
            'userId': this.userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              this.$Message.success('关注成功');
            }
            console.log("user.....login:", response)
          })
      },
      ok() {
        this.$http.get('/api/follow/unfollowUser', {
          params: {
            'userId': this.userId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.followStatus = response.data.data
              this.$Message.success('取消关注成功');
            }
            console.log("user.....login:", response)
          })
      },
      cancel() {
      },


      go() {
        this.$router.push('/test')
      }
    },
    created() {
      this.userId = this.$route.query.userId
      this.getArticleUser(this.userId);

      this.articleUserName = this.$route.query.articleUserName
      this.loginUserName = window.localStorage.getItem("userName");


      this.getData(this.userId);
      this.getFollowStatus(this.userId);

      this.getFollowers(this.userId);
      this.getFollowToUsers(this.userId);
      this.getArticles(this.userId);
      this.getSofts(this.userId);
      this.getNeeds(this.userId);


      this.changeLimit();
    }
  }
</script>

