<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-row no-gutters>
            <template v-for="(item, index) in articleList">
              <v-col :key="index">
                <MaterialCategoryCard
                  :item="item"
                  justify="space-around"
                ></MaterialCategoryCard>
              </v-col>
              <v-responsive
                v-if="(index + 1) % 2 == 0"
                :key="`width-${index + 1}`"
                width="100%"
              ></v-responsive>
            </template>
            <template >
              <v-row justify="center" class="mt-4">
                <v-pagination
                  v-model="curPage"
                  :length="10"
                  :total-visible="7"
                ></v-pagination>
              </v-row>
            </template>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <template>
            <v-sheet elevation="1" width="256" class="mt-3">
              <v-navigation-drawer floating permanent>
                <v-list dense rounded>
                  <v-list-item
                    v-for="item in categories"
                    :key="item.title"
                    link
                    @click="getArticleToPage(item.title)"
                  >
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
      "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}"
  },
  components: {
    MaterialCategoryCard: () => import("../components/MaterialCategoryCard")
  },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" }
    ],
    curPage:1,
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
      "#163438"
    ]
  }),
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
          self.categories = [{ title: "全部", icon: "mdi-file" }];
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
            var m = { title: c, icon: "mdi-file" };
            self.categories.push(m);
          });

          for (let i = 0; i < self.articleList.length; i++) {
            self.articleList[i].DATETIME_CREATED = self.articleList[
              i
            ].DATETIME_CREATED.replace("T", " ");
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
        0,
        99999
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.articleList = res.data;
          for (let i = 0; i < self.articleList.length; i++) {
            if (self.articleList[i].IMG_CODE != null)
              self.articleList[i].DATETIME_CREATED = self.articleList[
                i
              ].DATETIME_CREATED.replace("T", " ");
            var ca = self.articleList[i].ARTICLE_CATEGORY.split(";");
            self.articleList[i].categories = [];
            ca.forEach(x => {
              self.articleList[i].categories.push(x);
            });
          }
        }
      });
    },
    selected: function(item) {
      this.getArticleToPage();
    }
  },
  mounted: function() {
    this.getAllArticle();
  }
};
</script>
