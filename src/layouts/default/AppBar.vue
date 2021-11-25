<template>
  <v-card color="grey lighten-4"
    flat
    height="auto"
    tile>
    <v-toolbar color="#2a579a">
      <v-spacer></v-spacer>

      <v-toolbar-title>
        <v-btn to="/" text color="#2a579a" large><font color="#fff">从入门到放弃</font></v-btn>
      </v-toolbar-title>
      <v-menu v-for="([text, icon, show, to], index) in btns" :key="index" offset-y :disabled="!show">
        <template v-slot:activator="{ attrs, on }">
          <v-btn text color="grey" class="white--text ma-2 font-weight-bold h6" v-bind="attrs" v-on="on" :to="to">
            <v-icon left dark>mdi-{{icon}}</v-icon>{{ text }}
            <v-icon right dark v-show="show">mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in items" :key="item" link>
            <v-list-item-action>
                <v-btn x-small class="ma-0" text icon color="red lighten-2">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
           </v-list-item-action>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer />

      <default-search class="hidden-sm-and-down" />

      <default-go-home />
      <v-switch v-model="$vuetify.theme.dark" class="ma-2 pa-0" color="secondary" label="Dark Mode" hide-details />
    </v-toolbar>

  </v-card>
  <!-- <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">

      </v-container>
    </v-sheet> -->

</template>

<script>
// Utilities
import { get, sync } from "vuex-pathify";

export default {
  name: "DefaultBar",

  components: {
    DefaultAccount: () =>
      import(
        /* webpackChunkName: "default-account" */
        "./widgets/Account"
      ),
    DefaultDrawerToggle: () =>
      import(
        /* webpackChunkName: "default-drawer-toggle" */
        "./widgets/DrawerToggle"
      ),
    DefaultGoHome: () =>
      import(
        /* webpackChunkName: "default-go-home" */
        "./widgets/GoHome"
      ),
    DefaultNotifications: () =>
      import(
        /* webpackChunkName: "default-notifications" */
        "./widgets/Notifications"
      ),
    DefaultSearch: () =>
      import(
        /* webpackChunkName: "default-search" */
        "./widgets/Search"
      ),
  },
  data: () => ({
    btns: [
      ["主页", "home", false, '/'],
      ["分类", "shape", false, '/components/categries'],
      ["标签", "tag", true, ''],
    ],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
  }),
  computed: {
    ...sync("app", ["drawer", "mini"]),
    name: get("route/title"),
  },
};
</script>
