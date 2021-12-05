<template>
  <v-container>
    <v-card>
      <v-toolbar flat color="#2a579a" dark>
        <v-toolbar-title>推荐标签</v-toolbar-title>
      </v-toolbar>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <v-chip-group column>
          <v-chip v-for="(label, index) in categories" :key="index" label text-color="white" color="#2a579a" @click="$emit('jump', label.name)">
            <v-icon left>mdi-label</v-icon>{{label.name}}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({}),
  props: {
    categories: Array,
  },
  computed: {
    app_config() {
      return this.$store.getters.getApp;
    },
  },
  created(){
    console.log(this.categories);
  }
};
</script>
