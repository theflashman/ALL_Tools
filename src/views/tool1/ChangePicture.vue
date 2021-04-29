<template>
  <div class="wenben">
    <div class="left">
      <el-upload
        class="upload"
        drag
        :http-request="handleupload"
        action=""
        :accept="type"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg格式/png格式/gif格式/bmp格式 图片
          </div>
        </template>
      </el-upload>

      <div class="guide">
        <span>请选择目标格式：</span>
        <el-select v-model="value" placeholder="请选择" style="width: 280px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" round class="button" @click="download">
        <i class="el-icon-download"></i> 转换并下载
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "wenben",
  data() {
    return {
      fileList: [],
      type: ".jpg,.png,.gif,.bmp",
      options: [
        {
          value: "jpg",
          label: "jpg格式",
        },
        {
          value: "png",
          label: "png格式",
        },
        {
          value: "gif",
          label: "gif格式",
        },
        {
          value: "bmp",
          label: "bmp格式",
        },
      ],
      value: "",
      input: "",
      inputName: "",
    };
  },
  methods: {
    handleupload(file) {
      let e = file.file;
      let formData = new FormData();
      formData.append("file", e, e.name);
      axios({
        // url: "/api3/file/upload",
        url: "http://zengyuebaba.eicp.vip/file/upload",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          token: "464a206e89ebe385267a7089240afb9a",
        },
        data: formData,
      })
        .then((res) => {
          if (res.data.msg == "处理成功") {
            ELEMENT.Message.success({
              message: "文件上传成功",
              type: "success",
            });
            this.input = res.data.data;
            this.inputName = this.input.split("tmp/")[1];
          } else {
            ELEMENT.Message.warning({
              message: "抱歉文件上传失败",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          ELEMENT.Message.warning({
            message: "抱歉文件上传失败",
            type: "warning",
          });
        });
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
    download() {
      if (this.input == "") {
        ELEMENT.MessageBox.alert("请添加文件");
        return;
      } else if (this.value == "") {
        ELEMENT.MessageBox.alert("请选择目标格式");
        return;
      }
      let srcFormat = this.input.substring(this.input.length - 3);
      let url = this.input.substr(0, this.input.length - 4);
      let json = {
        srcUrl: url,
        srcFormat: srcFormat,
        destFormat: this.value,
      };
      axios({
        // url: "/api3/invoke/MyJar/com.zy.ImageConvert/convert",
        url: "http://zengyuebaba.eicp.vip/invoke/MyJar/com.zy.ImageConvert/convert",
        headers: {
          token: "464a206e89ebe385267a7089240afb9a",
          "Content-Type": "application/json",
        },
        method: "post",
        data: json,
      })
        .then((res) => {
          if (res.data.msg == "处理成功") {
            ELEMENT.Message.success({
              message: "转换成功",
              type: "success",
            });
            let name =
              this.inputName.substr(0, this.inputName.length - 4) +
              "." +
              this.value;
            let http = "http://zengyuebaba.eicp.vip/tmp/" + name;
            this.downloadByBlob(http, "转换图片");
          } else {
            ELEMENT.Message.warning({
              message: "抱歉添加失败",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          ELEMENT.Message.warning({
            message: "抱歉添加失败",
            type: "warning",
          });
          console.error(err);
        });
    },
    downloadByBlob(url, name) {
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          this.down(url, name);
          // 用完释放URL对象
          URL.revokeObjectURL(url);
        });
      };
    },
    down(href, name) {
      let eleLink = document.createElement("a");
      eleLink.download = name + "." + this.value;
      eleLink.href = href;
      eleLink.click();
      eleLink.remove();
    },
  },
};
</script>

<style scoped>
.wenben {
  width: 100%;
  height: 650px;
  display: flex;
}
.wenben .left {
  width: 65%;
  height: 600px;
  margin: 80px auto;
  flex-direction: column;
  background: #f5f5f5;
}
.left .upload {
  padding: 10px 280px;
}
.left .button {
  margin: 50px 365px;
  width: 200px;
  height: 50px;
  font-size: 20px;
}
.guide {
  font-size: 20px;
  margin: 50px 0 50px 200px;
  height: 50px;
  padding: 20px 0;
}
</style>