<template>
  <v-container fluid>
    <v-sheet
      elevation="1"
      height="150"
      style="overflow:hidden;margin:0.5em 1em;border-radius:3px"
    >
      <v-row>
        <v-col cols="4">
          <v-img
            height="130"
            width="130"
            contain
            class="ma-4"
            :src="item.url"
          ></v-img>
        </v-col>
        <v-col cols="8" class="pa-2">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                <a @click="toDetail(item.ID)">
                  <font color="#3f51b5" style="font-weight:700">{{ item.ARTICLE_NAME }}</font>
                </a>
              </v-list-item-title>
              <v-list-item-subtitle>{{
                item.DATETIME_CREATED
              }}</v-list-item-subtitle>
              <v-list-item-content style="overlow:hidden; font-weight:300"><font color="grey">
                {{item.CONTENT.substring(0,50)}}</font>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  name: "MaterialCategoryCard",

  props: { item: Object },
  methods:{
    toDetail(){
      this.$emit('toDetail');
    }
  }
};
</script>
