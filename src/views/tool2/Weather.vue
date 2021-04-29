<template>
  <div class="weather">
    <div class="left">
      <cityselect @outRes="getRes" class="select"/>
      <div>省份：{{res.province}}</div>
      <div>城市：{{res.city}}</div>
      <div>更新时间：{{res.reporttime}}</div>
    </div>
    <div class="right">
      <div class="box" v-for="(item,index) of res.casts" :key= index :style="index==0?'background-color: rgba(1, 64, 136, 0.8)':''">
        <div>{{index==0?item.date+' 今天':item.date+' 周'+item.week}}</div>
        <div>天气：{{item.dayweather==item.nightweather?item.dayweather:item.dayweather+" 转 "+item.nightweather}}</div>
        <div>风向：{{item.daywind+'风'}}</div>
        <div>风力：{{item.daypower}}</div>
        <div>温度：{{item.nighttemp+'~'+item.daytemp+'℃'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cityselect from "../../components/CitySelect";
export default {
  name: "weather",
  components: {
    cityselect: cityselect,
  },
  data() {
    return {
      y: "",
      today:"",
      res: {},
    };
  },
  methods: {
    getRes(a) {
      this.getWeather(a)
    },
    getWeather(data) {
      let params = {
        key: "1a90595036a9e46042a110283b1d3f19",
        city: data,
        extensions: "all",
      };
      axios({
        // url: "/api2//weather/weatherInfo",
        url: "https://restapi.amap.com/v3/weather/weatherInfo",
        method: "get",
        params: params,
        timeout: 6000,
      })
        .then((res) => {
          this.res=res.data.forecasts[0]
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.weather {
  width: 100%;
  height: 89%;
  display: flex;
  margin: 20px 0;
  background-image: linear-gradient(
360deg
, #2b8fdf 0%, #1a75d4 76%, #156dd1 100%), linear-gradient(
180deg
, #164982 0%, #1f69b3 53%, #4593dd 100%);
}
.left {
  flex: 1;
}
.left div{
  margin: 50px 20px;
  font-size: 25px;
}
.left .select{
  margin: 50px 20px;
}
.right {
  flex: 2;
  display: flex;
  padding: 20px;
  color: white;
}
.right .box{
  flex: 1;
  height: 100%;
  border: 1.5px solid #207ed8;
  background-color: rgba(0, 86, 182, 0.8);
}
.box div{
  margin: 20px;
}
</style>