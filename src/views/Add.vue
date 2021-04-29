<template>
  <div class="add">
    <div class="title">算法添加</div>
    <div class="box">
      <div class="little_box">
        <span>Jar包名称：</span>
        <el-input
          v-model="JarName"
          placeholder="请输入包名称"
          class="input"
        ></el-input>
      </div>
      <div class="little_box">
        <span>jar包下的类全限名：</span>
        <el-input
          v-model="fullClassName"
          placeholder="请输入类名"
          class="input"
        ></el-input>
      </div>
      <div class="little_box">
        <span>使用到的方法名：</span>
        <el-input
          v-model="methodName"
          placeholder="请输入方法名"
          class="input"
        ></el-input>
      </div>
      <div class="little_box">
        <span>入参列表（逗号分隔）：</span>
        <el-input
          v-model="params"
          placeholder="输入入参列表（逗号分隔）"
          class="input"
        ></el-input>
      </div>
      <div class="little_box">
        <span>出参列表（逗号分隔）：</span>
        <el-input
          v-model="results"
          placeholder="输入出参列表（逗号分隔）"
          class="input"
        ></el-input>
      </div>
      <div class="little_box">
        <span>介绍备注：</span>
        <el-input
          v-model="description"
          placeholder="请输入介绍备注"
          class="input"
        ></el-input>
      </div>
      <el-upload
        class="upload"
        drag
        :http-request="handleupload"
        action=""
        accept=".jar"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">只能上传 jar 文件</div>
        </template>
      </el-upload>
      <el-button type="success" @click="upload" class="button" round>上传算法</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      JarName: "",
      fullClassName: "",
      methodName: "",
      params:"",
      results:"",
      description:"",
      fileList:[],
      formData:""
    };
  },
  methods: {
    handleupload(file) {
      let e=file.file
      let formData = new FormData();
      formData.append('file',e,e.name)
      this.formData=formData
      axios({
        // url:"/api3/file/upload",        
        url:"http://zengyuebaba.eicp.vip/file/upload",
        method:"post",
        headers: { 
          'Content-Type': 'multipart/form-data' ,
          'token':'464a206e89ebe385267a7089240afb9a'  
        },
        data:formData
      }).then(res=>{
        if(res.data.msg=="处理成功"){
          ELEMENT.Message.success({
            message: '文件上传成功',
            type: 'success'
          });
        }
        else{
          ELEMENT.Message.warning({
            message: '抱歉文件上传失败',
            type: 'warning'
          });
        }      
      }).catch(err=>{
        console.error(err)
      })
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return ELEMENT.MessageBox.confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      ELEMENT.Message({
        message: `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: "warning",
        duration: "3000",
      });
    },
    upload(){
      if(this.formData==""){
        ELEMENT.MessageBox.alert("请添加文件");        
        return
      }else if(this.JarName==""||this.fullClassName==""||this.methodName==""||this.params==""||this.results==""||this.description==""){
        ELEMENT.MessageBox.alert("请完善信息");    
        return
      }
      let formData=this.formData;
      formData.append('JarName',this.JarName)
      formData.append('fullClassName',this.fullClassName)
      formData.append('methodName',this.methodName)
      formData.append('params',this.params)
      formData.append('results',this.results)
      formData.append('description',this.description)
      axios({
        // url:"/api3/jarpath/upload",
        url:"http://zengyuebaba.eicp.vip/jarpath/upload",
        method:"post",
        headers: { 
          'Content-Type': 'multipart/form-data' ,
          'token':'464a206e89ebe385267a7089240afb9a'  
        },
        data:formData
      }).then(res=>{
        if(res.data.msg=="处理成功"){
          ELEMENT.Message.success({
            message: '添加成功',
            type: 'success'
          });
        }
        else{
          ELEMENT.Message.warning({
            message: '抱歉添加失败',
            type: 'warning'
          });
        }
        console.log(res.data)
      }).catch(err=>{
        console.error(err)
        ELEMENT.Message.warning({
            message: '抱歉添加失败',
            type: 'warning'
          });
      })
    }
  },
};
</script>

<style scoped>
.add {
  width: 97%;
  height: 700px;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.title{
  width: 100%;
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
  margin: 10px 0;
}
.box {
  width: 1000px;
  height: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px auto;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(232, 232, 232);
}
.box .little_box {
  margin: 20px 0;
  width: 40%;
  flex-direction: row;
  padding: 0 40px;
}
.box .little_box .input {
  width: 50%;
  margin: 0 10px;
}
.upload{
  margin: 20px 0 0 300px;
  width: 90%;
}
.button{
  width: 200px;
  margin: 50px auto;
  font-size: 20px;
}
</style>