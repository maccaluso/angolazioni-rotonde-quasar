<template>
  <div class="fullscreen q-pa-md bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 20vh; max-width: 100%">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
