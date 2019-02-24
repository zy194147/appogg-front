
<template>
  <div class="main-container admin-product">
    <div class="main-list-content" style="width:90%;margin:20px 60px">
      <div class="table-list product-list">
        <div v-model="articleMsg" class="box-content">
          <div style="text-align: center">
            <h1 style="height:60px;">动态发布</h1>
          </div>
          <template>
            <Input
              v-model="articleMsg.title"
              size="large"
              placeholder="请输入标题（最多50字）"
              style="height:50px;line-height:50px;width: 100%"
              minlength="inputMinlength"
              :maxlength="inputMaxlength"
              @on-change="titleOnChange"
              :rules="{ required: true, type: 'string', trigger: 'change', message: '标题不能为空'}"
            />
          </template>
          <template>
            <Cascader
              :disabled="editDisable"
              :data="dataList"
              v-model="articleMsg.categoryId"
              change-on-select
              placeholder="选择栏目分类"
              trigger="hover"
              style="height:70px;line-height:50px;width: 100%"
            ></Cascader>
          </template>
          <template>
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
                  <p v-if="isEditState">修改题图</p>
                  <p v-else>添加题图</p>
                </div>
              </Upload>
            </div>
            <Modal title="View Image" v-model="visible">
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible">
            </Modal>
          </template>
          <template>
            <div v-model="articleMsg.content" id="editContent" style="text-align:left"></div>
          </template>
          <div style="margin-top:20px; margin-bottom: 40px;text-align: center">
            <Button type="primary" @click="cancelAdd">取消</Button>
            <Button type="primary" @click="addData">发布</Button>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="addModal" :title="proTitle" @on-cancel="cancel">
      <Form :model="addInfo" ref="addInfo">
        <Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button @click="confirm" type="primary">保存</Button>
      </div>
    </Modal>
    <Modal title="发布动态" v-model="removeModal">
      <Alert type="warning" show-icon>确认提交发布？</Alert>
      <div slot="footer">
        <!--<Button @click="addArticle" type="primary">确定</Button>-->
        <Button type="primary" :loading="loading2" @click="toLoading2">
          <span v-if="!loading2">确认</span>
          <span v-else>正在发布...</span>
        </Button>
        <Button @click="deleteCancel">取消</Button>
      </div>

      <Alert type="warning" show-icon v-if="errorMsg">{{errorMsg}}</Alert>
    </Modal>
  </div>
</template>
<script>
  import _ from "lodash";
  import axios from "axios";
  import E from "wangeditor";
  import {
    addCatgArticle,
    deleteCategoryType,
    getAllEnableCategoryType,
    updatetArticleMsg
  } from "../../models/service";
  import Paging from "../../components/page/paging";

  export default {
    name: "monitorGroup",
    components: {
      Paging
    },
    data() {
      return {
        isEditState: false,
        articleId: 1,
        title: "",
        // content:'',
        publishDateTime: "",
        orgDepartment: "",
        department: "",
        username: "",
        inputMaxlength: 50,
        inputMinlength: 1,
        imgName: "",
        editor: {},
        visible: false,
        uploadList: [],
        hasImg: false,
        defaultList: [],
        editorContent: "",
        format: ["jpg", "jpeg", "png"],
        articleMsg: {
          icon: "",
          title: "",
          categoryId: "",
          id: "",
          content: ""
        },
        props: {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: true,
          treeType: true,
          isFold: true,
          expandType: false,
          selectable: true,
          selectionType: false
        },
        dataList: [], // 表格数据,主机列表
        filter: {
          limit: 20,
          page: 1
        },
        editDisable: false,
        loading: true,
        loading2: false,
        total: 0, // 总数
        selectedData: [], // 选中数据
        searchName: "", // 搜索名称
        deleteShowData: [],
        removeModal: false,
        addModal: false,
        // 添加产品线信息
        searchFormItem: {
          name: "",
          sex: "",
          mobilePhone: ""
        },
        addInfo: {
          categoryName: "",
          isEnable: "",
          sort: "",
          submitAccountName: "",
          orgId: "",
          path: "",
          id: "",
          parentId: []
        },
        errorMsg: "", // 错误信息
        isEdit: false // 是否是编辑
      };
    },
    computed: {
      uploadImage() {
        return "//lg.sw.gz.cegn.cn/api/lg/v2/file/upload_file";
      },
      proTitle() {
        if (this.hasImg) return "修改题图";
        return "添加题图";
      },
      tableHeight() {
        if (this.dataList.length) {
          if (this.dataList.length > 10) {
            return 520;
          }
          return 40 + this.dataList.length * 48;
        }
        return 88;
      },
      disableObj() {
        // 操作可执行
        if (this.selectedData.length) {
          return {
            isRemove: true
          };
        }
        return {
          isRemove: false
        };
      },
      listIsEnable() {
        if (this.addProInfo.isEnable) return "启用";
        return "禁用";
      }
    },
    methods: {
      titleOnChange(event) {
        console.log("------titleOnChange-------event:" + event);
      },

      toLoading2() {
        // alert("更新：" + this.articleMsg.content);
        this.getEdirtorContent();
        this.loading2 = true;
        this.confirm();
        this.loading2 = false;

        // this.addArticle();
      },
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        this.hasImg = false;
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        this.hasImg = true;
        // file.url = 'http://huizhi-lg.oss-intranet.gzdata.gov.cn/cms/6b9ca5fc261146079e08916c85fc0b8b.jpg';
        file.url = res.data;
        this.articleMsg.icon = file.url;
        file.name = file.url;
        this.$Notice.success({
          title: "图片上传成功",
          desc: file.name + " 图片上传成功"
        });
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式错误",
          desc: "文件 " + file.name + " 格式错误, 请选择 jpg 或 png格式的图片"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "图片尺寸过大",
          desc: "图片" + file.name + " 太大了, 不能超过 2MB 。"
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: "只能上传一张图片"
          });
        }
        return check;
      },
      getContent: function() {},
      cancelAdd() {
        this.$router.push({
          name: "admin_article-list"
        });
      },
      addData() {
        // this.editDisable = false;
        this.removeModal = true;
        this.articleMsg.content = this.editorContent;
      },
      // 编辑产品线
      editData(obj) {
        this.editDisable = true;
        this.isEdit = true;
        this.errorMsg = "";
        this.addModal = true;
        this.addInfo.id = obj.id;
        this.addInfo.categoryName = obj.categoryName;
        this.addInfo.sort = obj.sort;
        this.addInfo.isEnable = obj.isEnable;
      },
      getAddBirthday: function(date) {
        this.addProInfo.birthday = date;
      },
      getSearchTime: function(date) {
        this.searchFormItem.birthday = date;
      },
      confirm() {
        if (this.isEditState) {
          this.updateMenu();
        } else {
          this.addArticle();
        }
      },
      // 添加产品线
      addArticle() {
        const articleTitle = this.articleMsg.title.trim();
        if (articleTitle === "") {
          this.$Notice.warning({
            title: "发布文章失败,文章标题必填"
          });
          return false;
        }
        this.removeModal = false;
        this.errorMsg = "";
        let parentId = 0;
        if (this.articleMsg.categoryId && this.articleMsg.categoryId.length > 0) {
          parentId = this.articleMsg.categoryId[
          this.articleMsg.categoryId.length - 1
            ];
        }
        addCatgArticle({
          icon: this.articleMsg.icon,
          title: this.articleMsg.title,
          categoryId: parentId,
          content: this.articleMsg.content
        }).then(res => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              this.$Message.success("创建成功");
              // 跳转到动态管理页面
              this.$router.push({
                name: "admin_article-list"
              });
            } else {
              this.errorMsg = res.data.message;
            }
          } else {
            this.$Notice.warning({
              title: "发布文章失败,栏目必填"
            });
            this.errorMsg = res.data;
          }
        });
      },
      // 编辑产品线
      updateMenu() {
        // 更新文章信息,其中 文章栏目 不可更新
        updatetArticleMsg({
          id: this.articleMsg.id,
          icon: this.articleMsg.icon,
          title: this.articleMsg.title,
          content: this.articleMsg.content
        }).then(res => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              this.$Message.success("修改成功");
              // this.addModal = false;
              this.removeModal = false;
              this.loading2 = false;
              // 跳转到动态管理页面
              this.$router.push({
                name: "admin_article-list"
              });
            } else {
              this.errorMsg = res.data.message || "该名称已存在";
            }
          } else {
            this.errorMsg = res.data;
          }
        });
        addCatgArticle({
          icon: this.articleMsg.icon,
          title: this.articleMsg.title,
          categoryId: parentId,
          content: this.articleMsg.content
        }).then(res => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              this.$Message.success("创建成功");
              // 跳转到动态管理页面
              this.$router.push({
                name: "admin_article-list"
              });
            } else {
              this.errorMsg = res.data.message;
            }
          } else {
            this.$Notice.warning({
              title: "发布文章失败,栏目必填"
            });
            this.errorMsg = "";
          }
        });
      },
      // 编辑产品线
      updateMenu() {
        const articleTitle = this.articleMsg.title.trim();
        if (articleTitle === "") {
          this.$Notice.warning({
            title: "发布文章失败,文章标题必填"
          });
          return false;
        }
        this.removeModal = false;
        this.errorMsg = "";
        let parentId = 0;
        if (this.articleMsg.categoryId && this.articleMsg.categoryId.length > 0) {
          parentId = this.articleMsg.categoryId[
          this.articleMsg.categoryId.length - 1
            ];
        }
        // 更新文章信,息其中 文章栏目 不可更新
        updatetArticleMsg({
          id: this.articleMsg.id,
          icon: this.articleMsg.icon,
          title: this.articleMsg.title,
          content: this.articleMsg.content
        }).then(res => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              this.$Message.success("修改成功");
              // this.addModal = false;
              this.removeModal = false;
              this.loading2 = false;
              // 跳转到动态管理页面
              this.$router.push({
                name: "admin_article-list"
              });
            } else {
              this.errorMsg = res.data.message || "该名称已存在";
            }
          } else {
            this.errorMsg = res.data;
          }
        });

        this.$refs.addInfo.validate(valid => {
          if (valid) {
          }
        });
      },
      cancel() {
        this.addModal = false;
        this.$refs.addInfo.resetFields();
        this.articleMsg.icon = "";
        this.articleMsg.title = "";
        parentId = "";
        this.articleMsg.content = "";
      },
      // 滚动条复位
      refresh_scroll() {
        window.scrollTo(0, 0);
      },
      // 删除产品线
      removeData(obj) {
        if (obj === "multiple") {
          // 删除多个
          this.deleteShowData = this.selectedData.map(item => {
            const host = Object.assign({}, item);
            return host;
          });
        } else {
          // 删除一个
          this.deleteShowData = [obj];
        }
        this.removeModal = true;
      },
      // 删除产品线确认
      deleteConfirm() {
        this.addMenu();
      },
      // 取消删除
      deleteCancel() {
        this.removeModal = false;
        this.deleteShowData = [];
      },
      // 删除成功
      deleteMenu() {
        if (this.deleteShowData.length > 0) {
          const api = [];
          this.deleteShowData.forEach(item => {
            api.push(
              deleteCategoryType({
                id: item.id
              })
            );
          });
          axios.all(api).then(() => {
            this.selectedData = [];
            this.deleteShowData = [];
            this.initFilter();
            this.removeModal = false;
            this.$Message.success("删除成功");
          });
        }
      },
      // 初始化过滤条件
      initFilter() {
        // this.$refs.page.init();
        this.filter.page = 1;
        this.getData(this.filter);
      },
      // 获取表格内容数据
      getData(params) {
        this.loading = true;
        this.selectedData = [];
        const obj = Object.assign({}, params);
        if (!obj.query) delete obj.query;
        if (!obj.order) delete obj.order;
        getAllEnableCategoryType(obj).then(res => {
          this.loading = false;
          if (res.status === 200) {
            //this.total = res.data.data.total;
            this.dataList = res.data.data;
          } else {
            this.total = 0;
            this.dataList = [];
          }
        });
      },
      pageInfoChange(filter) {
        this.filter.page = filter.page;
        this.filter.limit = filter.limit;
        this.getData(this.filter);
      },
      search: _.debounce(function() {
        // 输入框筛选
        this.filter.page = 1;
        this.$refs.page.init();
        this.getData(Object.assign(this.filter, this.searchFormItem));
      }, 300),
      // 刷新
      reload() {
        this.getData(this.filter);
      },
      getEditData() {
        //如果为编辑状态,则获取值后编辑文章。
        let article = JSON.parse(sessionStorage.getItem("article"));
        if (article != null) {
          this.isEditState = article.isEdit;
          if (this.isEditState === "yes") {
            this.title = article.title;
            this.publishDateTime = article.publishDateTime;
            this.orgDepartment = article.orgDepartment;
            this.department = article.department;
            this.username = article.username;
            this.articleId = article.id;
            this.editDisable = true;
            this.articleMsg.title = this.title;
            this.articleMsg.id = article.id;
            this.articleMsg.icon = article.icon;
            this.content = article.content;
            this.articleMsg.content = article.content;
            document.getElementById("editContent").innerHTML = article.content;
            sessionStorage.removeItem("article");
          } else {
            this.isEditState = "no";
            this.editDisable = false;
          }
        }
      },
      getEditorContent() {
        this.editor.customConfig.onchange = html => {
          this.editorContent = html;
        };
      },
      getEdirtorContent() {
        let data = this.editor.$textElem[0].innerHTML;
        this.articleMsg.content = data;
      }
    },
    mounted() {
      this.getEditData();
      this.editor = new E("#editContent");
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
      this.editor.create();
      this.uploadList = this.$refs.upload.fileList;
      // this.uploadList = this.defaultList;
      this.getData(this.filter);
      this.getEditorContent();
      // 初始化编辑器的内容
      // editor.$txt.html('<p>要初始化的内容</p>');
      // alert( "mounted：" + this.articleMsg.content);
    }
  };
</script>
