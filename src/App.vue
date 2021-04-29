<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-menu :default-active="activeIndex" class="Navmenu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router
    >
      <el-menu-item index="5">
        <a href="https://www.ele.me" target="_blank">关于&合作</a>
      </el-menu-item>

      <el-submenu index="4">
        <template slot="title">算法工具</template>
        <el-menu-item index="/MD5">MD5算法</el-menu-item>
        <el-menu-item index="/Test" :route="{path: '/Test',query:{id:item.id}}" v-for="(item,index) of add" :key="index">{{item.jarName}}</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">便民工具</template>
        <el-menu-item index="/Map">地图</el-menu-item>
        <el-menu-item index="/Trans">翻译</el-menu-item>
        <el-menu-item index="/Weather">天气查询</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">转换工具</template>
        <el-menu-item index="/ChangeNumber">进制转换器</el-menu-item>
        <el-menu-item index="/ChangeTime">阴阳历转换器</el-menu-item>
        <el-menu-item index="/ChangePicture">图片转换器</el-menu-item>
      </el-submenu>

      <el-menu-item index="/"> 全部工具 </el-menu-item>

      <el-select
        v-model="input"
        filterable
        placeholder="请输入关键词"
        class="Navinput"
        :filter-method="search"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click.native="to(item.value)"
        >
        </el-option>
      </el-select>

      <el-avatar
        shape="square"
        size="large"
        :src="squareUrl"
        class="Navavatar"
      ></el-avatar>
    </el-menu>

    <!-- 内容框 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      input: "",
      arr: [
        {
          label:"进制转换器",
          value:"/ChangeNumber"
        },{
          label:"阴阳历转换器",
          value:"/ChangeTime"
        },{
          label:"图片转换器",
          value:"/ChangePicture"
        },{
          label:"地图",
          value:"/Map"
        },{
          label:"翻译",
          value:"/Trans"
        },{
          label:"天气查询",
          value:"/Weather"
        },{
          label:"MD5算法",
          value:"/MD5"
        }
      ],
      loading: false,
      options: [],
      list: [],
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
      for(let i of a){
        this.add.push(i)
      }
    }).catch(err=>{
      console.error(err)
    })
  },
  computed:{
    ...Vuex.mapState(['activeIndex'])
  },
  methods: {
    search(key) {
      if (key == "") {
        return;
      }
      let a = [];
      this.arr.filter((item) => {
        if (item.label.includes(key.toUpperCase())) {
          a.push({
            value:item.value,
            label:item.label
          })
        }
      });
      this.options=a;
    },
    to(e){
      this.$router.push(e)
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  min-width: 1024px;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  min-width: 1024px !important;
}
.Navmenu {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
.Navinput {
  margin: auto;
  width: 40% !important;
}
.Navavatar {
  margin: auto;
}
</style>
