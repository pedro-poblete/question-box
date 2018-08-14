<template>
  <section>
    <div class="container">
      <h1 v-html="$t('home.title')"></h1>
      <p v-html="$t('home.description')"></p>
    </div>
    <ActionButtons />
  </section>
</template>

<script>

import ActionButtons from '../components/Home/ActionButtons.vue'

export default {
  name: 'Home',
  components: {
    'ActionButtons': ActionButtons
  }
}
</script>
