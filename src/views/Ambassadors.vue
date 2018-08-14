<template>
  <section>
    <div class="container">
      <h1 v-html="$t('ambassadors.title')"></h1>
      <p v-html="$t('ambassadors.description')"></p>
    </div>
    <div class="container ambassador">
      <h3>{{$t('ambassadors.nick')}}</h3>
      <img src="../assets/nick.jpg" class="fullwidth-image" alt="Nickhil Picture">
      <p>{{$t('ambassadors.nick_bio')}}</p>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Ambassadors'
}
</script>

<style>
.ambassador {
  margin-top:50px;
}

.ambassador h3 {
  font-size: 1em;
  color: #0090F2;
}

.ambassador p {
  font-style: italic;
  line-height: 1.7;
}

</style>
