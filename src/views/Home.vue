<template>
<section class="home">
  <div class="container">
    <h1>{{$t('home.title')}}</h1>
    <span class="under">{{$t('home.subtitle')}}</span>
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
  margin-bottom: 1px;
}

.under {
  color: #7E7F80;
  font-style:italic;
}

</style>
