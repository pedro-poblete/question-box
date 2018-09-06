<template>
  <section class="home">
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

<style>

.home h1 {
  text-transform: none;
  font-weight: 400;
  letter-spacing: 0;

}

</style>
