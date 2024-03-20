<template>
  <div class="right-padding">
    <div class="right-title">{{ $t("message.user.bangzhuzhongxin") }}</div>
    <div class="margin-top-bottom20">
      <el-collapse v-for="item in helpData" :key="item.id">
        <el-collapse-item :title="item.title" :name="item.id">
          <div v-html="item.content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Axios from "@/api/my.js";
export default {
  name: "helpCenter",
  data() {
    return {
      helpData: [],
      language: "zh-CN",
    };
  },
  mounted() {
    console.log("mounted");
    this.getData();
  },
  created() {
    console.log("created");
  },
  methods: {
    getData() {
      this.language = "en";
      const lang = JSON.parse(localStorage.getItem("lang"));

      if (lang == "cht") {
        this.language = "CN";
      } else if (lang == "fr") {
        this.language = "en";
      } else if (lang == "de") {
        this.language = "en";
      } else if (lang == "it") {
        this.language = "en";
      } else if (lang == "ko") {
        this.language = "Korean";
      }
      Axios.cms({
        model: "help_center",
        language: this.language,
      })
        .then((res) => {
          this.helpData = res.data;
        })
        .catch((e) => {
          console.log("cms error", e);
        });

      //
    },
  },
};
</script>

<style scoped>
.helps-box {
  padding: 15px;
}
.helps-box > div {
  padding-bottom: 15px;
  font-size: 32px;
  font-weight: 600;
}
</style>
