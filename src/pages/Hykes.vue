<template>
  <q-page class="flex column">
    <div v-if="appData" class="area-list-container q-pa-md">
      <q-card
        v-for="hyke in appData.percorsi"
        :key="hyke.id"
        class="q-mb-md"
        @click.prevent="navigateToHyke(hyke)"
      >
        <div class="bg-secondary">
          <q-img
            :src="hyke.image"
            :ratio="4/3"
            cover
            class="hyke-image"
          >
            <div class="absolute-bottom text-h5 text-weight-bold">{{ hyke.title }}</div>
          </q-img>
        </div>

        <q-card-section class="overflow-hidden">
          <p class="q-mb-none ellipsis-3-lines">{{ hyke.content || '---' }}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn @click.prevent="navigateToHyke(hyke)" flat>{{ $t('hykesPage.card') }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageHykes',
  computed: {
    ...mapGetters('appdata', ['appData'])
  },
  methods: {
    navigateToHyke(hyke) {
      this.$store.commit('appdata/SET_CURRENT_HYKE', hyke)
      this.$router.push('/percorsi-nel-verde/' + hyke.slug)
    }
  }
}
</script>
