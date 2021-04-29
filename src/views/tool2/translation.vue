<template>
  <div class="trans">
    <div class="top">
      <div class="title">英汉翻译</div>
      <div class="discri">说明：逐句翻译，可自动识别语言，点击便可英汉互译</div>
    </div>
    <div class="part">
      <el-input
        type="textarea"
        :rows="7"
        placeholder="请输入内容"
        v-model="input"
        size="medium"
        resize="none"
        class="input"
      >
      </el-input>
    </div>
    <div class="center">
      <el-button type="success" class="button" @click="translate">
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <div class="part">
      <el-input
        type="textarea"
        :rows="7"
        placeholder="翻译"
        v-model="res"
        size="medium"
        resize="none"
        class="input"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "trans",
  data() {
    return {
      input: "",
      res: "",
    };
  },
  methods: {
    translate() {
      if(this.input==""){
        ELEMENT.MessageBox.alert("请输入原文");        
        return
      }
      let param = new URLSearchParams();
      param.append("info", this.input);
      axios({
        method: "get",
        // url: "/api1",
        url: "https://api.66mz8.com/api/translation.php",
        params: param,
        timeout: 6000, // 请求超时时间
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      })
        .then((res) => {
          this.res = res.data.fanyi;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.trans {
  width: 80%;
  height: 300px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
}
.top{
  width: 100%;
  text-align: center;
}
.title {
  margin: auto;
  font-size: 50px;
  font-weight: bolder;
}
.discri {
  margin: 20px auto;
  font-size: 35px;
  color: cornflowerblue;
}
.part {
  flex: 1;
  height: 250px;
  margin: 25px 0;
  display: flex;
}
.part .input {
  width: 90%;
  margin: auto;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  font-size:20px;
}
.center {
  width: 100px;
  height: 250px;
  margin: 25px 0;
  display: flex;
}
.center .button {
  width: 100px;
  height: 50px;
  margin: auto;
}
</style>