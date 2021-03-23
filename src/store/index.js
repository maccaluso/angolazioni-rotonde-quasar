import Vue from 'vue'
import Vuex from 'vuex'

import appdata from './module-appdata'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      appdata
    },

    strict: process.env.DEV
  })

  return Store
}
