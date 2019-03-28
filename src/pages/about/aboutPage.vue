<template>



  <Form style="background-color: #ffffff;" ref="formInline" :model="formInline" :rules="ruleInline" inline>

    <FormItem style="background-color: aqua;width: 100%;">
      <Card style="width:100%;float: left" :bordered="true" :dis-hover="true" >
        <p  style="font-size: 20px;">
          关于我们——appogg
        </p>
        <Divider />

        <div style="text-align: left">


        <p><strong>
          <span style="font-size:18px">一、我们是谁</span>
        </strong>
        </p>
        <p>appogg(www.appogg.com)显然是一个网站，仅仅用于向大家
          <strong>推荐软件</strong>
          的网站，我们则作为搬运工向大家搬运好用的软件，包括小众但是很使用的的软件，
          当然，我们也会向大家推荐网友破解的软件、游戏等，
          如果你在这里发现任何侵害了你利益的东西，请联系我们处理。
          推荐的软件我们会以系统区分，你可以以系统方式筛选出你需要的软件，
          我们会陆续加入以软件的功能和类别等方式区分。
          软件的下载将使用网盘的方式，一律免费。</p>
        <p><br/></p><p>
        <strong><span style="font-size:18px">二、我们的愿景</span></strong>
      </p>
        <p><span style="font-size:16px">我们希望打造一个和谐的、乐于分享的环境。</span>
        </p>
        <p><span style="font-size:18px"><br/></span></p>
        <p><strong><span style="font-size:18px">三、你能得到什么</span></strong>
        </p><p><span style="font-size:16px">
        在这里你能得到很多大家分享出来的软件，
        你也可以加入分享软件的队伍中，分享你觉得好用的工具。
      </span></p><p><span style="font-size:16px"><br/></span></p>
        <p><span style="font-size:16px"><br/></span></p>
        <p><span style="font-size:16px"><br/></span>
        </p>

        </div>
      </Card>
    </FormItem>


  </Form>




</template>
<script>

  import axios from 'axios'
  import Httpservice from '@/router/service'

  export default {
    data () {
      return {
        http:Httpservice.getAxios,
        listdata:[],
        theme1: 'light',

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
      go(){
        this.$router.push('/test')
      }
    },

    signup(){
      this.$router.push('/signup')
    },
    created() {

      this.getData();
      this.changeLimit();
    }
  }
</script>

