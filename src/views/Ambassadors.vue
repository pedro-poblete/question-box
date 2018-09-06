<template>
  <section>
    <div class="container ambassadors-intro">
      <h1 v-html="$t('ambassadors.title')"></h1>
      <p v-html="$t('ambassadors.description')"></p>
    </div>
    <div class="ambassador">
      <div class="ambassador-header ambassador-header-left">
        <h3>{{$t('ambassadors.nick')}}<span class="age">, 25</span></h3>
        <h4>{{$t('ambassadors.nick_info')}}</h4>
      </div>
      <img src="../assets/nick.jpg" class="fullwidth-image" alt="Nickhil Picture">
      <div class="ambassador-bio">
        <p>{{$t('ambassadors.nick_bio')}}</p>
      </div>
    </div>
    <div class="ambassador">
      <div class="ambassador-header ambassador-header-right">
        <h3>{{$t('ambassadors.zain')}}<span class="age">, 24</span></h3>
        <h4>{{$t('ambassadors.zain_info')}}</h4>
      </div>
      <img src="../assets/Zain.jpeg" class="fullwidth-image" alt="Zain Picture">
      <div class="ambassador-bio">
        <p>{{$t('ambassadors.zain_bio')}}</p>
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
  margin: 50px auto -50px auto;
  position: relative;
  max-width: 450px;
}

.ambassador-header {
  width: auto;
  padding: 15px;
  position: absolute;
  top:-25px;
  background-color: #ffffff;
  z-index: 5;
}

.ambassador-header-left {
  left: 25px;
}

.ambassador-header-right {
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

.ambassador-bio {
  margin: 0 auto;
  width:270px;
  padding: 15px 15px 15px 25px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
}

.ambassador-bio p {
  font-style: italic;
  line-height: 1.7;
  margin-top: 0;
}

.ambassador-bio p::before {
  position:absolute;
  content: " “ ";
  margin: 0;
  padding: 0;
  left: 17px;
  z-index: 100;
}

.ambassador-bio p::after {
  content: " ” ";
  position:absolute;
}

.cta {
  font-size: 1.1em;
  line-height: 1.5;
}

</style>
