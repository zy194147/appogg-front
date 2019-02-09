<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form :model="formItem" :label-width="80">
      <h2 style="margin-bottom: 30px;">发布需求</h2>

      <FormItem label="需求标题">
        <Input v-model="formItem.input" placeholder="输入需求标题(最多80个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="是否匿名" >
        <RadioGroup v-model="formItem.radio" style="float: left">
          <Radio label="female">是</Radio>
          <Radio label="male">否</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="需求描述">

        <div>
          <div ref="editor" style="text-align:left"></div>
          <!--<button v-on:click="getContent">查看内容</button>-->
        </div>
      </FormItem>





      <FormItem>
        <Button style="margin-left: 8px">取消</Button>
        <Button type="primary">发布</Button>

      </FormItem>
    </Form>








  </div>




</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data () {
      return {
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
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }

      editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 一张图片最大1MB
      editor.customConfig.uploadImgMaxLength = 1; // 限一次只能上传1张
      editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      // 普通的自定义菜单
      editor.customConfig.menus = [

        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        // "fontName", // 字体
        // "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        // "foreColor", // 文字颜色
        // "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        // "justify", // 对齐方式
        "quote", // 引用
        // 'emoticon',  // 表情
        "image", // 插入图片
        // "table", // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      editor.create()
    }
  }
</script>

<style scoped>
</style>
