<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="2">
      </v-col>
      <v-col cols="12" md="7">
        <material-card color="grey" icon="mdi-twitter">
          <template #title>
            {{ detail.ARTICLE_NAME }}
          </template>
          <v-divider></v-divider>
          <v-card-title>
            <v-chip v-for="(tags, index) in detail.categories" :key="index" class="ma-1" :color="color[index]" label text-color="white">
              {{ tags }}
            </v-chip>
          </v-card-title>
          <v-form>
            <v-container class="py-0">
              <v-card-text class="markdown-body" v-html="detail.CONTENT_TRANSFERED">
              </v-card-text>
              <v-divider class="mt-5"></v-divider>
              <v-card-text class="mt-10" v-show="detail.LAST_ESSAY != null || detail.NEXT_ESSAY != null">
                <div class="h2 font-weight-regular" style="font-size: 1.4em">
                  <font color="#3f51b5">系列文章</font>
                </div>
              </v-card-text>
              <v-card-actions>
                <div>
                  <v-row v-show="detail.LAST_ESSAY != '' && detail.LAST_ESSAY != null" @click="gotopage(detail.LAST_ESSAY)">
                    <v-btn v-show="detail.LAST_ESSAY != '' && detail.LAST_ESSAY != null" class="mx-2" fab dark x-small color="indigo">
                      <v-icon dark> mdi-arrow-left </v-icon>
                    </v-btn>
                    <a style="line-height:32px;font-weight:300">
                      <font color="grey">上一篇：</font>
                      <font color="#5590f0">{{ detail.LAST_ESSAY_NAME }}</font>
                    </a>
                  </v-row>

                  <v-row class="mt-4" v-show="detail.NEXT_ESSAY != '' && detail.NEXT_ESSAY != null" @click="gotopage(detail.NEXT_ESSAY)">
                    <v-btn v-show="detail.NEXT_ESSAY != '' && detail.NEXT_ESSAY != null" class="mx-2" fab dark x-small color="indigo">
                      <v-icon> mdi-arrow-right </v-icon>
                    </v-btn>
                    <a style="line-height:32px;font-weight:300">
                      <font color="grey">下一篇：</font>
                      <font color="#5590f0">{{ detail.NEXT_ESSAY_NAME }}</font>
                    </a>
                  </v-row>
                </div>
              </v-card-actions>
              <v-card-text>
                <!-- 版权声明 -->
              </v-card-text>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

      <v-col cols="12" md="3">
        <div :class="flag ? 'mobile' : ''">
          <app-card class="mt-3 text-center">
            <!-- <v-img
              class="rounded-circle elevation-6 mt-n12 d-inline-block"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              width="128"
            /> -->

            <v-card-text class="text-left">
              <h5 class="text-h5 mb-2 text--secondary text-center">本文内容</h5>
              <a class="contents text--secondary text-left" style="text-decoration: none" :href="'#' + node.id" v-for="(node, index) in nodes" :key="index">
                <font><span style="margin-left: 15px" v-for="j in node.index" :key="j">
                    <font class="white" v-html="whitespace">{{
                      whitespace
                    }}</font>
                  </span>○ {{ node.id }}<br /></font>
              </a>
            </v-card-text>
          </app-card>
          <app-card class="mt-4 text-center">
            <v-card-text class="text-left">
              <h5 class="text-h5 mb-2 text--secondary text-center">相关文章</h5>
              <a v-for="(title, index) in articles" :key="index" @click="gotopage(title.id)" class="text--secondary text-left">{{ title.title }}<br />
              </a>
            </v-card-text>
          </app-card>
        </div>
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
    API_GET_ALL_ARTICLE: "/api/article/GetAllArticle?user={0}&category={1}",
    API_GET_CONTENT: "/api/article/GetArticleContent?id={0}",
    API_GET_ALL_ARTICLE_TO_PAGE:
      "/api/article/GetArticlesToPage?user={0}&category={1}&startIndex={2}&length={3}",
  },
  data() {
    return {
      articles: [],
      color: [
        "#8bc34a",
        "#673ab7",
        "#ff9800",
        "#f44336",
        "#E09F7D",
        "#EF5D60",
        "#EC4067",
        "#311847",
        "#163438",
      ],
      detail: [],
      id: this.$route.query.id,
      nodes: [],
      whitespace: " ",
      flag: true,
    };
  },
  mounted: function () {
    let self = this;
    this.loadData();
    this.isPC();
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.css";
    document.head.appendChild(link);
    this.getAllArticle();
    window.onresize = function () {
      self.isPC();
    };
  },
  methods: {
    match(whatSay) {
      let maxs = /<[Hh]([1-6])[^>]*>.*?[^/]+/g;
      //let node = document.getElementsByTagName('h3');
      //whatSay = whatSay.replaceAll('>',">\n");
      var node = whatSay.match(maxs);
      this.nodes = [];
      if(node == undefined) return;
      let min = 10000;
      for (let i = 0; i < node.length; i++) {
        let x = node[i];
        let index = parseInt(x[2]);
        let idx = x.indexOf('"');
        x = x.substring(idx + 1, x.length);
        idx = x.indexOf('"');

        if (idx > 0) {
          x = x.substring(0, idx);
        }

        min = Math.min(min, index);

        this.nodes.push({
          index: index,
          id: x,
        });
      }

      this.nodes.forEach((c) => {
        c.index -= min;
      });
    },
    loadData() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_CONTENT,
        self.id
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.detail = res.data;
          self.detail.DATETIME_CREATED = self.detail.DATETIME_CREATED.replace(
            "T",
            " "
          );
          self.detail.CONTENT_TRANSFERED = marked(self.detail.CONTENT);
          self.detail.categories = self.detail.ARTICLE_CATEGORY.split(";");
          self.match(self.detail.CONTENT_TRANSFERED);
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
      fsCfg.getData(url, function (res) {
        if (res.success) {
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            self.articles.push({
              id: element.ID,
              title: element.ARTICLE_NAME,
            });
          }
        }
      });
    },
    gotopage(id) {
      this.$router.push({
        path: "/components/contents/",
        query: {
          id: id,
        },
      });
      location.reload();
    },
    isPC() {
      var userAgentInfo = window.navigator.userAgent;

      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
      ];

      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
          this.flag = false;
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.mobile {
  position: fixed;
  top: 93px;
}

a.contents :hover {
  font-weight: 500;
}
</style>
