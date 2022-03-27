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
  <v-container>
    <v-row ref="index">
      <v-col cols="12" md="9">
        <template>
          <v-container>
            <v-row v-for="(item, i) in articles" :key="i">
              <v-col cols="12" class="col-md-4 pa-0 mb-0 mb-sm-2 mb-md-2 mb-lg-2">
                <template>
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card class="ma-0 pa-0">
                        <v-img :src="item.url" :lazy-src="item.url" aspect-ratio="1" class="grey lighten-2 align-end white--text" height="245">
                          <v-card-title class="hidden-md-and-up">
                            <div class="text-one-line">
                              {{item.ARTICLE_NAME}}
                            </div>
                          </v-card-title>
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                            </v-row>>
                          </template>
                        </v-img>
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="#036358">
                            <router-link tag="span" :to="{name:'文章详情',params: {id:item.ID}}">
                              <v-btn>查看文章</v-btn>
                            </router-link>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </template>
              </v-col>
              <v-col cols="12" class="col-md-8 pa-0 mb-2">
                <v-card class="pa-0 ma-0" height="245">
                  <router-link tag="span" :to="{name:'文章详情',params: {id:item.ID}}">
                    <v-card-title class="hidden-sm-and-down">
                      <v-icon large left>
                        mdi-twitter
                      </v-icon>
                      <span class="title font-weight-light text-one-line">{{item.ARTICLE_NAME}}</span>
                    </v-card-title>
                    <v-divider></v-divider>
                  </router-link>
                  <v-card-text>
                    <div>
                      <v-icon> mdi-tag-multiple </v-icon>
                      <span v-for="(tag, index) in item.categories" :key="index">
                        <v-chip class="ma-1" small :color="color[index]" text-color="white" :ripple="true" label @click="jumpCategory(tag)">
                          {{tag}}
                        </v-chip>
                      </span>
                    </div>
                    <div class="text-justify text-two-line mt-2">
                      {{item.CONTENT_TRANSFERED.substring(0, 50)}}
                    </div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-list-item class="grow px-2">
                      <template>
                        <div>
                          <v-menu transition="scale-transition" bottom open-on-hover :close-on-content-click="false" :nudge-width="200">
                            <template v-slot:activator="{ on, attrs }">
                              <v-list-item-avatar color="grey" v-bind="attrs" v-on="on">
                                <span v-if="false" class="text--darken-1 headline "></span>
                                <v-img class="elevation-6" alt="cxk" :src="item.IMG" v-if="true"></v-img>
                              </v-list-item-avatar>
                            </template>
                            <v-card>
                              <v-list>
                                <v-list-item>
                                  <v-list-item-avatar color="grey">
                                    <span v-if="false" class="text--darken-1 headline ">{{item.DISPLAY_NAME}}</span>
                                    <v-img class="elevation-6" alt="cxk" :src="item.IMG" v-if="true"></v-img>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title>{{item.DISPLAY_NAME}}</v-list-item-title>
                                    <v-list-item-subtitle class="text-one-line">xulezuo@hotmail.com</v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                                      <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                  </v-list-item-action>
                                </v-list-item>
                              </v-list>

                              <v-divider></v-divider>
                              <v-rating v-model="rating" class="mx-3">
                                <template v-slot:item="props">
                                  <v-icon :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'" large @click="props.click">
                                    {{ props.isFilled ? 'mdi-star-circle' : 'mdi-star-circle-outline' }}
                                  </v-icon>
                                </template>
                              </v-rating>

                              <v-card-actions class="d-flex justify-space-between">
                                <v-btn text>
                                  关注
                                </v-btn>
                                <v-btn color="primary" text @click="menu = false">
                                  查看主页
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </div>
                      </template>
                      <v-list-item-content>
                        <v-list-item-title>{{item.DISPLAY_NAME}}</v-list-item-title>
                      </v-list-item-content>
                      <v-spacer></v-spacer>
                      <div style="position: absolute;right: 0">
                        <v-icon class="mr-1">
                          mdi-clock
                        </v-icon>
                        <span class="subheading mr-2">{{item.DATETIME_CREATED}}</span>
                      </div>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <div v-if="false">
            <v-alert color="cyan" border="left" elevation="2" colored-border icon="mdi-twitter">
              很高兴你翻到这里，但是真的没有了...
            </v-alert>
          </div>
          <v-card v-for="n in 10" :key="n" v-if="articles.length == 0">
            <v-skeleton-loader class="my-4" max-height="300" type="list-item-avatar, divider, list-item-three-line, card-heading, actions"></v-skeleton-loader>
          </v-card>

          <v-row justify="center" class="ma-5" style="width:100%">
            <v-pagination v-model="curPage" :length="
            parseInt(
              totalCount % pageSize == 0
                ? totalCount / pageSize
                : totalCount / pageSize + 1
            )
          " :total-visible="7" @next="next()" @previous="previous()"></v-pagination>
          </v-row>
        </template>
      </v-col>
      <v-col cols="12" md="3">
        <default-description class="pa-0" :categories="categories" @jump="jumpCategory"/>
        <default-tag-cloud-all v-show="false"/>
        <default-log v-show="false"/>
      </v-col>
      <v-fab-transition>
        <v-btn color="pink" dark fixed bottom right fab @click="toTop()">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-row>
  </v-container>
</template>
<script>
import fsCfg from "../../src/api/http.js";
import marked from "marked";
export default {
  name: "Blog",
  components: {
    DefaultTagCloud: () =>
      import(
        /* webpackChunkName: "default-tag-cloud" */
        "./widgets/TagCloud"
      ),
    DefaultTagCloudAll: () =>
      import(
        /* webpackChunkName: "default-tag-clouds" */
        "./widgets/TagCloudAll"
      ),
    DefaultDescription: () =>
      import(
        /* webpackChunkName: "default-app" */
        "./widgets/Description"
      ),
    DefaultLog: () =>
      import(
        /* webpackChunkName: "default-app" */
        "./widgets/Log"
      ),
  },

  data: () => ({
    curPage: 1,
    pageSize: 10,
    offsetTop: 0,
    skeleton_loader: false,
    articles: [],
    categories: [],
    totalCount: 0,
    fav: true,
    menu: false,
    message: false,
    hints: true,

    colors: ["green", "purple", "orange", "indigo", "red"],
    rating: 4.5,
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
    defaultPic:
      "http://cdn.thankful.top/yaofan.jpg",
  }),
  watch: {
    curPage(val) {
      let url = window.location.href;
      let idx = url.lastIndexOf('/');
      let sub = url.substring(idx + 1, url.length);
      if(isNaN(sub))  url += ('/' + val);
      else url = url.substring(0, idx + 1) + val;
      history.pushState("", "Title", url);
      this.getArticles();
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
    getArticles() {
      let self = this;
      let category = '全部'
      if(window.location.href.includes('categories')){
        let idx = window.location.href.indexOf('categories');
        category = window.location.href.substring(idx + 11, window.location.href.length);
      }

      var url = `/api/article/GetArticlesToPage?user=cxk&category=${category}&startIndex=${this.curPage}&length=${this.pageSize}`;
      fsCfg.http("get", url).then((res) => {
        if (res.success) {
          self.articles = res.data.data;
          console.log(self.articles);
          self.totalCount = res.data.totalCount;
          self.categories = [
            {
              name: "全部",
              checked: true,
            },
          ];
          let temp = [];
          for (let index = 0; index < self.articles.length; index++) {
            const element = self.articles[index];
            element.categories = [];
            console.log(element.ARTICLE_CATEGORY);
            var ca = element.ARTICLE_CATEGORY.split(";");
            ca.forEach((x) => {
              if (!temp.includes(x)) temp.push(x);
              element.categories.push(x);
            });
          }
          temp.forEach((c) => {
            var m = {
              name: c,
              checked: false,
            };
            self.categories.push(m);
          });

          for (let i = 0; i < self.articles.length; i++) {
            let x = self.articles[i];
            x.DATETIME_CREATED = x.DATETIME_CREATED.replace("T", " ");
            x.INDEX_CONTENT = x.CONTENT.replace(/<[^>].*?>/g, "");
            x.CONTENT_TRANSFERED = marked(x.CONTENT);

            x.CONTENT_TRANSFERED = x.CONTENT_TRANSFERED.replace(/<.*?>/g, "");

            let regex =
              /(http[s]?:\/\/([\w-]+.)+(:\d{1,5})?(\/[\w-\.\/\?%&=]*)?)/gi;
            let urls = x.CONTENT.match(regex);
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

            x.url =
              url == undefined || url == null || url == ""
                ? self.defaultPic
                : url;
          }
        }
      });
    },

    match(whatSay) {
      let maxs = /<[Hh]([1-6])[^>]*>.*?[^/]+/g;
      //let node = document.getElementsByTagName('h3');
      //whatSay = whatSay.replaceAll('>',">\n");
      var node = whatSay.match(maxs);
      this.nodes = [];
      if (node == undefined) return;
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
    genColor(i) {
      return this.colors[i];
    },
    jumpTag(id) {
      this.$router.push({ path: "/tags/" + id + "/blog" });
    },
    jumpCategory(id) {
      this.$router.push({ path: "/categories/" + id });
    },
    addArticles() {
      this.skeleton_loader = true;
      if (this.$store.getters.getArticles == "") {
        this.skeleton_loader = false;
        return;
      }
      if (
        this.$store.getters.getArticles.meta.current_page <
        this.$store.getters.getArticles.meta.last_page
      ) {
        if (this.$route.params.tag_id) {
          this.$store.dispatch("indexTagArticles", {
            tag: this.$route.params.tag_id,
            order: "hot",
            page: this.$store.getters.getArticles.meta.current_page + 1,
          });
        } else if (this.$route.params.category_id) {
          this.$store.dispatch("indexCategoryArticles", {
            category: this.$route.params.category_id,
            order: "hot",
            page: this.$store.getters.getArticles.meta.current_page + 1,
          });
        } else if (this.$route.params.blog_search) {
          this.$store.dispatch("indexCategoryArticles", {
            search: this.$route.params.blog_search,
            page: this.$store.getters.getArticles.meta.current_page + 1,
          });
        } else {
          this.$store.dispatch("indexArticles", {
            order: "hot",
            page: this.$store.getters.getArticles.meta.current_page + 1,
          });
        }
      } else {
        this.skeleton_loader = false;
        console.log("没有内容了！");
      }
    },
    toTop() {
      this.$vuetify.goTo(this.$refs.index, {
        duration: 300,
        offset: 0,
      });
    },
  },
  computed: {
    nomore() {
      if (this.$store.getters.getArticles) {
        return !(
          this.$store.getters.getArticles.meta.current_page <
          this.$store.getters.getArticles.meta.last_page
        );
      } else {
        return true;
      }
    },

    app_config() {
      return this.$store.getters.getApp;
    },
  },
  created() {
    this.$store.dispatch("openOverlay");
    this.skeleton_loader = true;
    this.$watch(
      function () {
        // 第一个函数就是处理你要监听的属性，只要将其return出去就行
        return this.$store.getters.getArticlesLoadStatus();
      },
      function (old, valold) {
        if (this.$store.getters.getArticlesLoadStatus() == 2) {
          this.$nextTick(function () {
            this.skeleton_loader = false;
            /*现在数据已经渲染完毕*/
            this.$store.dispatch("closeOverlay");
          });
        }
      }
    );
    this.$store.dispatch("initArticlesStatus");
    if (this.$route.params.tag_id) {
      this.$store.dispatch("indexTagArticles", {
        tag: this.$route.params.tag_id,
        order: "hot",
        page: 1,
      });
    } else if (this.$route.params.category_id) {
      this.$store.dispatch("indexCategoryArticles", {
        category: this.$route.params.category_id,
        order: "hot",
        page: 1,
      });
    } else if (this.$route.params.blog_search) {
      this.$store.dispatch("searchArticles", {
        search: this.$route.params.blog_search,
      });
    } else {
      console.log("this.$store.getters.getArticles");
      this.$store.dispatch("indexArticles", {
        order: "hot",
        page: 1,
      });
    }
  },
  mounted() {
    let _this = this;
    let url = `/api/Auth/GetToken?name=cxk&pwd=cxk`;
    fsCfg
      .http("get", url)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("__token__", res.data);
        } else {
          console.log(res.message.content);
        }
      })
      .then(() => {
        let rt = window.location.href;
        let idx = rt.lastIndexOf("/");
        let sub = rt.substring(idx + 1, idx.length);
        if (!isNaN(sub)) this.curPage = parseInt(sub);
        else this.curPage = 1;
        this.getArticles();
      })
      .catch((err) => {
        console.log(err);
      });
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        _this.addArticles();
      }
    };
  },
};
</script>
