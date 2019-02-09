<template>



  <Form style="text-align: left" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="width:70%;text-align: left;margin-right: 20px;">
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　2018-12-11 21:34　</span>
          <Icon type="ios-chatbubbles" />32
        </div>
        <div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="articleDtails">写给 iVi信写给 iView 开发者的一封信写给 iView 开发者的一封信</span>
        </div>
        <div>
          <img style="position:absolute;right: 40px;top:40px; width:120px;height: 80px;" src="../../assets/logo.png">
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　2018-12-11 21:34　</span>
          <Icon type="ios-chatbubbles" />32
        </div>
        <div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="articleDtails">写给 iVi信写给 iView 开发者的一封信写给 iView 开发者的一封信</span>
        </div>
        <div>
          <img style="position:absolute;right: 40px;top:40px; width:120px;height: 80px;" src="../../assets/logo.png">
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　2018-12-11 21:34　</span>
          <Icon type="ios-chatbubbles" />32
        </div>
        <div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="articleDtails">写给 iVi信写给 iView 开发者的一封信写给 iView 开发者的一封信</span>
        </div>
        <div>
          <img style="position:absolute;right: 40px;top:40px; width:120px;height: 80px;" src="../../assets/logo.png">
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>
      </Card>
      <Card style="width:100%;float: left;margin-bottom: 20px;" :dis-hover="true" >
        <div>
          <img style="width:40px;height:40px;margin-right: 10px;" src="../../assets/article/avatar.jpg">
          <span>Aresn</span>
          <img style="width: 20px;height: 20px;" src="../../assets/article/iconfinder-icon.svg">
          <span>　2018-12-11 21:34　</span>
          <Icon type="ios-chatbubbles" />32
        </div>
        <div style="width: 76%;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden;">
          <span style="line-height: 40px;cursor: pointer;font-size: 18px;" @click="articleDtails">写给 iVi信写给 iView 开发者的一封信写给 iView 开 iVi信写给 iView 开发者的一封信写给 iView 开发者的一封信</span>
        </div>
        <div>
          <img style="position:absolute;right: 40px;top:40px; width:120px;height: 80px;" src="../../assets/logo.png">
        </div>
        <div style="width: 100%;float: left;margin:10px;">
          <Tag color="cyan">java</Tag>
          <Tag color="cyan">c语言</Tag>
          <Tag color="cyan">python</Tag>
          <Tag color="cyan">spring</Tag>
          <Tag color="cyan">编程</Tag>
        </div>
      </Card>
      <Page style="text-align: center" :total="29" show-total show-elevator />
    </FormItem>

    <FormItem style="position: relative;left: 10px;width:24%;">
      <div style="width: 100%;">

        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">平台</p>
          <RadioGroup v-model="articleListType">
            <Radio label="all">
              <span>全部</span>
            </Radio>
            <Radio label="android">
              <span>安卓</span>
            </Radio>
            <Radio label="iphone">
              <span>苹果</span>
            </Radio>
            <Radio label="windows">
              <span>windows</span>
            </Radio>
            <Radio label="linux">
              <span>linux</span>
            </Radio>
            <Radio label="mac">
              <span>mac</span>
            </Radio>
            <Radio label="other">
              <span>其他</span>
            </Radio>
          </RadioGroup>
        </Card>

        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">分类</p>
          <a slot="extra">换一批</a>
          <CheckboxGroup  v-model="articleListType1">
            <Checkbox  label="all1">
              <span>实用</span>
            </Checkbox >
            <Checkbox  label="android1">
              <span>好用的工具</span>
            </Checkbox >
            <Checkbox  label="iphone1">
              <span>破解</span>
            </Checkbox >
            <Checkbox  label="windows1">
              <span>阅读</span>
            </Checkbox >
            <Checkbox  label="linux1">
              <span>视频</span>
            </Checkbox >
            <Checkbox  label="mac1">
              <span>音乐</span>
            </Checkbox >
            <Checkbox  label="other1">
              <span>其他1</span>
            </Checkbox >
            <Checkbox  label="other2">
              <span>其他2</span>
            </Checkbox >
          </CheckboxGroup>
        </Card>
        <Card :bordered="true" :dis-hover="true" style="width:100%;margin-bottom: 10px;">
          <p slot="title">最新发布</p>
          <ul style="list-style:none;">
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iV 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开发者的一封信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
            <li style="margin-bottom: 4px;"><Icon type="ios-book-outline" /> <a>写给 iView 开信</a><Tag color="volcano" style="margin-left: 10px;">2018-07-21</Tag></li>
          </ul>
        </Card>

        <Button style="width:100%;margin-bottom: 10px;" type="primary" @click="articlePush"><Icon type="ios-create-outline"/> 发布软件</Button>
      </div>

    </FormItem>


  </Form>




</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data () {
      return {

        articleListType:"all",
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        http:Httpservice.getAxios,
        listdata:[],
        theme1: 'light',
        movieList: [
          {
            name: 'The Shawshank Redemption',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 9.6
          },
          {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
          },
          {
            name: 'Farewell to My Concubine',
            url: 'https://movie.douban.com/subject/1291546/',
            rate: 9.5
          },
          {
            name: 'Forrest Gump',
            url: 'https://movie.douban.com/subject/1292720/',
            rate: 9.4
          },
          {
            name: 'Life Is Beautiful',
            url: 'https://movie.douban.com/subject/1292063/',
            rate: 9.5
          },
          {
            name: 'Spirited Away',
            url: 'https://movie.douban.com/subject/1291561/',
            rate: 9.2
          },
          {
            name: 'Schindlers List',
            url: 'https://movie.douban.com/subject/1295124/',
            rate: 9.4
          },
          {
            name: 'The Legend of 1900',
            url: 'https://movie.douban.com/subject/1292001/',
            rate: 9.2
          },
          {
            name: 'WALL·E',
            url: 'https://movie.douban.com/subject/2131459/',
            rate: 9.3
          },
          {
            name: 'Inception',
            url: 'https://movie.douban.com/subject/3541415/',
            rate: 9.2
          }
        ],
        randomMovieList: [],
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      getData() {
        console.log("开始")


        axios.get('/api/hello/say')
          .then((response) => {
            console.log(1)
            console.log(response.data.data,"hahahahahaha",response.data.status);


            if(response.data.status === 200){
              console.log("yes")
              this.listdata = response.data.data
              console.log(this.listdata,"1111111111111")
            } else {
              console.log("no")

              this.listdata = []
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log("结束")
      },

      changeLimit () {
        function getArrayItems(arr, num) {
          const temp_array = [];
          for (let index in arr) {
            temp_array.push(arr[index]);
          }
          const return_array = [];
          for (let i = 0; i<num; i++) {
            if (temp_array.length>0) {
              const arrIndex = Math.floor(Math.random()*temp_array.length);
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
      articleDtails(){
        this.$router.push('/articleDetails')
      },
      articlePush(){
        this.$router.push('/articlePush')
      },
      go(){
        this.$router.push('/test')
      },
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

