<template>
  <v-list-item class="mb-0 justify-space-between pl-3">
    <v-list-item-avatar>
      <v-img
        :src="
          require('@/assets/vmd.svg')"
      />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h5">
        <strong class="mr-1 font-weight-black"></strong>

        <span class="primary--text"><font color="#fff">从入门到放弃</font></span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawerHeader',

    computed: { version: get('app/version') },
  }
</script>
