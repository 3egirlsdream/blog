<template>
  <v-app :style="{backgroundImage: 'url('+ app_config.img_api +')', backgroundSize: 'cover',backgroundRepeat:'no-repeat'}">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <template>
            <v-card class="col-md-4 col-12 ma-0 pa-0" max-width="500" :loading="loading"> <template v-slot:progress>
                <v-progress-linear absolute color="blue lighten-1" height="4" indeterminate></v-progress-linear>
              </template>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>{{$t('m.login.title')}}</span>
                <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text=""></v-avatar>
              </v-card-title>

              <v-window>
                <v-window-item :value="1">
                  <v-card-text>
                    <v-text-field :label="$t('m.login.username')" type="text" v-model="loginForm.username"></v-text-field>
                    <v-text-field :label="$t('m.register.password')" type="password" v-model="loginForm.password"></v-text-field>
                    <span class="caption grey--text text--darken-1">
                      {{$t('m.login.forgot')}}
                    </span>
                  </v-card-text>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions>

                <router-link :to="{ name:'注册' }">
                  <v-btn color="primary" depressed>
                    {{$t('m.login.register')}}
                  </v-btn>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" depressed @click="login" :loading="loading">
                  {{$t('m.login.login')}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-row>
      </v-container>
    </v-main>
    <notification></notification>
  </v-app>
</template>
<script>
import { EventBus } from "../event-bus.js";
import Notification from "../components/Notification";
import store from "../store";
import fsCfg from "../../src/api/http.js";
export default {
  components: { Notification },
  data: () => ({
    loginForm: {
      username: "",
      password: "",
    },
    loading: false,
  }),
  methods: {
    login() {
      this.loading = true;
      let url = `/api/User/Login?user=${this.loginForm.username}&pwd=${this.loginForm.password}`;
      fsCfg
        .http("get", url)
        .then((res) => {
          if (res.success) {
            localStorage.setItem("__token__", res.data.token);
            this.$router.push({ path: "/publish" });
          } else {
            this.$router.push({
              path: this.$store.getters.getBeforeLoginRoute,
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          EventBus.$emit("open-message", {
            text: err,
          });
          this.loading = false;
        });
    },
  },
  computed: {
    app_config() {
      return this.$store.getters.getApp;
    },
  },
};
</script>
