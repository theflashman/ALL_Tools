<template>
  <div class="test">
    <div class="title">{{title}}</div>
    <div class="discri">{{discri}}</div>

    <div class="box">
      <!-- 入参 -->
      <div class="params" >
        <div class="little_box" v-for="(item, index) in params" :key="index">
          <span>{{ item.key }} :</span>
          <el-input
            placeholder="请输入参数"
            v-model="item.value"
            class="input"
          ></el-input>
        </div>
      </div>

      <el-button type="success" round class="button" @click="use">执行算法</el-button>

      <!-- 出参 -->
      <div class="params" >
        <div class="little_box" v-for="(item, index) in results" :key="index">
          <span>{{ item.key }} :</span>
          <el-input
            placeholder="结果为"
            v-model="item.value"
            disabled
            class="input"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      title:"",
      discri:"",
      params: [],
      results: [],
      className:"",
      methodName:""
    };
  },
  mounted(){
    let id=this.$route.query.id;
    let a={
      description:"",
      id:id
    }
    axios({
      // url:"/api3/jarpath/queryById",
      url:"http://zengyuebaba.eicp.vip/jarpath/queryById",
      method:"POST",
      headers:{
        'token':'464a206e89ebe385267a7089240afb9a',
        "Content-Type": "application/json"
      },
      data:a
    }).then(res=>{
      let a=res.data.data;
      this.title=a.jarName;
      this.discri=a.description;
      this.className=a.fullClassName;
      this.methodName=a.methodName
      let p=a.params.split(",");
      let params=[];
      
      for(let i of p){
        params.push({
          key:i,
          value:""
        })
      }
      let r=a.results.split(",");
      let results=[];
      for(let j of r){
        results.push({
          key:j,
          value:""
        })
      }
      this.params=params;
      this.results=results;
    })
    .catch(err=>{
      console.error(err)
    })
  },
  methods:{
    use(){
      for(let n of this.params){
        if(n.value==""){
          ELEMENT.MessageBox.alert("请输入参数");
          return
        }
      }
      // let url="/api3/invoke/"+this.title+"/"+this.className+"/"+this.methodName;
      let url="http://zengyuebaba.eicp.vip/invoke/"+this.title+"/"+this.className+"/"+this.methodName;
      let a={};
      for(let i of this.params){
        a[i.key]=i.value
      }
      console.log(a)
      axios({
        url:url,
        method:"POST",
        headers:{
        'token':'464a206e89ebe385267a7089240afb9a',
        "Content-Type": "application/json"
      },
      data:a
      }).then(res=>{
        for(let i of this.results){
          i.value=res.data.data[i.key]
        }
      }).catch(err=>{
        console.error(err)
      })
    }
  }
};
</script>

<style scoped>
.test {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
.title {
  margin: auto;
  font-size: 50px;
  font-weight: bolder;
}
.discri {
  margin: 20px auto;
  font-size: 18px;
  color: cornflowerblue;
  word-wrap: break-word;
  width: 800px;
}

.box {
  margin: 20px auto;
  width: 860px;
  height: auto;
  min-height: 300px;
  border: 1px solid black;
  padding: 40px 0 20px 0;
  background-color: rgb(203, 231, 207);
  display: flex;
  flex-direction: column;
}
.params {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.little_box{
  width: 45%;
  margin: 20px;
}
.params span {
  width: 50px;
}
.input {
  width: 250px;
  margin: 0 20px;
}
.button{
  width: 250px;
  margin: 20px auto;
}
</style>