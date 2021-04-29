<template>
  <div class="Map">
    <div class="amap-page-container">
      <div class="title">
        <el-amap-search-box
          class="search-box"
          :search-option="searchOption"
          :on-search-result="onSearchResult"
        ></el-amap-search-box>

      </div>
      <div class="content">
        <span>地点：{{ address }}</span>
        <span>地址：{{ center }}</span>
      </div>

      <el-amap
        ref="map"
        vid="amapDemo"
        :amap-manager="amapManager"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        :events="events"
        mapStyle="fresh"
        class="amap"
      >
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "Map",
  data() {
    const self = this;
    return {
      searchOption: {
        //根据定位获取当前城市
        city: "全国",
        citylimit: true,
      },
      lng: "",
      lat: "",
      address: "广州中医药大学",
      plugin: "AMap.ToolBar",
      // plugin属性是设置该标签的类型，类型可在main里找
      marker: "",
      amapManager,
      zoom: 12,
      center: [113.404592, 23.058369],
      events: {
        init: (o) => {
          o.getCity((result) => {});
        },
        moveend: () => {},
        zoomchange: () => {},
        click: (e) => {
          self.lng = e.lnglat.lng;
          self.lat = e.lnglat.lat;
          self.center = [self.lng, self.lat];
          let o = amapManager.getMap();
          if (!self.marker) {
            self.marker = new AMap.Marker({
              position: e.lnglat,
            });
            self.marker.setMap(o);
          }
          self.marker.setPosition(e.lnglat);
          let geocoder = new AMap.Geocoder({});

          geocoder.getAddress(e.lnglat, function (status, result) {
            if (status === "complete" && result.regeocode) {
              self.address = result.regeocode.formattedAddress;
            } else {
              log.error("根据经纬度查询地址失败");
            }
          });
        },
      },
      drawer: false,
    };
  },
  methods: {
    onSearchResult(pois) {
      if (pois.length > 0) {
        let { lng, lat, name, location } = pois[0];
        let center = [lng, lat];
        this.lng = lng;
        this.lat = lat;
        this.center = [lng, lat];
        let o = amapManager.getMap();
        if (!this.marker) {
          this.marker = new AMap.Marker({
            position: center,
          });
          this.marker.setMap(o);
        }
        this.marker.setPosition(center);
        // 近来补充  根据经纬度查询地址
        let geocoder = new AMap.Geocoder({});
        let that = this;
        geocoder.getAddress(location, function (status, result) {
          if (status === "complete" && result.regeocode) {
            that.address = result.regeocode.formattedAddress;
          } else {
            console.log("根据经纬度查询地址失败");
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.amap-page-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto;
}
.title {
  width: 100%;
  height: 100px;
  flex-direction: row;
  position: relative;
  top: 30px;
  flex-wrap: wrap;
}
.search-box {
  width: 500px;
  height: 45px;
  float: left;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
}
.title .button {
  float: right;
  margin: 0 20px;
}
.content {
  width: 100%;
  height: 40px;
}
.content span {
  margin: 10px 30px 10px 0;
}
.amap {
  width: 100%;
  height: 500px;
}
.search{
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  margin: auto;
}
.search .li_search{
  flex-direction: row;
  width: 100%;
  margin: 30px 0;
}
.li_search .li_search_box{
  width: 280px;
  display: inline-block;
}
</style>