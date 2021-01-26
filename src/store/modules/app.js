// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: '主页',
      icon: 'mdi-clipboard-outline',
      to: '/',
    },
    {
      title: '分类',
      icon: 'mdi-format-font',
      to: '/components/typography/',
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
    //   title: 'Google Maps',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/google/',
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
