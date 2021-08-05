<style scoped>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px 20px;
}

textarea {
  border: none;
  border-right: 1px solid #fff;
  resize: none;
  outline: none;
  background-color: #fff;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
<template>
  <v-container id="google-maps-view" fluid tag="section">
    <v-row justify="center">

      <v-col cols="12" md="2">
        <v-switch v-model="show" label="预览"></v-switch>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field v-model="detail.ARTICLE_NAME" label="文章名" required></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="3">
        <v-select v-model="lastId" :items="articleList" item-text="ARTICLE_NAME" item-value="ID" label="上一篇" solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select v-model="nextId" :items="articleList" item-text="ARTICLE_NAME" item-value="ID" label="下一篇" solo></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-combobox v-model="tags" :items="categories" chips clearable label="categries" multiple solo>
          <template v-slot:selection="{ attrs, item, select, selected, index }">
            <v-chip v-bind="attrs" :input-value="selected" close label text-color="white" :color="color[index]" @click="select" @click:close="remove(item)">
              <v-icon left>
                mdi-label
              </v-icon>
              <font>{{ item }}</font>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row justify="left">
      <v-col cols="12" md="3">
        <v-card class="mx-auto" max-width="256">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-row class="my-1">
                <v-col cols="12" md="6">
                  <v-btn small block color="primary" @click="submit(detail.ID, detail.ARTICLE_NAME)">更 新</v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn small block color="error" @click="d_create = true, tags = []">新 增</v-btn>
                </v-col>
              </v-row>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item v-for="item in articleList" :key="item.ARTICLE_NAME" link>
                <v-list-item-content @click="loadContent(item.ID)">
                  <v-list-item-title>{{ item.ARTICLE_NAME }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn small color="red" block @click="(id = item.ID),(name = item.ARTICLE_NAME),(dialog = true)">
                    <v-icon>mdi-delete</v-icon>删除
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" v-show="!show">
        <v-card height="100vh">
          <div id="editor">
            <textarea :value="input" @input="update"></textarea>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" v-show="show">
        <v-card class="pa-3">
          <v-card-title>
          </v-card-title>
          <v-form>
            <v-container class="py-0">
              <v-card-text class="markdown-body" v-html="compiledMarkdown">
              </v-card-text>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">
              提示
            </v-card-title>
            <v-card-text>确认删除《{{ name }}》?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="deletes">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <v-dialog v-model="alert" max-width="290">
      <v-card>
        <v-card-title>
          <span>提示</span>
        </v-card-title>
        <v-card-text>
          {{msg}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="alert = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="d_create" width="60%" height="80vh">
      <v-card class="py-2">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="params.ARTICLE_NAME" label="文章名" required />
            </v-col>
            <v-col cols="12" md="3">
              <v-combobox v-model="tags" :items="categories" chips clearable label="categries" multiple solo>
                <template v-slot:selection="{ attrs, item, select, selected, index }">
                  <v-chip v-bind="attrs" :input-value="selected" close label text-color="white" :color="color[index]" @click="select" @click:close="remove(item)">
                    <v-icon left>
                      mdi-label
                    </v-icon>
                    <font>{{ item }}</font>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="3">
              <v-select v-model="lastId" :items="articleList" item-text="ARTICLE_NAME" item-value="ID" label="上一篇" solo></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select v-model="nextId" :items="articleList" item-text="ARTICLE_NAME" item-value="ID" label="下一篇" solo></v-select>
            </v-col>
          </v-row>
          <div id="editor" style="height:70vh">
            <textarea style="height:100%" :value="d_input" @input="d_update"></textarea>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" @click="d_create = false">
            取消
          </v-btn>
          <v-btn small color="primary darken-1" @click="create">
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import marked from "marked";
import framework from "../assets/js/framework.js";
import fsCfg from "../assets/js/fw.js";
export default {
  name: "GoogleMapsView",
  serverUrl: {
    API_ALL_ARTICLE: "/api/Article/GetAllArticles?user={0}",
    API_EDIT: "/api/article/EditArticle",
    API_GET_CONTENT: "/api/article/GetArticleContent?id={0}",
    API_DELETE: "/api/article/Delete?id={0}",
    API_NEW_ARTICLE: "/api/article/write",
  },
  data: () => ({
    lastId: "",
    nextId: "",
    tags: [],
    categories: [],
    d_create: false,
    alert: false,
    dialog: false,
    show: false,
    input: "",
    d_input: "",
    articleList: [],
    detail: "",
    content: "",
    name: "",
    id: "",
    msg: "",
    compiledMarkdown: "",
    params: { ARTICLE_NAME: "", ARTICLE_CATEGORY: "" },
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
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
    }, 300),
    d_update: _.debounce(function (e) {
      this.d_input = e.target.value;
    }, 300),
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    deletes() {
      let self = this;

      var url = framework.strFormat(
        this.$options.serverUrl.API_DELETE,
        this.id
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.msg = "删除成功！";
          self.alert = true;
          self.getAllArticle();
        }
        self.dialog = false;
      });
    },
    submit(id, name) {
      let self = this;
      var data = {
        ID: id,
        NAME: name,
        CONTENT: this.input,
        CATEGORY: this.detail.ARTICLE_CATEGORY,
        last: this.lastId,
        next: this.nextId,
      };

      fsCfg.postData(
        this.$options.serverUrl.API_EDIT,
        JSON.stringify(data),
        function (res) {
          if (res.success) {
            self.msg = "更新成功";
            self.alert = true;
            self.getAllArticle();
          }
        }
      );
    },
    create() {
      let self = this;
      var data = {
        title: this.params.ARTICLE_NAME,
        content: this.d_input,
        user: "cxk",
        category: this.params.ARTICLE_CATEGORY,
        last: this.lastId,
        next: this.nextId,
      };

      fsCfg.postData(
        this.$options.serverUrl.API_NEW_ARTICLE,
        JSON.stringify(data),
        function (res) {
          if (res.success) {
            self.msg = "新增成功";
            self.alert = true;
            self.getAllArticle();
            self.d_create = false;
          }
        }
      );
    },
    getAllArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_ALL_ARTICLE,
        "cxk"
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.articleList = res.data;
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            var ca = element.ARTICLE_CATEGORY.split(";");
            ca.forEach((x) => {
              if (!self.categories.includes(x)) self.categories.push(x);
            });
          }
        }
      });
    },
    loadContent(id) {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_CONTENT,
        id
      );
      fsCfg.getData(url, function (res) {
        if (res.success) {
          self.detail = res.data;
          self.input = self.detail.CONTENT;
          self.compiledMarkdown = marked(self.detail.CONTENT);
          self.tags = self.detail.ARTICLE_CATEGORY.split(";");
          self.lastId = self.detail.LAST_ESSAY;
          self.nextId = self.detail.NEXT_ESSAY;
        }
      });
    },
  },
  mounted: function () {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.css";
    document.head.appendChild(link);
    this.getAllArticle();
  },
  watch: {
    tags() {
      var ac = "";
      for (let index = 0; index < this.tags.length; index++) {
        const element = this.tags[index];
        if (index != this.tags.length - 1) {
          ac = ac + element + ";";
        } else ac = ac + element;
      }

      this.params.ARTICLE_CATEGORY = ac;
      this.detail.ARTICLE_CATEGORY = ac;
    },
  },
};
</script>
