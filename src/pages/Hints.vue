<template>
  <q-page class="flex column">
    <q-card>
      <q-card-section
        v-if="appData"
        class="overflow-hidden"
      >
        <div class="static-page-container q-pb-xl" v-html="appData.hints.post_content" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageHints',
  computed: {
    ...mapGetters('appdata', ['appData'])
  }
}
</script>
