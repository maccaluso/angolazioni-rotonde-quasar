<template>
  <MglMap
    v-if="appData"
    id="map"
    ref="map"
    class="map-container"
    :center.sync="center"
    :zoom="startZoom"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    @load="onMapLoaded"
    @zoomend="onMapZoomEnd"
  >
    <div v-for="(venue, i) in mapMarkers" :key="i">
      <MglMarker
        v-if="mapIsLoaded && filterCheck(venue.type)"
        :coordinates="[venue.map.lng, venue.map.lat]"
        @click="onMarkerClick(venue)"
      >
        <div slot="marker" class="ar-marker" :style="markerStyle">
          <div
            class="marker-inner shadow-2"
            :class="[
              'ar-marker-' + venue.id,
              'ar-marker-' + venue.type.replace('&', 'and').split(' ').join('-').toLowerCase(),
            ]"
            :style="markerStyle"
          />
        </div>

        <MglPopup>
          <q-card flat class="transparent q-pa-none">
            <q-card-section>
              <div class="text-h6 text-primary text-weight-bold">{{ venue.title }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions class="q-pt-md">
              <q-btn-group flat>
                <q-btn
                  v-if="isFavorite"
                  icon-color="grey-9"
                  icon="mdi-bookmark-off-outline"
                  @click="removeFromFavorites()"
                />

                <q-btn
                  v-else
                  icon-color="grey-9"
                  icon="mdi-bookmark-plus-outline"
                  @click="addToFavorites()"
                />

                <q-btn icon-color="grey-9" icon="mdi-share-variant-outline">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <ShareNetwork
                        network="facebook"
                        :url="venue.permalink"
                        :title="venue.title"
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
                        :url="venue.permalink"
                        :title="venue.title"
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
              </q-btn-group>

              <q-space />

              <q-btn size="sm" class="q-ml-md" color="grey-9" @click="navigateToVenue(venue)">{{ $t('mapPage.card') }}</q-btn>
            </q-card-actions>
          </q-card>
        </MglPopup>
      </MglMarker>
    </div>

    <template v-if="showUserLocation">
      <MglMarker :coordinates="userLocation">
        <div slot="marker" class="ar-marker" :style="markerStyle">
          <div
            class="marker-inner shadow-2 ar-marker-user-position"
            :style="markerStyle"
          />
        </div>

        <MglPopup>
          <q-card flat class="transparent q-pa-none">
            <q-card-section>
              <div class="text-h6 text-primary text-weight-bold">{{ $t('mapPage.yourPosition') }}</div>
            </q-card-section>
          </q-card>
        </MglPopup>
      </MglMarker>
    </template>

    <q-page-sticky position="bottom-right" :offset="[10, 120]">
      <q-btn @click="zoomIn" fab icon="mdi-magnify-plus" color="primary" />
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[10, 45]">
      <q-btn @click="zoomOut" fab icon="mdi-magnify-minus" color="primary" />
    </q-page-sticky>
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox'
import { mapGetters } from 'vuex'

export default {
  name: 'PageMap',
  components: { MglMap, MglMarker, MglPopup },
  data() {
    return {
      markerSize: 20,
      center: [11.342591, 44.489955],
      startZoom: 7,
      destZoom: 12,
      flySpeed: 0.5,
      userLocation: null,
      showUserLocation: false,
      watchID: null
    }
  },
  computed: {
    ...mapGetters('appdata', [
      'appData',
      'accessToken',
      'mapStyle',
      'mapIsLoaded',
      'mapMarkers',
      'placesFilter',
      'hospitalityFilter',
      'shoppingFilter',
      'foodFilter',
      'parksFilter',
      'parkingsFilter',
      'servicesFilter',
      'isFavorite'
    ]),
    filterCheck() {
      return (type) => {
        switch(type) {
          case 'Luoghi Culturali e Storici':
            return this.placesFilter
          case 'Dormire':
            return this.hospitalityFilter
          case 'Comprare':
            return this.shoppingFilter
          case 'Mangiare e Divertirsi':
            return this.foodFilter
          case 'Parchi cittadini':
            return this.parksFilter
          case 'Parcheggi Disabili':
            return this.parkingsFilter
          case 'Servizi':
            return this.servicesFilter
        }

        return false
      }
    },
    markerStyle() {
      return {
        width: this.markerSize + 'px',
        height: this.markerSize + 'px'
      }
    }
  },
  methods: {
    async onMapLoaded (event) {
      const asyncActions = event.component.actions

      const newParams = await asyncActions.flyTo({
        center: this.center,
        zoom: this.destZoom,
        speed: this.flySpeed
      })

      this.$store.commit('appdata/SET_MAP_LOADED', true)
    },
    onMapZoomEnd (event) {
      if (event.map.getZoom() >= 15) {
        this.markerSize = event.map.getZoom() * 4
      } else {
        this.markerSize = event.map.getZoom() * 2.25
      }

      if (this.markerSize > 46) { this.markerSize = 46 }
    },
    onMarkerClick (venue) { this.$store.commit('appdata/SET_CURRENT_VENUE', venue) },
    zoomIn () { this.$refs.map.actions.zoomIn() },
    zoomOut () { this.$refs.map.actions.zoomOut() },
    navigateToVenue (venue) {
      this.$store.commit('appdata/SET_CURRENT_VENUE', venue)
      this.$router.push('aree/' + venue.areaSlug + '/' + venue.slug)
    },
    addToFavorites () {
      this.$store.commit('appdata/ADD_TO_FAVORITES')
      this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
    },
    removeFromFavorites () {
      this.$store.commit('appdata/REMOVE_FROM_FAVORITES')
      this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('appdata/SET_MAP_LOADED', false)
    navigator.geolocation.clearWatch(this.watchID)
    this.watchID = null
    next()
  },
  beforeDestroy () {
    this.$store.commit('appdata/UPDATE_FAVORITES_STORAGE')
  },
  mounted () {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.userLocation = [position.coords.longitude, position.coords.latitude]
        this.showUserLocation = true
      },
      (geolocationError) => {
        this.showUserLocation = false

        if (geolocationError.code) {
          this.$q.notify({
            message: geolocationError.message,
            color: 'negative'
          })
        }
      },
      { maximumAge: 0, timeout: 30000, enableHighAccuracy: true }
    )
  }
}
</script>
