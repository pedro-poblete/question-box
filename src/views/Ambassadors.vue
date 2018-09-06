<template>
  <section>
    <div class="container ambassadors-intro">
      <h1 v-html="$t('ambassadors.title')"></h1>
      <p v-html="$t('ambassadors.description')"></p>
    </div>
    <div class="ambassador">
      <div class="ambassador-header">
        <h3>{{$t('ambassadors.nick')}}<span class="age">, 25</span></h3>
        <h4>{{$t('ambassadors.nick_info')}}</h4>
      </div>
      <img src="../assets/nick.jpg" class="fullwidth-image" alt="Nickhil Picture">
      <div class="ambassador-bio">
        <p>{{$t('ambassadors.nick_bio')}}</p>
      </div>
    </div>
    <div class="container">
      <h2>{{$t('ambassadors.join_us')}}</h2>
      <p v-html="$t('ambassadors.cta')" class="cta"></p>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Ambassadors'
}
</script>

<style>

.ambassadors-intro p {
  line-height: 1.5;
}

.ambassador {
  margin: 75px auto 0 auto;
  position: relative;
  max-width: 450px;
}

.ambassador-header {
  width: auto;
  padding: 15px;
  position: absolute;
  top:-25px;
  left: 25px;
  float: left;
  background-color: #ffffff;
  z-index: 10;
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

.ambassador-bio {
  margin: 0 auto;
  width:300px;
  padding: 15px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
}

.ambassador-bio::after {
  content: " “ ";
  font-family: serif;
  font-size: 46px;
  color: #B0B0B0;
  line-height: 1;
  text-align: center;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 2px;
  right: -2px;
  /* background-color: #ffffff; */

}

.ambassador-bio p {
  font-style: italic;
  line-height: 1.7;
  margin-top: 0;
}

.cta {
  font-size: 1.1em;
  line-height: 1.5;
}

</style>
