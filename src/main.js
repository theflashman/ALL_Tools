// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import VueAMap from "vue-amap"
// import axios from 'axios'
// import './style/main.css';

Vue.use(VueAMap);

Vue.config.productionTip = false

axios.defaults.timeout = 2000 // 请求超时


VueAMap.initAMapApiLoader({
  key: "eb3684833516e2f5b057da8ee5b93c11",
  plugin: [
    'AMap.Autocomplete', 
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar', 
    'AMap.MapType', 
    'AMap.PolyEditor', 
    'AMap.CircleEditor', 
    'AMap.Geocoder', 
    'AMap.Geolocation', 
    'AMap.MarkerClusterer'
  ],
  v: "1.4.5",
});

router.beforeEach((to, from ,next)=>{
  store.commit('updateActive',to.path)
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



