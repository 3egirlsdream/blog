<template>
  <v-container id="typography-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card
          elevation="2"
          class="my-5"
          v-for="item in articleList"
          :key="item"
          icon-small
          :title="item.ARTICLE_NAME"
          color="accent"
        >
          <v-simple-table>
            <v-card-title> </v-card-title>
            <v-card-text>
              <div class="caption">{{ item.DATETIME_CREATED }}</div>
              <br />
              <a class="h2" style="font-size:1.5em" @click="toDetail(item.ID)"
                ><font color="#3f51b5">{{ item.ARTICLE_NAME }}</font></a
              >

              <!-- <div class="h1">{{ item.CONTENT }}</div> -->
            </v-card-text>
            <v-card-text>
              <v-divider></v-divider>
              <v-chip
                v-for="(tags, index) in item.categories"
                :key="tags"
                class="ma-1"
                :color="color[index]"
                label
                text-color="white"
              >
                {{ tags }}
              </v-chip>
            </v-card-text>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <template>
          <v-card class="pa-12" color="indigo darken-2" flat>
            <v-card elevation="12" width="256">
              <v-navigation-drawer floating permanent>
                <v-list dense rounded>
                  <v-list-item
                    v-for="item in categories"
                    :key="item.title"
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        @click="getArticleToPage(item.title)"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
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
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" }
    ],
    articleList: [],
    categories: [],
    color: ["#8bc34a", "#673ab7", "#ff9800", "#f44336", "#E09F7D", "#EF5D60", "#EC4067", "#311847", "#163438"]
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
          self.categories = [{ title: "全部", icon: "mdi-forum" }];
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
            var m = { title: c, icon: "mdi-forum" };
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
      this.$router.push({ path: "/components/profile/", query: { id: ID } });
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
