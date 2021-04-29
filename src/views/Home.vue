<template>
  <div class="home">
    <span>全部工具</span>
    <el-divider class="hr"></el-divider>
    <div class="center" v-for="(item, index) in content" :key="index">
      <div class="title">
        <el-tag effect="dark">{{item.tag}}</el-tag>
      </div>
      <div class="content">
        <router-link tag="span" :to="{path:l_item.path}"  v-for="(l_item, l_index) in item.li" :key="l_index">{{l_item.li_content}}</router-link>
      </div>
    </div>

     <div class="center">
      <div class="title">
        <el-tag effect="dark">算法工具</el-tag>
      </div>
      <div class="content">
        <router-link tag="span" :to="{path:'/MD5'}">MD5算法</router-link>
        <router-link tag="span" :to="{path:'/test',query:{id:item.id}}" v-for="(item,index) in add" :key="index">{{item.jarName}}</router-link>
        <el-button type="primary" circle  icon="el-icon-plus" @click="toAdd"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      content: [
        {
          tag: "转换工具",
          li: [
            {
              li_content: "进制转换器",
              path:'/ChangeNumber'
            },
            {
              li_content: "阳历阴历转换器",
              path:'/ChangeTime'
            },
            {
              li_content: "图片转换器",
              path:'/ChangePicture'
            }
          ]
        },
        {
          tag: "便民工具",
          li: [
            {
              li_content: "地图",
              path:'/Map'
            },
            {
              li_content: "翻译",
              path:'/Trans'
            },
            {
              li_content: "天气查询",
              path:'/Weather'
            }
          ]
        },
        // {
        //   tag: "算法工具",
        //   li: [
        //     {
        //       li_content: "MD5算法",
        //       path:'/MD5'
        //     }
        //   ]
        // }
      ],
      add:[]
    };
  },
  mounted(){
    let a={
      description: ""
    }
    axios({
      // url:"/api3/jarpath/query",
      url:"http://zengyuebaba.eicp.vip/jarpath/query",
      method:"POST",
      headers:{
        'token':'464a206e89ebe385267a7089240afb9a',
        "Content-Type": "application/json"
      },
      data:a
    }).then(res=>{
      let a=res.data.data
      a.shift()
      this.add=a
    }).catch(err=>{
      console.error(err)
    })
  },
  methods:{
    toAdd(){
      this.$router.push('/add') 
    }
  }
};
</script>

<style scoped>
.home {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-size: 1em;
}
.home>span{  
  float: left;
  margin: 15px 25px;
  font-size: 2em !important;
  width: 240px;
  height: 35px;
  line-height: 35px;
  text-align: left;
}
.hr{
  margin: 10px 0 !important;
}
.center {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
.title span {
  float: left;
  margin: 15px 25px;
  font-size: 1em !important;
  width: 240px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.content {
  flex-direction: row;
  flex-wrap: wrap;
}
.content span {
  width: 16%;
  margin: 15px 25px;
  float: left;
  text-align: left;
  cursor: pointer;
}
</style>
