<template>
  <q-header :class="headerBG">
    <q-toolbar class="q-py-md">
      <a @click.prevent="navigateHome">
        <img
          src="~assets/logo.svg"
          height="45"
          class="q-ml-md"
        >
      </a>

      <q-btn
        v-if="$route.name !== 'Map'"
        flat
        :color="headerColor"
        round
        dense
        icon="mdi-arrow-left"
        class="q-ml-md"
        @click="navigateBack"
      />

      <q-toolbar-title class="text-weight-bold q-pl-sm" :class="'text-' + headerColor">
        {{ headerTitle }}
      </q-toolbar-title>

      <q-btn
        flat
        round
        :color="headerColor"
        size="lg"
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleDrawer"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters('appdata', ['drawerOpen', 'currentArea', 'currentVenue', 'currentHyke']),
    headerBG() {
      if (this.$route.name === 'Map') {
        return 'transparent'
      } else {
        return 'bg-white'
      }
    },
    headerColor() {
      switch(this.$route.name) {
        case 'Hykes':
          return 'secondary'
        case 'Hyke':
          return 'secondary'

        default:
          return 'primary'
      }
    },
    headerTitle() {
      switch (this.$route.name) {
        case 'Map':
          return ''
        case 'Areas':
          return this.$t('cityAreasPage.pageTitle')
        case 'Area':
          return this.currentArea ? this.currentArea.name : ''
        case 'Venue':
          return this.currentVenue ? this.currentVenue.title : ''
        case 'Hykes':
          return this.$t('hykesPage.pageTitle')
        case 'Hyke':
          return this.currentHyke ? this.currentHyke.title : ''
        case 'Hints':
          return this.$t('hintsPage.pageTitle')
        case 'About':
          return this.$t('aboutPage.pageTitle')
        case 'Favorites':
          return this.$t('favoritesPage.pageTitle')
      
        default:
          return this.$route.name
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('appdata/TOGGLE_DRAWER')
    },
    navigateHome () {
      this.$router.push('/')
    },
    navigateBack () {
      this.$store.commit('appdata/SET_NAVIGATION_DIRECTION', true)
      this.$router.back()

      const to = setTimeout(() => {
        clearTimeout(to)
        this.$store.commit('appdata/SET_NAVIGATION_DIRECTION', false)
      }, 500)
    }
  }
}
</script>