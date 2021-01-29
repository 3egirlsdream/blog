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
      <v-col cols="12" md="2"> </v-col>
      <v-col cols="12" md="2">
        <v-switch v-model="show" label="预览"></v-switch>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="detail.ARTICLE_NAME"
          label="文章名"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="detail.ARTICLE_CATEGORY"
          label="分类"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="left">
      <v-col cols="12" md="3">
        <v-card class="mx-auto" max-width="256">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-row>
                <v-col cols="12" md="6">
                  <v-btn
                    small
                    block
                    color="primary"
                    @click="submit(detail.ID, detail.ARTICLE_NAME)"
                    >更 新</v-btn
                  >
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                    small
                    block
                    color="error"
                    @click="d_create = true"
                    >新 增</v-btn
                  >
                </v-col>
              </v-row>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item
                v-for="item in articleList"
                :key="item.ARTICLE_NAME"
                link
              >
                <v-list-item-content @click="loadContent(item.ID)">
                  <v-list-item-title>{{ item.ARTICLE_NAME }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    small
                    color="red"
                    block
                    @click="
                      (id = item.ID),
                        (name = item.ARTICLE_NAME),
                        (dialog = true)
                    "
                  >
                    <v-icon>mdi-delete</v-icon>删除</v-btn
                  >
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
              <v-card-text
                class="markdown-body"
                v-html="compiledMarkdown"
              >
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
    <v-dialog
        v-model="alert"
        max-width="290"
      >
        <v-card>
          <v-card-title>
            <span>提示</span>
          </v-card-title>
          <v-card-text>
            {{msg}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="alert = false"
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="d_create" width="60%">
      <v-form>
      <v-card height="80vh">
        <v-card-text style="height:91%">
          <v-row>
            <v-col cols="12" md="3">
        <v-text-field
          v-model="params.ARTICLE_NAME"
          label="文章名"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="params.ARTICLE_CATEGORY"
          label="分类"
          required
        ></v-text-field>
      </v-col>
          </v-row>
          <div id="editor" >
            <textarea :value="d_input" @input="d_update"></textarea>
          </div>
        </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="d_create = false">
                取消
              </v-btn>
              <v-btn color="green darken-1" text @click="create">
                提交
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-form>
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
    API_ALL_ARTICLE: "/api/article/GetAllArticle?user={0}",
    API_EDIT: "/api/article/EditArticle",
    API_GET_CONTENT: "/api/article/id={0}",
    API_DELETE:"/api/article/Delete?id={0}",
    API_NEW_ARTICLE:"/api/article/write"
  },
  data: () => ({
    d_create:false,
    alert:false,
    dialog: false,
    show: false,
    input: "",
    d_input:"",
    articleList: [],
    detail: "",
    content: "",
    name: "",
    id: "",
    msg:'',
    compiledMarkdown:"",
    params:{ARTICLE_NAME:'', ARTICLE_CATEGORY:''}
  }),
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    d_update: _.debounce(function(e) {
      this.d_input = e.target.value;
    }, 300),
    deletes() {
      let self = this;

      var url = framework.strFormat(
        this.$options.serverUrl.API_DELETE,
        this.id
      );
      fsCfg.getData(url, function(res) {
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
        CATEGORY: this.detail.ARTICLE_CATEGORY
      };

      fsCfg.postData(
        this.$options.serverUrl.API_EDIT,
        JSON.stringify(data),
        function(res) {
          if (res.success) {
            self.msg = "更新成功";
            self.alert = true;
            self.getAllArticle();

          }
        }
      );
    },
    create(){
    let self = this;
      var data = {
        title: this.params.ARTICLE_NAME,
        content: this.d_input,
        user: 'cxk',
        category: this.params.ARTICLE_CATEGORY
      };

      fsCfg.postData(
        this.$options.serverUrl.API_NEW_ARTICLE,
        JSON.stringify(data),
        function(res) {
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
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.articleList = res.data;
        }
      });
    },
    loadContent(id) {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_CONTENT,
        id
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.detail = res.data;
          self.input = self.detail.CONTENT;
          self.compiledMarkdown = marked(self.detail.CONTENT);
        }
      });
    }
  },
  mounted: function() {
     const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.css";
    document.head.appendChild(link);
    this.getAllArticle();
  }
};
</script>
