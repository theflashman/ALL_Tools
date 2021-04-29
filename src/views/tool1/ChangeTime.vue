<template>
  <div class="ChangeTime">
    <div class="title">在线公历农历互转、阳历阴历互转工具</div>

    <div class="box">
      <div class="start">
        <span>请输入公历（阳历）日期：</span>
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          class="data"
        >
        </el-date-picker>

        <el-button type="success" class="button"  @click="toYin">
          公历
          <i class="el-icon-d-arrow-right"></i>
          农历</el-button
        >
      </div>
      <div class="end">
        {{ res1 }}
      </div>

      <hr style="margin: 20px 0" />

      <div class="start2">
        <span>请输入农历（阴历）日期：</span>
        <el-input
          v-model="y"
          placeholder="……"
          class="input"
        ></el-input>
        <span>年</span>
        <el-input
          v-model="m"
          placeholder="……"
          class="input"
        ></el-input>
        <span>月</span>
        <el-input
          v-model="d"
          placeholder="……"
          class="input"
        ></el-input>
        <span>日</span>

        <el-button type="success" class="button" @click="toYang">
          农历
          <i class="el-icon-d-arrow-right"></i>
          公历
        </el-button>
      </div>
      <div class="end">
        {{ res2 }}
      </div>
    </div>

    <div class="title_discri">说明 | Introduce</div>
    <div class="discri">
      <li>
        国际通用的历法是以一年太阳回归年为周期，谓之太阳历，故称为阳历，全球公用，故亦称为公历。是由西方国家传入我国的纪元方式，台湾人亦称为西历、西元。
      </li>
      <li>
        中国传统的历法自夏朝始，称为夏历，是以月球绕地球一周为一个月，十二个月为一年，谓之太阴历，故称为阴历。
      </li>
      <li>
        中国的阴历配合了闰年及二十四节气，使得太阴历的年周期同步于太阳历。
      </li>
      <li>
        我国以农业立国，夏历的节气时令等与农业密切相关，故亦称为农历。换言之，阳历即是公历，阴历即是农历。
      </li>
    </div>
  </div>
</template>

<script>
import {Lunar} from "../js/time"
// import { MessageBox } from "element-ui";
export default {
  name: "ChangeTime",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "",
      y:"",
      m:"",
      d:"",
      res1: "请输入日期",
      res2: "请输入日期",
    };
  },
  methods: {
    toYin(){
      if(this.value1==''){
        ELEMENT.MessageBox.alert("请输入公历日期");
        return
      }
      let date = new Date(this.value1);
      date.setDate(date.getDate()-1);
      let y = date.getFullYear();
      let m = date.getMonth() +1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      this.res1=Lunar.toLunar(y,m,d);
    },
    toYang(){
      if(this.y==""||this.m==""||this.d==""){
        ELEMENT.MessageBox.alert("请输入农历日期");
        return
      }
      this.res2=Lunar.toSolar(this.y,this.m,this.d);
    }
  },
};
</script>

<style scoped>
.ChangeTime {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
.title_discri {
  margin: 20px 0 0 100px;
  font-size: 35px;
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
}
.box {
  margin: 20px auto;
  width: 860px;
  height: 300px;
  border: 1px solid black;
  padding: 20px 0;
}
.start {
  flex-direction: row;
  width: 97%;
  height: auto;
  margin: 20px auto;
}
.start span {
  margin: auto 20px;
}
.start .data {
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  width: 200px;
  margin: auto 50px;
}
.start .button {
  width: 200px;
  height: 40px;
  margin: auto 50px;
}
.start2 {
  flex-direction: row;
  width: 97%;
  height: auto;
  margin: 20px auto;
}
.start2 span {
  margin: auto 8px;
}
.start2 .input{
  width: 75px;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
}
.start2 .button {
  width: 200px;
  height: 40px;
  margin: auto 50px;
}
.end {
  background-color: #abefab;
  width: 100%;
  height: 45px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  letter-spacing: 5px;
}
</style>