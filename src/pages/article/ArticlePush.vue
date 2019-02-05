<template>

  <div style="width: 80%;margin-left: 10%;">

    <Form :model="formItem" :label-width="80">

      <div style="text-align: center; margin: 20px 0 20px 0">
        <img v-if="isEditState" :src="articleMsg.icon" style="width:200px;height:100px;">
        <div
          class="demo-upload-list"
          v-for="item in uploadList"
          style="width:200px;height:100px;background-color:white; margin:0 20px 20px 200px;float: left;"
        >
          <template v-if="item.status === 'finished'">
            <div style="width:200px;height:100px;background-color: lightgrey">
              <img :src="item.url" style="width:200px;height:100px;">
            </div>
            <div class="demo-upload-list-cover">
              <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="format"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"
          :action="uploadImage"
          style="display: inline-block;width:200px;height:100px;margin-bottom: 20px;"
        >
          <div style="width: 200px;height:100px;line-height: 50px;">
            <Icon type="ios-camera" size="20"></Icon>
            <p v-if="isEditState">修改标题图片</p>
            <p v-else>添加标题图片</p>
          </div>
        </Upload>
      </div>



      <FormItem label="文章标题">
        <Input v-model="formItem.input" placeholder="输入文章标题(最多50个汉字)..." :maxlength="50"></Input>
      </FormItem>

      <FormItem label="文章权限" >
        <RadioGroup v-model="formItem.radio" style="float: left">
          <Radio label="male">公共</Radio>
          <Radio label="female">仅自己可见</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="文章分类">
        <CheckboxGroup v-model="formItem.checkbox" style="float: left">
          <Checkbox label="java"></Checkbox>
          <Checkbox label="编程"></Checkbox>
          <Checkbox label="生活"></Checkbox>
          <Checkbox label="python"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="文章概述">
        <Input v-model="formItem.textarea" type="textarea" :maxlength="200" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入文章概述(最多200个汉字)..."></Input>
      </FormItem>







      <FormItem label="文章内容">

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
      editor.create()
    }
  }
</script>

<style scoped>
</style>
