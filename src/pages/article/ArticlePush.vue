<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form :model="formItem" :label-width="80">

      <h2 style="margin-bottom: 30px;">发布文章</h2>

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
          <img :src="articleTitleImage">
        </div>


      </FormItem>




      <FormItem label="文章标题">
        <Input v-model="articleMsg.articleTitleName" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="文章权限">
        <RadioGroup v-model="articleMsg.articleAuthId" style="float: left">
          <Radio label="0">公共</Radio>
          <Radio label="1">仅自己可见</Radio>
        </RadioGroup>
        <a style="position: absolute;right: 10px;">设置好友可见</a>
      </FormItem>
      <FormItem label="文章分类">
        <CheckboxGroup v-model="articleMsg.articleClassifyGroup" style="float: left">
          <Checkbox label="java"></Checkbox>
          <Checkbox label="编程"></Checkbox>
          <Checkbox label="生活"></Checkbox>
          <Checkbox label="python"></Checkbox>
        </CheckboxGroup>
        <a style="position: absolute;right: 10px;">添加分类</a>
      </FormItem>
      <FormItem label="文章概述">
        <Input v-model="articleMsg.articleSummary" type="textarea" :maxlength="200" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="输入文章概述(最多200个汉字)..."></Input>
      </FormItem>


      <FormItem label="文章内容">

        <div>
          <div ref="editor" style="text-align:left"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>


      <FormItem>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="submitArticleMsg">发布</Button>

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
        articleTitleImage:'',
        visible: false,
        uploadList: [],

        spinShow:false,
        editor: {},

        articleMsg: {
          articleTitleIcon: "https://avatars1.githubusercontent.com/u/32634412?s=400&v=4",
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
      getContent: function () {
        alert(this.editorContent)
      },
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div',   [
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

      submitArticleMsg(){
        this.handleSpinCustom()
        // this.spinShow = true
        axios.post('/api/article/add', this.articleMsg)
          .then((response) => {
            if(response.data.status === 200){
              // this.spinShow = false
              this.$Spin.hide();
              this.$router.push('/articleIndex')
            }

            console.log("add...article:" , response)
          })
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
      }


    },
    mounted() {
      this.editor = new E(this.$refs.editor)

      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.articleMsg.articleContent = html
      }


      this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 一张图片最大1MB
      this.editor.customConfig.uploadImgMaxLength = 1; // 限一次只能上传1张
      this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
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
