<template>
  <section>
    <div class="container about-title">
      <h1 v-html="$t('about.title')"></h1>
    </div>
    <div>
      <img src="../assets/about_project.jpg" class="fullwidth-image" alt="Team Picture">
    </div>
    <div class="text-over-image">
      <i18n path="about.description" tag="p" class="about-description">
        <em>{{$t('app.app_name')}}</em>
        <router-link :to="{ name: 'ambassadors'}">{{$t('about.young_people')}}</router-link>
      </i18n>
    </div>
    <div class="container about-team">
      <h2>{{$t('about.team_title')}}</h2>
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

.about-title {
  margin-bottom: 30px;
}

/* TODO: MOVE THIS TO ANOTHER COMPONENT */
.fullwidth-image {
  width: 100%;
  margin:auto;
  display:block;
}

.text-over-image {
  margin: 0 auto;
  width: 270px;
  padding: 15px 15px 15px 25px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
}

@media screen and (min-width: 450px) {

  .text-over-image {
    width: 325px;
  }

}

@media screen and (min-width: 570px) {

  .text-over-image {
    width: 480px;
  }

}

.about-description {
  margin: 0;
  font-size: 20px;
  line-height: 30px;
}

.about-team {
  margin: 0 auto 50px auto;
}

.about-team p {
  margin-top: 0;

}

</style>
