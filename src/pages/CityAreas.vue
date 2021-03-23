<template>
  <q-page class="flex column">
    <div v-if="appData" class="area-list-container q-pa-md">
      <q-card
        v-for="area in appData.aree"
        :key="area.id"
        class="q-mb-md"
        @click="navigateToArea(area)"
      >
        <div class="bg-primary">
          <q-img
            :src="area.image ? area.image : ''"
            :ratio="4/3"
            contain
            class="area-image"
          >
            <div class="absolute-bottom text-h5 text-weight-bold">{{ area.name }}</div>
          </q-img>
        </div>

        <q-card-section class="overflow-hidden">
          <p class="q-mb-none ellipsis-3-lines">{{ area.description || '---' }}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn @click="navigateToArea(area)" flat>{{ $t('cityAreasPage.card') }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageAreas',
  computed: {
    ...mapGetters('appdata', ['appData'])
  },
  methods: {
    navigateToArea(area) {
      this.$store.commit('appdata/SET_CURRENT_AREA', area)
      this.$router.push('/aree/' + area.slug)
    }
  }
}
</script>
