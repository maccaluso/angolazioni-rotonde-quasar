<template>
  <q-layout view="lHh Lpr lFf">
    <app-header />

    <app-drawer />

    <q-page-container class="q-pt-none">
      <transition
        :enter-active-class="transitionDirectionEnter"
        :leave-active-class="transitionDirectionLeave"
        appear
        :duration="300"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex"

import AppHeader from 'components/AppHeader'
import AppDrawer from 'components/AppDrawer'
import { LocalStorage } from 'quasar'

export default {
  name: 'MainLayout',
  components: { AppHeader, AppDrawer },
  computed: {
    ...mapGetters('appdata', ['drawerOpen', 'isNavigatingBack']),
    transitionDirectionEnter () {
      return 'animated slideInRight'
    },
    transitionDirectionLeave () {
      if (this.isNavigatingBack) { return 'animated slideOutRight' }

      return 'animated slideOutLeft'
    }
  },
  mounted() {
    let lang = 'it'
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang')
    }

    this.$store.commit('appdata/SET_LANGUAGE', lang)

    this.$store.dispatch('appdata/getAppData', lang).then((res) => {
      this.$store.commit('appdata/SET_APP_DATA', res.data)
      if (this.$q.localStorage.getItem('favorites') === 'null') {
        this.$store.commit('appdata/SET_FAVORITES', [])
      } else {
        this.$store.commit('appdata/SET_FAVORITES', this.$q.localStorage.getItem('favorites'))
      }

      if (Object.keys(this.$route.params).length > 0) {
        this.$store.dispatch('appdata/setContentFromRoute', this.$route.params)
      }
    })
  }
}
</script>