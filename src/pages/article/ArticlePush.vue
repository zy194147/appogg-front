<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form ref="articleMsg" :model="articleMsg" :label-width="80" :rules="ruleValidate">

      <h2 style="margin-bottom: 30px;">发布文章</h2>

      <FormItem label="标题图片" prop="articleTitleIcon">

        <div style="text-align: center; margin: 2px 0 20px 0">

          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="/api/image/upload">
            <div>
              <Icon type="ios-cloud-upload" size="32" style="color: #3399ff"></Icon>
              <p>点我上传文章标题图片</p>
            </div>
          </Upload>
        </div>
        <div>
          <img style="max-height: 300px" :src="articleTitleImage">
        </div>


      </FormItem>




      <FormItem label="文章标题" prop="articleTitleName">
        <Input v-model.trim="articleMsg.articleTitleName" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="文章权限" prop="articleAuthId">
        <RadioGroup v-model.trim="articleMsg.articleAuthId" style="float: left">
          <Radio label="0">公共</Radio>
          <Radio label="1">仅自己可见</Radio>
        </RadioGroup>
        <a style="position: absolute;right: 10px;">设置好友可见</a>
      </FormItem>
      <FormItem label="文章分类" prop="articleClassifyGroup">
        <CheckboxGroup v-model.trim="articleMsg.articleClassifyGroup" style="float: left">

          <Checkbox v-for="classify in softClassifyList" :label="classify.classifyName">
            <span>{{classify.classifyName}}</span>
          </Checkbox>
          <!--<Checkbox label="java"></Checkbox>-->
          <!--<Checkbox label="编程"></Checkbox>-->
          <!--<Checkbox label="生活"></Checkbox>-->
          <!--<Checkbox label="python"></Checkbox>-->
        </CheckboxGroup>
        <a style="position: absolute;right: 10px;" @click="addData">添加分类</a>
      </FormItem>


      <Modal v-model.trim="addModal" title="添加分类" @on-cancel="cancel" >
        <Form>

          <!--<div style="width: 100%;">-->
          <!--<Input style="width: 100%;margin-bottom: 20px;" v-model="commentContentMsg" type="textarea"-->
          <!--:autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入评论内容..."/>-->
          <!--</div>-->
          <FormItem :label-width="80" label="名称">
            <Input v-model.trim="classifyAddMsg.classifyName" placeholder="请输入分类名称"></Input>
          </FormItem>

          <Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>
        </Form>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button @click="confirm" :loading="addClassifyLoading" type="primary">
            <span v-if="!addClassifyLoading">添加</span>
            <span v-else>正在添加...</span>
          </Button>
        </div>
      </Modal>


      <FormItem label="文章概述" prop="articleSummary">
        <Input v-model.trim="articleMsg.articleSummary" type="textarea" :maxlength="200" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="输入文章概述(最多200个汉字)..."></Input>
      </FormItem>


      <FormItem label="文章内容" prop="articleContent">

        <div>
          <div ref="editor" style="text-align:left;background-color: white"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>


      <FormItem>
        <div style="position: fixed;right: 50px;bottom: 100px;">
          <img @click="saveEditMsg('articleMsg')" style="cursor:pointer;" src="../../assets/article/save_article.svg">
        </div>

        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary"  :loading="submitArticleLoading" @click="submitArticleMsg('articleMsg')">

          <span v-if="!submitArticleLoading">发布</span>
          <span v-else>正在发布...</span>
        </Button>

      </FormItem>

      <Spin size="large" fix v-if="spinShow"></Spin>
    </Form>


  </div>


</template>

<script>


  import axios from 'axios'
  import Httpservice from '@/router/service'
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data() {
      return {

        editArticleId:'',
        editArticleUserId:'',
        articleDetail:'',

        submitArticleLoading:false,

        addClassifyLoading:false,


        addModal:false,
        listClassifyType:{
          classifyType:"article"
        },
        classifyAddMsg:{
          classifyType:"article",
          classifyName:""
        },

        softClassifyList:[],


        ruleValidate: {
          articleTitleIcon: [
            { required: true, message: '请选择标题图片', trigger: 'blur' }
          ],
          articleTitleName: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          articleAuthId: [
            { required: true, message: '请选择权限', trigger: 'change' }
          ],
          articleClassifyGroup: [
            { required: true, type: 'array', min: 1, message: '请选择文章分类', trigger: 'change' },
          ],
          articleSummary: [
            { required: true, message: '请输入文章简介', trigger: 'blur' }
          ],
          articleContent: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
        },


        articleTitleImage:'',
        visible: false,
        uploadList: [],

        spinShow:false,
        editor: {},

        articleMsg: {
          id:"",
          articleTitleIcon: "",
          articleTitleName: "",
          articleAuthId: "",
          articleClassifyGroup: [],
          articleSummary: "",
          articleContent: ""
        },

        editorContent: '',

        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    },
    methods: {



      confirm() {

        this.addClassifyLoading = true


        this.$http.post('/api/classify/add', this.classifyAddMsg)
          .then((response) => {
            if (response.data.status === 200) {
              this.$Message.info("添加分类成功")
              this.addModal = false;
              this.getClassifyData(this.listClassifyType)

            }
            console.log("add...soft...comment:", response)
          }).catch(function (error) {
          this.$Message.info('添加分类失败，请稍后再试');
          this.addModal = false;

          console.log(error);
        })
        this.addClassifyLoading = false




        // this.addDictType();
      },


      addData() {
        this.addModal = true;
      },

      cancel() {
        this.addModal = false;
      },

      getContent: function () {
        alert(this.editorContent)
      },
      handleSpinCustom () {
        this.$Spin.show();
        // this.$Spin.show({
        //   render: (h) => {
        //     return h('div',   [
        //       h('Icon', {
        //         'class': 'demo-spin-icon-load',
        //         props: {
        //           type: 'ios-loading',
        //           size: 18
        //         }
        //       }),
        //       h('div', '文章发布中')
        //     ])
        //   }
        // });
        // setTimeout(() => {
        //   this.$Spin.hide();
        // }, 3000);
      },

      saveEditMsg(articleMsg){
        this.submitArticleLoading = true;

        this.articleMsg.articleTitleIcon = this.articleTitleImage
        this.articleMsg.id = this.editArticleId


        this.$refs[articleMsg].validate((valid) => {

          if (valid) {
            this.$Message.success('Success!');

            this.handleSpinCustom()


            // this.spinShow = true
            axios.post('/api/article/save', this.articleMsg)
              .then((response) => {
                if(response.data.status === 200){
                  // this.spinShow = false
                  this.$Spin.hide();
                  // this.$router.push('/article')
                }

                console.log("add...article:" , response)
              })
          } else {
            this.$Message.error('保存失败！');
          }
        })
        this.submitArticleLoading = false;

      },

      submitArticleMsg(articleMsg){
        this.submitArticleLoading = true;

        this.articleMsg.articleTitleIcon = this.articleTitleImage
        this.articleMsg.id = this.editArticleId


        this.$refs[articleMsg].validate((valid) => {

          if (valid) {
            this.$Message.success('Success!');

            this.handleSpinCustom()


            // this.spinShow = true
            axios.post('/api/article/add', this.articleMsg)
              .then((response) => {
                if(response.data.status === 200){
                  // this.spinShow = false
                  this.$Spin.hide();
                  this.$router.push('/article')
                }

                console.log("add...article:" , response)
              })
          } else {
            this.$Message.error('发布失败!');
          }
        })
        this.submitArticleLoading = false;

      },

      //图片上传
      handleView (name) {
        this.articleTitleImage = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        console.log(res.data)
        console.log(file)
        this.articleTitleImage = res.data
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      },



      getClassifyData(params){

        this.$http.get('/api/classify/list', {params})
          .then((response) => {
            if (response.data.status === 200) {

              this.softClassifyList = response.data.data
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },



      getData(articleId) {
        console.log("开始")


        this.$http.get('/api/article/detail', {
          params: {
            'id': articleId
          }
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.articleDetail = response.data.data
              // alert(this.articleDetail+"..")
              this.articleTitleImage = this.articleDetail.articleTitleIcon
              this.articleMsg.articleTitleName = this.articleDetail.articleTitleName
              this.articleMsg.articleAuthId = this.articleDetail.articleAuthId.toString()
              this.articleMsg.articleClassifyGroup = this.articleDetail.articleClassifyGroup
              this.articleMsg.articleSummary = this.articleDetail.articleSummary
              this.articleMsg.articleContent = this.articleDetail.articleContent
              this.editor.txt.html(this.articleDetail.articleContent)

            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },



    },
    mounted() {

      this.editArticleUserId = this.$route.query.articleUserId
      this.editArticleId = this.$route.query.articleId


      this.getData(this.editArticleId);


      this.getClassifyData(this.listClassifyType)


      this.editor = new E(this.$refs.editor)

      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.articleMsg.articleContent = html
      }



      this.editor.customConfig.uploadImgMaxSize = 0.5 * 1024 * 1024; // 一张图片最大0.5MB
      this.editor.customConfig.uploadImgMaxLength = 1; // 限一次只能上传1张
      this.editor.customConfig.uploadImgServer = '/api/image/upload'
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // console.log(result);
          // editor.insert(result)
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          insertImg(result.data)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      // this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      // 普通的自定义菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        // 'emoticon',  // 表情
        "image", // 插入图片
        "table", // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        "undo", // 撤销
        "redo" // 重复


      ];
      this.editor.create()
      // alert(this.articleDetail)
      this.getEditorContent();
    }
  }
</script>

<style scoped>
</style>
