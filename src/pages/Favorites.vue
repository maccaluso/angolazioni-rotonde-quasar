<template>
  <q-page class="flex column">
    <q-list padding v-if="favorites.length > 0">
      <q-item
        v-for="(venue, i) in favorites"
        :key="i"
        clickable
        @click="navigateToVenue(venue, venue.type)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="venue.image">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle2">{{ venue.title }}</q-item-label>
          <q-item-label caption lines="2">{{ venue.content }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            icon-color="grey-9"
            icon="mdi-bookmark-off-outline"
            @click.prevent="removeFromFavorites(venue, venue.type)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else class="q-pa-md row items-start q-gutter-md">
      <q-card style="width: 100%;">
        <q-card-section>{{ $t('favoritesPage.noItems') }}</q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'PageFavorites',
  computed: {
    ...mapGetters('appdata', ['appData', 'favorites'])
  },
  methods: {
    navigateToVenue(venue, type) {
      this.appData.aree.forEach((item) => {
        if (item.id === venue.areaID) {
          this.$store.commit('appdata/SET_CURRENT_VENUE', { ...venue, type})
          this.$router.push('/aree/' + item.slug + '/' + venue.slug)
        }
      });
    },
    removeFromFavorites (venue, type) {
      this.$store.commit('appdata/SET_CURRENT_VENUE', { ...venue, type})
      this.$store.commit('appdata/REMOVE_FROM_FAVORITES')
      this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
    }
  }
}
</script>
