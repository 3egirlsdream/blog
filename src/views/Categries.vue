<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-row no-gutters>
            <template v-for="(item, index) in articleList">
              <v-col :key="index">
                <MaterialCategoryCard @toDetail="toDetail(item.ID)" :item="item" justify="space-around"></MaterialCategoryCard>
              </v-col>
              <v-responsive v-if="(index + 1) % 2 == 0" :key="`width-${index + 1}`" width="100%"></v-responsive>
            </template>
            <template>
              <v-row justify="center" class="mt-4" style="width:100%">
                <v-pagination v-model="curPage" :length="parseInt(totalCount % Length == 0 ? totalCount / Length : (totalCount / Length) + 1)" :total-visible="7" @next="next()" @previous="previous()"></v-pagination>
              </v-row>
            </template>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <template>
            <v-sheet elevation="1" width="256" class="mt-5">
              <v-navigation-drawer floating permanent>
                <v-list dense rounded>
                  <v-list-item v-for="item in categories" :key="item.title" link @click="getArticleToPage(item.title), selected = item.title">
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-sheet>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import framework from "../assets/js/framework.js";
import fsCfg from "../assets/js/fw.js";

export default {
  name: "TypographyView",
  serverUrl: {
    API_GET_ALL_ARTICLE: "/api/article/user={0}&category={1}",
    API_GET_CONTENT: "/api/article/id={0}",
    API_GET_ALL_ARTICLE_TO_PAGE:
      "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}",
    API_GET_CATEGORIES: "/api/article/getarticlecategory",
  },
  components: {
    MaterialCategoryCard: () => import("../components/MaterialCategoryCard"),
  },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" },
    ],
    defaultPic:
      "https://gitee.com/eeegirlsdream/picture/raw/master/article/IMG20210414-163809334.jpg",
    selected: "全部",
    curPage: 1,
    Length: 10,
    totalCount: 1,
    articleList: [],
    categories: [],
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
  }),
  watch: {
    curPage(val) {
      this.getArticleToPage(this.selected);
    },
  },
  methods: {
    next() {
      let total =
        this.totalCount % this.Length == 0
          ? this.totalCount / this.Length
          : this.totalCount / this.Length + 1;
      this.curPage = this.curPage < total ? this.curPage + 1 : 1;
    },
    previous() {
      this.curPage = this.curPage == 0 ? 1 : this.curPage - 1;
    },
    getCategories() {
      let self = this;
      let url = this.$options.serverUrl.API_GET_CATEGORIES;
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.categories = [{ title: "全部", icon: "mdi-file" }];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            var m = { title: element, icon: "mdi-file" };
            self.categories.push(m);
          }
        }
      });
    },
    toDetail(ID) {
      this.$router.push({ path: "/components/contents/", query: { id: ID } });
    },
    getArticleToPage(category) {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE_TO_PAGE,
        "cxk",
        encodeURIComponent(category),
        this.curPage,
        this.Length
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.articleList = res.data.data;
          self.totalCount = res.data.totalCount;
          for (let i = 0; i < self.articleList.length; i++) {
            let e = self.articleList[i];
            if (e.IMG_CODE != null)
              e.DATETIME_CREATED = e.DATETIME_CREATED.replace("T", " ");
            var ca = e.ARTICLE_CATEGORY.split(";");
            e.categories = [];
            ca.forEach((x) => {
              e.categories.push(x);
            });

            let regex = /(http[s]?:\/\/([\w-]+.)+(:\d{1,5})?(\/[\w-\.\/\?%&=]*)?)/gi;
            let urls = e.CONTENT.match(regex);
            let url = "";
            if (urls != undefined && urls != null && urls.length > 0) {
              for (let i = 0; i < urls.length; i++) {
                const c = urls[i];
                if (c == null || c == undefined) continue;
                if (c.includes("png") || c.includes("jpg")) {
                  url = c;
                  url = url.replace(")", "");
                  break;
                }
              }
            }

            e.url =
              url == undefined || url == null || url == ""
                ? self.defaultPic
                : url;
          }
        }
      });
    },
    // selected: function(item) {
    //   //this.getArticleToPage();
    // }
  },
  mounted: function () {
    this.getCategories();
    this.getArticleToPage("全部");
  },
};
</script>
