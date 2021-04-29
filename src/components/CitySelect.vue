<template>
  <div class="cityselect">
    <el-cascader
      placeholder="请选择城市或省份"
      v-model= 'value'
      :options="da"
      :props= props
      size="medium"
      clearable
      filterable
      lazyLoad
      @change="out"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "cityselect",
  mounted(){  
    this.get();
  },
  data() {
    return {
      da: [],
      value:"",
      props:{ checkStrictly: true ,children: 'children' }
    };
  },
  methods: {
    get() {
      let data = {
        key: "1a90595036a9e46042a110283b1d3f19",
        keywords: "中华人民共和国",
        subdistrict: "2",
        extension: "base",
      };
      axios({
        // url: "/api2/config/district",
        url: "https://restapi.amap.com/v3/config/district",
        method: "get",
        params: data,
        timeout: 6000 // 请求超时时间
      })
        .then((res) => {
          let a = res.data.districts[0].districts;
          let x=[]
          for (let i of a) {
            let t1 = {
              value:i.adcode,
              label:i.name,
              children:[]
            };
            for (let j of i.districts) {
              let t2 = {
                value:j.adcode,
                label:j.name
              };
              t1.children.push(t2)
            }
            x.push(t1)
          }
          this.da=x
        })
        .catch((err) => {
          console.error(err);
        });
    },
    out(){
      let data=this.value.pop();
      this.$emit('outRes',data)
    }
  },
};
</script>

<style scoped>
</style>