<style scoped>
.tag:nth-child(n + 1) {
  color: #8bc34a;
}
.tag:nth-child(n + 2) {
  color: #673ab7;
}
.tag:nth-child(n + 3) {
  color: #ff9800;
}
.tag:nth-child(n + 4) {
  background: #f44336;
}
.tag:nth-child(n + 5) {
  background: #00abc0;
}
.tag:nth-child(n + 6) {
  background: #2196f3;
}
</style>
<template>
  <v-container id="regular-tables-view" fluid tag="section">
    <view-intro heading="主页" link="components/simple-tables" />
    <div class="py-3" />

    <v-card v-for="(item, index) in articleList" :key="index" icon-small class="my-2" style="overflow:hidden;">
      <v-card-title>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon large left>
              mdi-bookshelf
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline" style="font-weight:500">
              {{ item.ARTICLE_NAME }}
            </v-list-item-title>
            <v-list-item-subtitle><span style="font-weight:300">{{
                item.DATETIME_CREATED
              }}</span></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-title>
      <v-card-text>{{ item.INDEX_CONTENT.substring(0, contentSize) }}
        <a @click="toDetail(item)" class="post-more waves-effect waves-button">阅读全文…</a>
      </v-card-text>
      <v-divider class="mx-2"></v-divider>
      <v-card-actions>
        <v-chip left v-for="(tags, index) in item.categories" :key="`${tags} ${index}`" class="ma-1" :color="color[index]" label text-color="white">
          {{ tags }}
        </v-chip>
      </v-card-actions>
    </v-card>
    <template>
      <v-row justify="center" class="mt-5" style="width:100%">
        <v-pagination v-model="curPage" :length="parseInt(totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1)" :total-visible="7" @next="next()" @previous="previous()"></v-pagination>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import framework from "../assets/js/framework.js";
import fsCfg from "../assets/js/fw.js";
import marked from "marked";
export default {
  name: "RegularTablesView",
  serverUrl: {
    API_GET_ALL_ARTICLE: "/api/article/user={0}&category={1}",
    API_GET_CONTENT: "/api/article/id={0}",
    API_GET_ALL_ARTICLE_TO_PAGE:
      "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}",
  },
  data() {
    return {
      contentSize: 200,
      curPage: 1,
      pageSize: 10,
      totalCount: 1,
      detail: [],
      articleList: [],
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
    };
  },
  watch: {
    curPage(val) {
      this.getAllArticle();
    },
  },
  methods: {
    next() {
      let total =
        this.totalCount % this.pageSize == 0
          ? this.totalCount / this.pageSize
          : this.totalCount / this.pageSize + 1;
      this.curPage = this.curPage < total ? this.curPage + 1 : 1;
    },
    previous() {
      this.curPage = this.curPage == 0 ? 1 : this.curPage - 1;
    },
    getAllArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE_TO_PAGE,
        "cxk",
        "全部",
        this.curPage,
        this.pageSize
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.articleList = res.data.data;
          self.totalCount = res.data.totalCount;
          self.categories = [{ name: "全部", checked: true }];
          let temp = [];
          for (let index = 0; index < self.articleList.length; index++) {
            const element = self.articleList[index];
            element.categories = [];
            console.log(element.ARTICLE_CATEGORY);
            var ca = element.ARTICLE_CATEGORY.split(";");
            ca.forEach((x) => {
              if (!temp.includes(x)) temp.push(x);
              element.categories.push(x);
            });
          }
          temp.forEach((c) => {
            var m = { name: c, checked: false };
            self.categories.push(m);
          });

          for (let i = 0; i < self.articleList.length; i++) {
            let x = self.articleList[i];
            x.DATETIME_CREATED = x.DATETIME_CREATED.replace("T", " ");
            x.INDEX_CONTENT = x.CONTENT.replace(/<[^>].*?>/g, "");
            x.CONTENT_TRANSFERED = marked(x.CONTENT);
          }
        }
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "/components/contents/",
        query: { id: item.ID },
      });
    },
  },
  mounted: function () {
    let self = this;
    this.getAllArticle();
    self.contentSize = framework.isPC() ? 200 : 80;
    window.onresize = function () {
      let f = framework.isPC();
      if (f) {
        self.contentSize = 200;
      } else {
        self.contentSize = 80;
      }
    };
  },
};
</script>
