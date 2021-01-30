<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="primary" icon="mdi-all-inclusive">
          <template #title>
            {{ detail.ARTICLE_NAME }}
          </template>
          <v-divider></v-divider>
          <v-card-title>
            <v-chip
              v-for="(tags, index) in detail.categories"
              :key="tags"
              class="ma-1"
              :color="color[index]"
              label
              text-color="white"
            >
              {{ tags }}
            </v-chip>
          </v-card-title>
          <v-form>
            <v-container class="py-0">
              <v-card-text
                class="markdown-body"
                v-html="detail.CONTENT_TRANSFERED"
              >
              </v-card-text>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

      <v-col cols="12" md="4">
        <app-card class="mt-4 text-center">
          <!-- <v-img
            class="rounded-circle elevation-6 mt-n12 d-inline-block"
            src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            width="128"
          /> -->

          <v-card-text class="text-left">
            <h5 class="text-h5 mb-2 text--secondary text-center">
              相关文章
            </h5>


            <a v-for="(title) in articles" :key="title" @click="gotopage(title.id)" class="text--secondary text-left">{{title.title}}<br>
            </a>


          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import framework from "../assets/js/framework.js";
import fsCfg from "../assets/js/fw.js";
import marked from "marked";
export default {
  name: "UserProfileView",
  serverUrl: {
    API_GET_ALL_ARTICLE: "/api/article/user={0}&category={1}",
    API_GET_CONTENT: "/api/article/id={0}",
    API_GET_ALL_ARTICLE_TO_PAGE:
      "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}"
  },
  data() {
    return {
      articles:[],
      color: ["#8bc34a", "#673ab7", "#ff9800", "#f44336", "#E09F7D", "#EF5D60", "#EC4067", "#311847", "#163438"],
      detail: [],
      id: this.$route.query.id
    };
  },
  mounted: function() {
    this.loadData();
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.css";
    document.head.appendChild(link);
    this.getAllArticle()
  },
  methods: {
    loadData() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_CONTENT,
        self.id
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.detail = res.data;
          self.detail.DATETIME_CREATED = self.detail.DATETIME_CREATED.replace(
            "T",
            " "
          );
          self.detail.CONTENT_TRANSFERED = marked(self.detail.CONTENT);
          self.detail.categories = self.detail.ARTICLE_CATEGORY.split(";");
        }
      });
    },
    getAllArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE,
        "cxk",
        "全部"
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {

          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            self.articles.push({id:element.ID, title:element.ARTICLE_NAME});
          }

        }
      });
    },
    gotopage(id) {
      this.$router.push({path:'/components/profile/', query:{id:id}})
      location.reload();
    }
  }
};
</script>
