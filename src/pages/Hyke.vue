<template>
  <div v-if="appData">
    <q-card flat>
      <q-img
        :src="currentHyke.image"
        :ratio="16/9"
        cover
      />

      <q-card-section class="row q-py-lg ar-hyke-details">
        <q-card class="col q-mr-md">
          <q-card-section>
            <div class="text-h6 q-mb-md text-secondary">{{ $t('hykePage.accessibility') }}</div>
            <template v-if="currentHyke.accessibility">
              <div
                class="ar-hyke-accessibility"
                v-html="currentHyke.accessibility.replace(/ *\[[^\]]*]/g, '')"
              />
              <div class="ar-accessibility-overlay" @click="openDrawerAtLegend" />
            </template>
            <div v-else>---</div>
          </q-card-section>
        </q-card>

        <q-card class="col">
          <q-card-section>
            <div class="text-h6 q-mb-md text-secondary">{{ $t('hykePage.details') }}</div>
            <div
              v-if="currentHyke.address || currentHyke.timeTable"
              v-html="currentHyke.address + currentHyke.timeTable"
            />
            <div v-else>---</div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-section v-if="appData && currentHyke && currentHyke.mapCenter" class="row q-pb-lg q-pt-none">
        <q-card class="col" style="height: 250px;">
          <MglMap
            id="hykeMap"
            ref="hykeMap"
            class="map-container"
            :center.sync="center"
            :zoom="startZoom"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            @load="onMapLoaded"
          >
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
                      <div class="text-h6 text-primary text-weight-bold">Your position</div>
                    </q-card-section>
                  </q-card>
                </MglPopup>
              </MglMarker>
            </template>

            <q-btn
              @click="zoomIn"
              round
              size="sm"
              icon="mdi-magnify-plus"
              color="primary"
              class="absolute-bottom-right"
              style="right: 7px; bottom: 70px"
            />
            <q-btn
              @click="zoomOut"
              round
              size="sm"
              icon="mdi-magnify-minus"
              color="primary"
              class="absolute-bottom-right"
              style="right: 7px; bottom: 35px"
            />
          </MglMap>
        </q-card>
      </q-card-section>

      <q-card-section class="hyke-content-container q-mb-xl" v-html="currentHyke.htmlContent" />
    </q-card>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox'
import { mapGetters } from 'vuex'

export default {
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
    ...mapGetters('appdata', ['appData', 'accessToken', 'mapStyle', 'currentHyke']),
    markerStyle() {
      return {
        width: this.markerSize + 'px',
        height: this.markerSize + 'px'
      }
    }
  },
  methods: {
    openDrawerAtLegend () {
      this.$store.commit('appdata/OPEN_DRAWER')
      document.getElementById('drawerList').parentElement.scrollTop = 2000
    },
    async onMapLoaded (event) {
      const asyncActions = event.component.actions

      const newParams = await asyncActions.flyTo({
        center: [this.currentHyke.mapCenter.lng, this.currentHyke.mapCenter.lat],
        zoom: this.destZoom,
        speed: this.flySpeed
      })
    },
    zoomIn () { this.$refs.hykeMap.actions.zoomIn() },
    zoomOut () { this.$refs.hykeMap.actions.zoomOut() },
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
  },
  beforeRouteLeave (to, from, next) {
    navigator.geolocation.clearWatch(this.watchID)
    this.watchID = null

    next()
  }
}
</script>