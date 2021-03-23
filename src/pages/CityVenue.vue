<template>
  <div v-if="currentVenue">
    <q-card flat class="venue-card">
      <q-img :src="currentVenue.image">
        <div class="absolute-top-left transparent">
          <q-btn
            v-if="isFavorite"
            round
            color="grey-9"
            icon="mdi-bookmark-off-outline"
            @click="removeFromFavorites()"
          />

          <q-btn
            v-else
            round
            color="grey-9"
            icon="mdi-bookmark-plus-outline"
            @click="addToFavorites()"
          />

          <q-btn
            round
            color="grey-9"
            icon="mdi-share-variant-outline"
            class="q-ml-sm"
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <ShareNetwork
                  network="facebook"
                  :url="currentVenue.permalink"
                  :title="currentVenue.title"
                  hashtags="angolazionirotonde"
                >
                  <q-item v-close-popup>
                    <q-item-section avatar>
                      <img src="~assets/facebook-icon.svg">
                    </q-item-section>

                    <q-item-section>
                      Facebook
                    </q-item-section>
                  </q-item>
                </ShareNetwork>

                <ShareNetwork
                  network="twitter"
                  :url="currentVenue.permalink"
                  :title="currentVenue.title"
                  hashtags="angolazionirotonde"
                >
                  <q-item v-close-popup>
                    <q-item-section avatar>
                      <img src="~assets/twitter-icon.svg">
                    </q-item-section>

                    <q-item-section>
                      Twitter
                    </q-item-section>
                  </q-item>
                </ShareNetwork>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-img>

      <q-card-section class="row q-py-lg">
        <q-card class="col q-mr-md">
          <q-card-section class="relative-position">
            <div class="text-h6 q-mb-md text-primary">{{ $t('cityVenuePage.accessibility') }}</div>
            <template v-if="currentVenue.accessibility">
              <div
                class="ar-venue-accessibility"
                v-html="currentVenue.accessibility"
              />
              <div class="ar-accessibility-overlay" @click="openDrawerAtLegend" />
            </template>
            <div v-else>---</div>
          </q-card-section>
        </q-card>

        <q-card class="col">
          <q-card-section>
            <div class="text-h6 q-mb-md text-primary">{{ $t('cityVenuePage.details') }}</div>
            <div
              class="ar-venue-details"
              v-if="currentVenue.address || currentVenue.timeTable"
              v-html="currentVenue.address + currentVenue.timeTable"
            />
            <div v-else>---</div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-section class="q-pt-none venue-description">
        <div class="text-subtitle2 q-pb-md">{{ $t('cityVenuePage.description') }}</div>
        <p v-html="currentVenue.content" />
      </q-card-section>

      <q-card-section
        v-if="currentVenue.map && currentVenue.map.lng && currentVenue.map.lat"
        class="q-pt-none"
      >
        <div class="text-subtitle2 q-pb-md">Mappa</div>
        <MglMap
          id="venueMap"
          class="map-container"
          :accessToken="accessToken"
          :mapStyle="mapStyle"
          @load="onMapLoaded"
          @zoomend="onMapZoomEnd"
          style="height: 500px;"
        >
          <MglMarker :coordinates="[currentVenue.map.lng, currentVenue.map.lat]">
            <div slot="marker" class="ar-marker">
              <div
                class="marker-inner shadow-2"
                :class="[
                  'ar-marker-' + currentVenue.id,
                  'ar-marker-' + currentVenue.type.replace('&', 'and').split(' ').join('-').toLowerCase(),
                ]"
                :style="markerStyle"
              />
            </div>
          </MglMarker>
        </MglMap>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker } from 'vue-mapbox'
import { mapGetters } from 'vuex'

export default {
  components: { MglMap, MglMarker },
  data() {
    return {
      markerSize: 20
    }
  },
  computed: {
    ...mapGetters ('appdata', ['accessToken', 'mapStyle', 'currentVenue', 'isFavorite']),
    markerStyle () {
      return {
        width: this.markerSize + 'px',
        height: this.markerSize + 'px'
      }
    }
  },
  created () {
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoaded (event) {
      const asyncActions = event.component.actions

      const newParams = await asyncActions.flyTo({
        center: [this.currentVenue.map.lng, this.currentVenue.map.lat],
        zoom: 15,
        speed: 1
      })
    },
    onMapZoomEnd (event) {
      if (event.map.getZoom() >= 15) {
        this.markerSize = event.map.getZoom() * 4
      } else {
        this.markerSize = event.map.getZoom() * 2.25
      }

      if (this.markerSize > 46) { this.markerSize = 46 }
    },
    addToFavorites () {
      this.$store.commit('appdata/ADD_TO_FAVORITES')
      this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
    },
    removeFromFavorites () {
      this.$store.commit('appdata/REMOVE_FROM_FAVORITES')
      this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
    },
    openDrawerAtLegend () {
      this.$store.commit('appdata/OPEN_DRAWER')
      document.getElementById('drawerList').parentElement.scrollTop = 2000
    }
  },
  beforeDestroy () {
    this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
  }
}
</script>