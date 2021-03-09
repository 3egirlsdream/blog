// Pathify
import { make } from 'vuex-pathify'
//material icon
//https://pictogrammers.github.io/@mdi/font/5.4.55/
// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: '主页',
      icon: 'mdi-home',
      to: '/',
    },
    {
      title: '分类',
      icon: 'mdi-arrange-bring-forward',
      to: '/components/categries',
    },
    // {
    //   title: 'Dashboard',
    //   icon: 'mdi-view-dashboard',
    //   to: '/tables/dashboard/',
    // },
    // {
    //   title: 'User Profile',
    //   icon: 'mdi-account',
    //   to: '/components/profile/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    // {
    //   title: 'Markdown Edit',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/markdown/',
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'mdi-bell',
    //   to: '/components/notifications/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
