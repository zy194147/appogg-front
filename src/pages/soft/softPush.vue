<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form :model="formItem" :label-width="80">

      <h2 style="margin-bottom: 30px;">发布软件</h2>

      <FormItem label="标题图片">

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
            action="/api/article/uploadTitleImage">
            <div>
              <Icon type="ios-cloud-upload" size="32" style="color: #3399ff"></Icon>
              <p>点我上传文章标题图片</p>
            </div>
          </Upload>
        </div>
        <div>
          <img :src="softTitleImage">
        </div>


      </FormItem>


      <FormItem label="文章标题">
        <Input v-model="softMsg.softTitleName" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="软件分类">
        <CheckboxGroup v-model="softMsg.softClassifyGroup" style="float: left">
          <!--<div v-for="classify in softClassifyList">-->
            <Checkbox v-for="classify in softClassifyList" :label="classify.id">
              <span>{{classify.classifyName}}</span>
            </Checkbox>
          <!--</div>-->
        </CheckboxGroup>
        <a style="position: absolute;right: 10px;" @click="addData">添加分类</a>
      </FormItem>

      <FormItem label="系统平台">
        <RadioGroup v-model="softMsg.softSystemPlatform" style="float: left">
          <Radio label="安卓">安卓</Radio>
          <Radio label="苹果">苹果</Radio>
          <Radio label="windows">windows</Radio>
          <Radio label="mac">mac</Radio>
          <Radio label="linux">linux</Radio>
          <Radio label="其他">其他</Radio>
        </RadioGroup>
      </FormItem>


      <Modal v-model="addModal" title="添加分类" @on-cancel="cancel" >
        <Form>

          <!--<div style="width: 100%;">-->
          <!--<Input style="width: 100%;margin-bottom: 20px;" v-model="commentContentMsg" type="textarea"-->
          <!--:autosize="{minRows: 3,maxRows: 7}" :rows="4" placeholder="输入评论内容..."/>-->
          <!--</div>-->
          <FormItem :label-width="80" label="名称">
            <Input v-model="classifyAddMsg.classifyName" placeholder="请输入分类名称"></Input>
          </FormItem>

          <Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>
        </Form>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button @click="confirm" type="primary">保存</Button>
        </div>
      </Modal>


      <FormItem label="文章内容">

        <div>
          <div ref="editor" style="text-align:left"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>

      <FormItem label="下载地址">

        <Input v-model="softMsg.softDownloadAddr" placeholder="http://...(多个地址使用英文分号隔开)"/>
      </FormItem>


      <FormItem>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="submitsoftMsg">发布</Button>

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

        softClassifyList:[],
        listClassifyType:{
          classifyType:"soft"
        },
        classifyAddMsg:{
          classifyType:"soft",
          classifyName:""
        },

        removeModal: false,
        addModal: false,


        spinShow: false,
        editor: {},

        visible: false,
        uploadList: [],

        softTitleImage: '',

        softMsg: {
          softTitleIcon: "",
          softTitleName: "",
          softSystemPlatform: "",
          softClassifyGroup: [],
          softSummary: "",
          softContent: "",
          softDownloadAddr: "",
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


        // this.addDictType();
      },






      getContent: function () {
        alert(this.editorContent)
      },
      handleSpinCustom() {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', '文章发布中')
            ])
          }
        });
        // setTimeout(() => {
        //   this.$Spin.hide();
        // }, 3000);
      },

      submitsoftMsg() {
        this.handleSpinCustom()
        // this.spinShow = true
        this.softMsg.softTitleIcon = this.softTitleImage
        axios.post('/api/soft/add', this.softMsg)
          .then((response) => {
            if (response.data.status === 200) {
              // this.spinShow = false
              this.$Spin.hide();
              this.$router.push('/soft')
            }

            console.log("add...soft:", response)
          })
      },


      //图片上传
      handleView(name) {
        this.softTitleImage = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        console.log(res.data)
        console.log(file)
        this.softTitleImage = res.data
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



      getClassifyData(params){

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
    mounted() {

      this.getClassifyData(this.listClassifyType)


      this.editor = new E(this.$refs.editor)

      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.softMsg.softContent = html
      }


      this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 一张图片最大1MB
      this.editor.customConfig.uploadImgMaxLength = 1; // 限一次只能上传1张
      this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      // 自定义颜色失败。。
      this.editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
      ];
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
