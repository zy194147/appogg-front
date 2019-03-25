<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form ref="needMsg" :model="needMsg" :label-width="80" :rules="ruleValidate">

      <h2 style="margin-bottom: 30px;">发布需求</h2>

      <FormItem label="需求标题" prop="needTitleName">
        <Input v-model.trim="needMsg.needTitleName" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="需求分类" prop="needClassifyGroup">
        <CheckboxGroup v-model.trim="needMsg.needClassifyGroup" style="float: left">

          <Checkbox v-for="classify in softClassifyList" :label="classify.classifyName">
            <span>{{classify.classifyName}}</span>
          </Checkbox>

          <!--<Checkbox label="java资料"></Checkbox>-->
          <!--<Checkbox label="求软件"></Checkbox>-->
          <!--<Checkbox label="破解技能"></Checkbox>-->
          <!--<Checkbox label="软件使用技巧"></Checkbox>-->
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


      <FormItem label="需求简介" prop="needContent">

        <div>
          <div ref="editor" style="text-align:left"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>


      <FormItem>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary" :loading="submitNeedLoading" @click="submitNeedMsg('needMsg')">
          <span v-if="!submitNeedLoading">发布</span>
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

        addClassifyLoading:false,

        submitNeedLoading:false,

        addModal:false,

        softClassifyList:[],
        listClassifyType:{
          classifyType:"need"
        },
        classifyAddMsg:{
          classifyType:"need",
          classifyName:""
        },

        ruleValidate: {
          needTitleName: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          needClassifyGroup: [
            {required: true, type: 'array', min: 1, message: '请选择软件分类', trigger: 'change'},
          ],
          needContent: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
        },

        spinShow: false,
        editor: {},

        needMsg: {
          needTitleName: "",
          needAuthId: "",
          needClassifyGroup: [],
          needContent: ""
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

      addData() {
        this.addModal = true;
      },
      cancel() {
        this.addModal = false;
      },


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



      getContent: function () {
        alert(this.editorContent)
      },
      handleSpinCustom() {
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

      submitNeedMsg(needMsg) {
        this.submitNeedLoading = true

        this.$refs[needMsg].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');

            this.handleSpinCustom()
            // this.spinShow = true
            axios.post('/api/need/add', this.needMsg)
              .then((response) => {
                if (response.data.status === 200) {
                  // this.spinShow = false
                  this.$Spin.hide();
                  this.$router.push('/need')
                }

                console.log("add...need:", response)
              })
          } else {
            this.$Message.error('请填写完整');
          }
        })
        this.submitNeedLoading = false
      },


      getClassifyData(params){

        this.$http.get('/api/classify/list', {params})
          .then((response) => {
            if (response.data.status === 200) {

              this.softClassifyList = response.data.data
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
    mounted() {

      this.getClassifyData(this.listClassifyType)

      this.editor = new E(this.$refs.editor)

      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.needMsg.needContent = html
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
      this.getEditorContent();
    }
  }
</script>

<style scoped>
</style>
