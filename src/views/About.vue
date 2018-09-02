<template>
  <section>
    <div class="container about-title">
      <h1 v-html="$t('about.title')"></h1>
    </div>
    <div>
      <img src="../assets/about_project.jpg" class="fullwidth-image" alt="Team Picture">
    </div>
    <div class="about-card">
      <i18n path="about.description" tag="p">
        <em>{{$t('app.app_name')}}</em>
        <router-link :to="{ name: 'ambassadors'}">{{$t('about.young_people')}}</router-link>
      </i18n>
    </div>
    <div class="container about-team">
      <h3>{{$t('about.team_title')}}</h3>
      <div v-html="$t('about.about_project')"></div>
    </div>
    <img src="../assets/qb-team.jpg" class="fullwidth-image" alt="Team Picture">
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
  max-width: 450px;
  margin:auto;
  display:block;
}

.about-title h1 {
  margin-bottom: 50px;
  margin-top: 50px;

}

.about-card {
  margin: 0 auto;
  width:300px;
  padding: 25px 25px 0 25px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
}

.about-card p {
  font-size: 1.25em;
  line-height: 1.5;
  margin: 0;
}

.about-team {
  margin: 0 auto 25px auto;
}

.about-team h3 {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1em;
}

.about-team p {
  line-height: 1.5;
}

</style>
