<template>
  <div class="ChangeNumber">
    <div class="title">在线任意进制转换工具</div>
    <div class="discri">
      支持二进制、八进制、十进制、十六进制以内的任意数字互相转换。
    </div>

    <div class="box">
      <div class="start">
        <el-select v-model="value1" placeholder="请选择进制" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>进制</span>
        <el-input
          v-model="input1"
          placeholder="请输入内容"
          class="input"
        ></el-input>
      </div>

      <div class="center">
        <el-button @click="trans" type="success" class="button">
          <i class="el-icon-sort"></i>
        </el-button>
      </div>

      <div class="start">
        <el-select v-model="value2" placeholder="请选择进制" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>进制</span>
        <el-input
          v-model="input2"
          placeholder="结果是"
          class="input"
          :disabled="true"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeNumber",
  // inject:['reload'],
  data() {
    return {
      options: [
        {
          value: "2",
          label: "2",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "16",
          label: "16",
        },
      ],
      value1: "",
      value2: "",
      input1: "",
      input2: "",
    };
  },
  methods: {
    trans() {
      if (this.value1 == "" || this.value2 == "") {
        ELEMENT.MessageBox.alert("请选择转换进制");
        return;
      }
      if (this.input1 == "") {
        ELEMENT.MessageBox.alert("请输入转换数字");
        return;
      }
      let tran = parseInt(this.input1, this.value1);
      this.input2 = tran.toString(this.value2);
    },
  },
};
</script>

<style scoped>
.ChangeNumber {
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
  font-size: 30px;
  color: cornflowerblue;
}
.box {
  margin: 20px auto;
  width: 860px;
  height: 300px;
  border: 1px solid black;
  padding: 20px 0;
  background-color: rgb(203, 231, 207);
}
.start {
  flex-direction: row;
  width: 97%;
  height: auto;
  margin: 20px auto;
}
.start .select {
  width: 130px;
  margin: 0 20px;
  border: 1px solid #96d4c0;
}
.start .input {
  width: 520px;
  margin: 0 50px;
  border: 1px solid #96d4c0;
}
.center {
  width: 100%;
  height: auto;
  text-align: center;
  margin: 50px 0;
}
.center .button {
  width: 200px;
  height: 40px;
  margin: auto;
}
</style>