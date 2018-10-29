<template>
  <section>
    <div class="container ambassadors-intro">
      <h1 v-html="$t('ambassadors.title')"></h1>
      <p v-html="$t('ambassadors.description')"></p>
    </div>
    <div class="ambassador" :id="ambassador.name" v-for="(ambassador, index) in ambassadors" :key="ambassador.id">
      <div class="ambassador-header" :class="'ambassador-header-' + (index % 2) ">
        <h3>{{ambassador.name}}<span class="age">, {{ambassador.age}}</span></h3>
        <h4>{{ambassador.location}}</h4>
      </div>
      <img :src="ambassador.picture" :alt="$t('ambassadors.picture_alt')+ ' ' + ambassador.name" class="ambassador-picture">
      <div class="ambassador-body">
        <p class="ambassador-bio">{{ambassador.bio}}</p>
      </div>
    </div>
    <div class="container cta">
      <h2>{{$t('ambassadors.join_us')}}</h2>
      <i18n path="ambassadors.cta" tag="p" class="cta">
        <a :href="'mailto:'+$t('privacy.contact_email')">{{$t('privacy.contact_email')}}</a>
      </i18n>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Ambassadors',
  beforeCreate () {
    this.$store.dispatch('fetchAmbassadors')
  },
  computed: {
    ambassadors () {
      return this.$store.state.ambassadors
    }
  },
  methods: {
  }
}

</script>

<style>

.ambassadors-intro {
  margin-bottom: 60px;
}

.ambassadors-intro p {
  line-height: 1.5;
}

.ambassador {
  margin: 50px auto -50px auto;
  position: relative;
  max-width: 450px;
}

@media screen and (min-width: 450px) {
  .ambassador {
    margin: 50px auto -30px auto;
  }
}

.ambassador-header {
  width: auto;
  padding: 15px 15px 5px 15px;
  position: absolute;
  top:-30px;
  background-color: #ffffff;
  z-index: 5;
}

.ambassador-header-0 {
  left: 25px;
}

.ambassador-header-1 {
  right: 25px;
}

.age {
  font-size: 0.6em;
}

.ambassador-header h3 {
  font-size: 1.5em;
  margin: 0;
  font-weight: 400;
}

.ambassador-header h4 {
  margin: 0;
  line-height: 2.5em;
  font-size: 0.8em;
  font-weight: 400;
}

.ambassador-picture {
  width: 100%;
  max-width: 450px;
  min-height: 320px;
  margin:auto;
  display:block;
}

.ambassador-picture::before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  min-height: 300px;
  width: 100%;
  background-color: rgb(230, 230, 230);
  border: 2px dotted rgb(200, 200, 200);
  border-radius: 5px;
}

.ambassador-picture::after {
  content: "📶 " attr(alt);
  display: block;
  font-size: 16px;
  font-style: normal;
  color: rgb(100, 100, 100);
  position: absolute;
  top:230px;
  left: 0;
  width:100%;
  min-height:300px;
  text-align: center;
  margin:auto;
}

.ambassador-body {
  margin: 0 auto;
  width: 270px;
  padding: 15px 15px 15px 25px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
}

@media screen and (min-width: 450px) {
  .ambassador-body {
    width: 325px;
  }
}

.ambassador-bio {
  line-height: 1.7;
  margin-top: 0;
}

.ambassador-bio::before {
  position:absolute;
  content: " “ ";
  margin: 0;
  padding: 0;
  left: 17px;
  z-index: 100;
}

.ambassador-bio::after {
  content: " ” ";
  position:absolute;
}

.cta {
  margin-top: 35px;
}

@media screen and (min-width: 450px) {
  .cta {
    margin-top: 75px;
  }
}

.cta p {
  margin-top: 0;
  font-size: 14px;
  line-height: 25px;
}

</style>
