<template>
  <section>
    <div class="container">
      <h1 v-html="$t('about.title')"></h1>
      <img src="../assets/about_project.jpg" class="fullwidth-image" alt="Team Picture">
      <p v-html="$t('about.description')"></p>
      <img src="../assets/qb-team.jpg" class="fullwidth-image" alt="Team Picture">
      <p>{{$t('about.about_project')}}</p>
    </div>
  </section>
</template>

<script>

export default {
  name: 'About'
}
</script>

<style>
.fullwidth-image {
  width: 100%;
}
</style>
