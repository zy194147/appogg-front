<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form :model="formItem" :label-width="80">

      <h2 style="margin-bottom: 30px;">发布需求</h2>

      <FormItem label="需求标题">
        <Input v-model="needMsg.needTitleName" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="需求分类">
        <CheckboxGroup v-model="needMsg.needClassifyGroup" style="float: left">
          <Checkbox label="java资料"></Checkbox>
          <Checkbox label="求软件"></Checkbox>
          <Checkbox label="破解技能"></Checkbox>
          <Checkbox label="软件使用技巧"></Checkbox>
        </CheckboxGroup>
        <a style="position: absolute;right: 10px;">添加分类</a>
      </FormItem>


      <FormItem label="需求简介">

        <div>
          <div ref="editor" style="text-align:left"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>


      <FormItem>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="submitNeedMsg">发布</Button>

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
        spinShow:false,
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

      submitNeedMsg(){
        this.handleSpinCustom()
        // this.spinShow = true
        axios.post('/api/need/add', this.needMsg)
          .then((response) => {
            if(response.data.status === 200){
              // this.spinShow = false
              this.$Spin.hide();
              this.$router.push('/needIndex')
            }

            console.log("add...need:" , response)
          })
      },
    },
    mounted() {
      this.editor = new E(this.$refs.editor)

      // 获取编辑器内容
      this.editor.customConfig.onchange = (html) => {
        this.needMsg.needContent = html
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
