<template>


  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <FormItem style="width:100%;margin-top: -10px;">

      <Card :bordered="true" dis-hover="false">



        <Tabs value="name1" :animated="false" >
          <TabPane :label="label" name="name1">

            <div v-for="commentNotice in commentNoticeList">
              {{commentNotice.actionFromUserName}} 在 {{commentNotice.createDateTime}}评论了你的文章
              <a @click="viewNotice">查看详情</a>
              <Button v-if="commentNotice.readStatus === 0" style="position: absolute;right: 20px;" @click="setArticleRead(commentNotice.id)">置为已读</Button>
              <Button v-else style="position: absolute;right: 20px;"><Icon type="md-checkmark" />已读</Button>
              <Divider/>
            </div>

          </TabPane>
          <TabPane :label="label2" name="name2">

            <div v-for="commentNotice in leaveMsgNotice">
              {{commentNotice.actionFromUserName}} 在 {{commentNotice.createDateTime}}评论了你的文章
              <a @click="viewNotice">查看详情</a>
              <Button v-if="commentNotice.readStatus === 0" style="position: absolute;right: 20px;" @click="setArticleRead(commentNotice.id)">置为已读</Button>
              <Button v-else style="position: absolute;right: 20px;"><Icon type="md-checkmark" />已读</Button>
              <Divider/>
            </div>


          </TabPane>
          <TabPane :label="label3" name="name3">
            <div v-for="commentNotice in systemNoticeList">
              {{commentNotice.actionFromUserName}} 在 {{commentNotice.createDateTime}}评论了你的文章
              <a @click="viewNotice">查看详情</a>
              <Button v-if="commentNotice.readStatus === 0" style="position: absolute;right: 20px;" @click="setArticleRead(commentNotice.id)">置为已读</Button>
              <Button v-else style="position: absolute;right: 20px;"><Icon type="md-checkmark" />已读</Button>
              <Divider/>
            </div>


          </TabPane>
        </Tabs>


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

        noticeReadStatus:0,

        noticeFilter:{
          id:'',
          noticeType:'article',
        },
        leaveMessageNotice:{
          id:'',
          noticeType:'leaveMsg',
        },
        SystemNotice:{
          id:'',
          noticeType:'system',
        },

        commentNoticeTotal:'',

        notReadCommentNoticeTotal:'',

        notReadLeaveMsgNoticeTotal:'',

        notReadSystemNoticeTotal:'',

        commentNoticeList:[],
        leaveMsgNoticeList:[],
        systemNoticeList:[],


        label: (h) => {
          return h('div', [
            h('span', '评论相关'),
            h('Badge', {
              props: {
                count: this.notReadCommentNoticeTotal,
              }
            })
          ])
        },

        label2: (h) => {
          return h('div', [
            h('span', '留言相关'),
            h('Badge', {
              props: {
                count: this.notReadLeaveMsgNoticeTotal,
              }
            })
          ])
        },

        label3: (h) => {
          return h('div', [
            h('span', '系统通知'),
            h('Badge', {
              props: {
                count: this.notReadSystemNoticeTotal,
              }
            })
          ])
        },


      }
    },
    methods: {

      viewNotice(){

        const title = '评论信息';
        const content = '<p>张三评论了你的文章</p>';
        this.$Modal.info({
          title: title,
          content: content,
          // onOk: () => {
          //   this.$Message.info('点击了确定');
          // },
          // onCancel: () => {
          //   this.$Message.info('点击了取消');
          // }
        });
      },
      viewMessage(){

        const title = '留言信息';
        const content = '<p>张三在 2019-12-21 给你留言：</p><p>你好啊，交个盆友啊</p>';
        this.$Modal.info({
          title: title,
          content: content,
          // onOk: () => {
          //   this.$Message.info('点击了确定');
          // },
          // onCancel: () => {
          //   this.$Message.info('点击了取消');
          // }
        });
      },


      getNotReadCommentNoticeTotal(params) {
        console.log("开始")
        axios.get('/api/notice/noticeTotal',{params})
          .then((response) => {

            if (response.data.status === 200) {
              this.notReadCommentNoticeTotal = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },


      getNotReadLeaveMsgNoticeTotal(params) {
        console.log("开始")
        axios.get('/api/notice/noticeTotal',{params})
          .then((response) => {

            if (response.data.status === 200) {
              this.notReadLeaveMsgNoticeTotal = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },
      getNotReadSystemNoticeTotal(params) {
        console.log("开始")
        axios.get('/api/notice/noticeTotal',{params})
          .then((response) => {

            if (response.data.status === 200) {
              this.notReadSystemNoticeTotal = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },


      listCommentNotice(params) {
        console.log("开始")
        axios.get('/api/notice/noticeList',{params})
          .then((response) => {

            if (response.data.status === 200) {
              this.commentNoticeList = response.data.data.commentNotice;
              this.leaveMsgNoticeList = response.data.data.leaveMsgNotice;
              this.systemNoticeList = response.data.data.systemNotice;
              this.commentNoticeTotal = response.data.data.total;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },


      listLeaveMsgNotice(params) {
        console.log("开始")
        axios.get('/api/notice/noticeList',{params})
          .then((response) => {

            if (response.data.status === 200) {
              this.commentNoticeList = response.data.data.rows;
              this.commentNoticeTotal = response.data.data.total;
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },

      setArticleRead(noticeId) {
        console.log("开始")
        axios.get('/api/notice/setRead',{
          params: {
            'id':noticeId,
          }
        })
          .then((response) => {

            if (response.data.status === 200) {
              this.getNotReadCommentNoticeTotal(this.noticeFilter);
              this.listCommentNotice(this.noticeFilter);

            }
          })
          .catch(function (error) {
            console.log(error);
          })
        // 更新登录名
        this.loginUserName = window.localStorage.getItem("userName");
        this.loginUserIcon = window.localStorage.getItem("userIcon");
        console.log("结束")
      },


      systemMessage(){

        const title = '系统通知';
        const content = '<p>appogg提醒您：</p><p>你好啊，交个盆友啊</p>';
        this.$Modal.info({
          title: title,
          content: content,
          // onOk: () => {
          //   this.$Message.info('点击了确定');
          // },
          // onCancel: () => {
          //   this.$Message.info('点击了取消');
          // }
        });
      },

    },
    created() {

      this.noticeFilter.id = window.localStorage.getItem("userId")
      this.getNotReadCommentNoticeTotal(this.noticeFilter);
      this.getNotReadLeaveMsgNoticeTotal(this.leaveMessageNotice);
      this.getNotReadSystemNoticeTotal(this.SystemNotice);
      this.listCommentNotice(this.noticeFilter);


    }
  }
</script>

