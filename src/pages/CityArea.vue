<template>
  <div v-if="appData">
    <q-card v-if="area($route.params.slug)" class="my-card">
      <q-img
        :src="area($route.params.slug).image ? area($route.params.slug).image : ''"
        :ratio="16/9"
        contain
      />

      <q-card-section>
        <div class="text-h6 text-weight-bold">{{ $t('cityAreaPage.briefNotesLabel1') }}</div>
        <div class="text-subtitle2 q-mb-md">{{ $t('cityAreaPage.briefNotesLabel2') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ area($route.params.slug).description }}
      </q-card-section>

      <q-card-section>
        <q-carousel
          animated
          v-model="slide"
          navigation
          navigation-icon="mdi-circle"
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            v-for="(gallery, i) in area($route.params.slug).gallery"
            :key="i"
            :name="i"
            :img-src="'https://angolazionirotonde.it/' + gallery"
          />
        </q-carousel>
      </q-card-section>

      <q-card-section>
        <q-list padding>
          <div 
            v-for="(venueType, i) in area($route.params.slug).venues"
            :key="i"
          >
            <q-expansion-item
              v-if="venueType.data && venueType.data.length > 0"
              expand-separator
              default-opened
              expand-icon="mdi-chevron-down"
              expanded-icon="mdi-chevron-up"
            >
              <template v-slot:header>
                <q-item-section avatar class="q-mb-md">
                  <img height="30" :src="typeIcon(venueType.title)">
                </q-item-section>

                <q-item-section class="text-h6 text-grey-7">{{ venueType.title }}</q-item-section>
              </template>

              <q-card class="q-mb-lg">
                <q-list padding>
                  <q-item
                    v-for="(venue, j) in venueType.data"
                    :key="j"
                    clickable
                    @click="navigateToVenue(venue, venueType.title)"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="venue && venue.image ? venue.image : ''">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-subtitle2">{{ venue.title }}</q-item-label>
                      <q-item-label caption lines="2">{{ venue.content_text }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-expansion-item>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      slide: 1,
      autoplay: true
    }
  },
  computed: {
    ...mapGetters('appdata', ['appData', 'area', 'language'])
  },
  methods: {
    typeIcon(type) {
      switch (type) {
        case 'Parcheggi Disabili':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/parcheggi-disabili.png'
        case 'Reserved parkings':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/parcheggi-disabili.png'
        case 'Servizi':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/servizi.png'
        case 'Services':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/servizi.png'
        case 'Mangiare e divertirsi':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/mangiare.png'
        case 'Eat and nightlife':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/mangiare.png'
        case 'Dormire':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/dormire.png'
        case 'Sleep':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/dormire.png'
        case 'Luoghi Culturali e Storici':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/luoghi-culturali-e-storici.png'
        case 'Cultural and Historical places':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/luoghi-culturali-e-storici.png'
        case 'Comprare':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/comprare.png'
        case 'Shopping':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/comprare.png'
        case 'Parchi cittadini':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/green-2.png'
        case 'City parks and outdoor':
          return 'https://angolazionirotonde.it/wp-content/uploads/2019/01/green-2.png'
        case 'Escursioni':
          return ''
        case 'Trekkings':
          return ''
        default:
          return ''
      }
    },
    navigateToVenue(venue, type) {
      this.$store.commit('appdata/SET_CURRENT_VENUE', { ...venue, type})
      this.$router.push(this.$route.path + '/' + venue.slug)
    }
  }
}
</script>
