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

    <v-card
      v-for="(item, index) in articleList"
      :key="index"
      icon-small
      class="my-2"
      style="overflow:hidden;"
    >
      <v-card-title>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon large left>
              mdi-bookshelf
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content >
            <v-list-item-title class="headline">
              {{ item.ARTICLE_NAME }}
            </v-list-item-title>
            <v-list-item-subtitle><span style="font-weight:300">{{
              item.DATETIME_CREATED
            }}</span></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-title>
      <v-card-text
        >{{ item.INDEX_CONTENT }}
        <a @click="toDetail(item)" class="post-more waves-effect waves-button"
          >阅读全文…</a
        >
      </v-card-text>
      <v-divider class="mx-2"></v-divider>
      <v-card-actions>
        <v-chip
          left
          v-for="(tags, index) in item.categories"
          :key="`${tags} ${index}`"
          class="ma-1"
          :color="color[index]"
          label
          text-color="white"
        >
          {{ tags }}
        </v-chip>
      </v-card-actions>
    </v-card>
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
      "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}"
  },
  data() {
    return {
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
        "#163438"
      ]
    };
  },
  methods: {
    getAllArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE,
        "cxk",
        "全部"
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.articleList = res.data;
          self.categories = [{ name: "全部", checked: true }];
          let temp = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.categories = [];
            var ca = element.ARTICLE_CATEGORY.split(";");
            ca.forEach(x => {
              if (!temp.includes(x)) temp.push(x);
              element.categories.push(x);
            });
          }
          temp.forEach(c => {
            var m = { name: c, checked: false };
            self.categories.push(m);
          });

          for (let i = 0; i < self.articleList.length; i++) {
            self.articleList[i].DATETIME_CREATED = self.articleList[
              i
            ].DATETIME_CREATED.replace("T", " ");
            self.articleList[i].INDEX_CONTENT = self.articleList[
              i
            ].CONTENT.replace(/<[^>].*?>/g, "");
            self.articleList[i].CONTENT_TRANSFERED = marked(
              self.articleList[i].CONTENT
            );
          }
        }
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "/components/contents/",
        query: { id: item.ID }
      });
    }
  },
  mounted: function() {
    this.getAllArticle();
  }
};
</script>
