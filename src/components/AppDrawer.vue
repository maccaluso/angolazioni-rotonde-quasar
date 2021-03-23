<template>
  <q-drawer :value="drawerOpen" overlay side="right" @hide="onDrawerHide">
    <q-list id="drawerList">
      <q-item class="bg-primary q-py-md q-pr-sm">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-city" color="white" size="sm" />
        </q-item-section>

        <q-item-section class="text-weight-bold text-white">
          Bologna
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            color="white"
            size="lg"
            icon="mdi-close"
            aria-label="Close Menu"
            @click="toggleDrawer"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-translate" size="sm" />
        </q-item-section>

        <q-item-section>{{languageName}}</q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="12px" flat dense round icon="mdi-dots-vertical">
              <q-menu touch-position>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="changeLanguage('it')">
                    <q-item-section>Italiano</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup  @click="changeLanguage('en')">
                    <q-item-section>English</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-expansion-item
        icon="mdi-filter-variant"
        expand-icon="mdi-chevron-down"
        :label="$t('drawer.filters')"
        class="q-py-lg"
      >
        <q-list class="q-px-xs">
          <q-item :active="placesFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/luoghi-culturali-e-storici.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Luoghi Culturali e Storici</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="placesFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="hospitalityFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/dormire.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Dormire</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="hospitalityFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="shoppingFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/comprare.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Shopping</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="shoppingFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="foodFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/mangiare.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Mangiare e divertirsi</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="foodFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="parksFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/green-2.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Parchi cittadini</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="parksFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="servicesFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/servizi.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Servizi</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="servicesFilter" />
            </q-item-section>
          </q-item>

          <q-item :active="parkingsFilter" active-class="text-grey-8">
            <q-item-section avatar>
              <img
                src="https://angolazionirotonde.it/wp-content/uploads/2019/01/parcheggi-disabili.png"
                height="20"
              />
            </q-item-section>

            <q-item-section>Parcheggi disabili</q-item-section>

            <q-item-section side>
              <q-toggle dense v-model="parkingsFilter" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-separator />

      <q-item class="q-py-lg" clickable @click="navigateToRoute('/mappa')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-map-legend" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.map') }}</q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-lg" clickable @click="navigateToRoute('/aree')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-map-marker-path" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.cityAreas') }}</q-item-section>
      </q-item>

      <q-item class="q-pb-lg" clickable @click="navigateToRoute('/percorsi-nel-verde')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-pine-tree" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.hykes') }}</q-item-section>
      </q-item>

      <q-item class="q-pb-lg" clickable @click="navigateToRoute('/indicazioni-pratiche')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-cellphone-information" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.hints') }}</q-item-section>
      </q-item>

      <q-item class="q-pb-lg" clickable @click="navigateToRoute('/il-progetto')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-lightbulb-on-outline" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.about') }}</q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-lg" clickable @click="navigateToRoute('/preferiti')">
        <q-item-section avatar class="q-py-sm">
          <q-icon name="mdi-bookmark-multiple" size="sm" />
        </q-item-section>

        <q-item-section>{{ $t('drawer.favorites') }}</q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="https://angolazionirotonde.it/wp-content/uploads/2019/01/piedi-stampelle-e1547193203816.png"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-short-steps">{{ $t('drawer.smallStepsLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('drawer.smallStepsText') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="https://angolazionirotonde.it/wp-content/uploads/2019/01/accessibile-acc-e1547193222571.png"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-easy-way">{{ $t('drawer.quietHykesLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('drawer.quietHykesText') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="https://angolazionirotonde.it/wp-content/uploads/2019/01/parzialmente-e1547193214953.png"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-warrior">{{ $t('drawer.nastyHykesLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('drawer.nastyHykesText') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="https://angolazionirotonde.it/wp-content/uploads/2019/01/accessibile-e1547193248137.png"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-breath-time">{{ $t('drawer.timeItTakesLabel') }}</q-item-label>
          <q-item-label caption>{{ $t('drawer.timeItTakesText') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="~/assets/call-icon.svg"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-short-steps">
            <a class="text-grey-9" style="text-decoration: none;" href="tel:+39051372525">{{ $t('drawer.taxyCompanyLabel') }}</a>
          </q-item-label>

          <q-item-label caption>
            <a class="text-grey-9" style="text-decoration: none;" href="tel:+39051372525">{{ $t('drawer.taxyCompanyText') }}</a>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-py-lg">
        <q-item-section style="max-width: 90px">
          <img
            src="~/assets/parkings-icon.svg"
            width="70"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-short-steps">
            <a class="text-grey-9" style="text-decoration: none;" href="https://bit.ly/2Nf9pC5" target="blank">{{ $t('drawer.reservedParkingsLabel') }}</a>
          </q-item-label>

          <q-item-label caption>
            <a class="text-grey-9" style="text-decoration: none;" href="https://bit.ly/2Nf9pC5" target="blank">{{ $t('drawer.reservedParkingsText') }}</a>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item class="q-py-lg">
        <q-item-section>
          <q-item-label>
            © 2020/2021 Cervelli in Azione srl
            <br />
            Viale Antonio Silvani, 6C, 40122 Bologna BO - P. IVA 02848751208
            <br />
            <a class="text-primary text-weight-bold" href="mailto:info@angolazionirotonde.it" target="blank">info@angolazionirotonde.it</a>
            <br /><br />
            {{ $t('drawer.supportedBy') }}&nbsp;
            <a class="text-primary text-weight-bold" href="https://www.fondazioneunipolis.org" target="blank">Fondazione Unipolis</a>
            <br /><br />
            © {{ $t('drawer.photoCopyright') }} Nicoletta Valdisteno 2019
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      placesFilter: true,
      hospitalityFilter: true,
      shoppingFilter: true,
      foodFilter: true,
      parksFilter: true,
      parkingsFilter: true,
      servicesFilter: true
    }
  },
  computed: {
    ...mapGetters('appdata', ['drawerOpen', 'language', 'currentArea', 'currentVenue', 'currentHyke']),
    languageName() {
      if (this.language === 'it') { return 'Italiano' }
      if (this.language === 'en') { return 'English' }

      return 'en'
    }
  },
  watch: {
    placesFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'placesFilter') },
    hospitalityFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'hospitalityFilter') },
    shoppingFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'shoppingFilter') },
    foodFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'foodFilter') },
    parksFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'parksFilter') },
    parkingsFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'parkingsFilter') },
    servicesFilter: function () { this.$store.commit('appdata/TOGGLE_FILTER', 'servicesFilter') }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('appdata/TOGGLE_DRAWER')
    },
    onDrawerHide (e) {
      if (e) {
        this.$store.commit('appdata/CLOSE_DRAWER')
      }
    },
    navigateToRoute(route) {
      if (route !== this.$route.fullPath) {
        this.toggleDrawer()
        this.$router.push(route)
      }
    },
    changeLanguage(langCode) {
      switch (langCode) {
        case 'it':
          this.$i18n.locale = 'it-it'
          break
        case 'en':
          this.$i18n.locale = 'en-us'
          break
      }

      this.$store.commit('appdata/SET_LANGUAGE', langCode)

      this.$store.dispatch('appdata/getAppData', langCode).then((res) => {
        this.$store.commit('appdata/SET_APP_DATA', res.data)

        if (this.$q.localStorage.getItem('favorites') === 'null') {
          this.$store.commit('appdata/SET_FAVORITES', [])
        } else {
          this.$store.commit('appdata/SET_FAVORITES', this.$q.localStorage.getItem('favorites'))
        }

        this.$store.commit('appdata/CLOSE_DRAWER')

        if (this.$route.fullPath.indexOf('aree') > -1) {
          if (Object.keys(this.$route.params).length === 1) {
            this.$router.replace('/aree/' + this.currentArea.slugTranslation)
          }

          if (Object.keys(this.$route.params).length === 2) {
            this.$router.replace('/aree/' + this.currentArea.slugTranslation + '/' + this.currentVenue.slugTranslation)
          }
        }

        if (this.$route.fullPath.indexOf('percorsi-nel-verde') > -1) {
          if (Object.keys(this.$route.params).length === 1) {
            this.$router.replace('/percorsi-nel-verde/' + this.currentHyke.slugTranslation)
          }
        }

        this.$store.dispatch('appdata/setContentFromRoute', this.$route.params)
      })
    }
  }
}
</script>
