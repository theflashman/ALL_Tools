<template>
  <div class="MD5">
    <div class="title">MD5算法</div>
    <div class="discri">
      <ul>
        <li>MD5即Message-Digest Algorithm 5（信息-摘要算法 5），用于确保信息传输完整一致。是计算机广泛使用的散列算法之一（又译摘要算法、哈希算法），主流编程语言普遍已有MD5实现。 将数据（如汉字）运算为另一固定长度值，是散列算法的基础原理，MD5的前身有MD2、MD3和MD4。</li>
        <li>MD5一度被广泛应用于安全领域。但是由于MD5的弱点被不断发现以及计算机能力不断的提升，现在已经可以构造两个具有相同MD5的信息[2]，使本算法不再适合当前的安全环境。目前，MD5计算广泛应用于错误检查。例如在一些BitTorrent下载中，软件通过计算MD5和检验下载到的碎片的完整性。</li>
        <li>MD5算法具有唯一性，主要用于数字签名，除了暴力破解，暂没有任何解密手段</li>
      </ul>
    </div>

    <div class="box">
      <div class="start">
        <span>原文：</span>
        <el-input
          v-model="input1"
          placeholder="请输入原文"
          class="input"
        ></el-input>
      </div>

      <div class="center">
        <el-button @click="toMi" type="success" class="button">
          <i class="el-icon-sort">加密</i>
        </el-button>
      </div>

      <div class="start">
        <span>密文：</span>
        <el-input
          v-model="input2"
          placeholder="密文结果"
          class="input"
          disabled
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  name: "MD5",
  data() {
    return {
      input1: "",
      input2: "",
    };
  },
  methods: {
    toMi() {
      if (this.input1 == "") {
        ELEMENT.MessageBox.alert("请输入原文");
        return;
      }
      let a = md5(this.input1)
      this.input2=a;
    }
  },
};
</script>

<style scoped>
.MD5 {
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
  margin:  auto;
  font-size: 18px;
  color: cornflowerblue;
}
.discri li{
  width: 900px;
  margin: 20px;
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

.start span{
  font-size: 30px;
  font-weight: bolder;
  margin: 0 20px 0 70px;
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
  margin: 0 75px;
}
</style>