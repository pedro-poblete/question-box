<template>
  <div class="error">
    <div class="container">
      <h2>{{$t('error404.error404')}}</h2>
      <h1>{{$t('error404.title')}}</h1>
      <i18n path="error404.body" tag="p">
        <router-link :to="{ name: 'home'}">{{$t('app.home').toLowerCase()}}</router-link>
    </i18n>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Error404'
}
</script>

<style>
  .error {
    padding-top: 10vh;
    background-color: #FB8A90;
    width: 100vw;
    height: 90vh;
    color: #ffffff;
    z-index: 10000;
    position: absolute;
    top: 0;
  }

  .error h2 {
    font-size: 12px;
    color: #FBD6D7;
    margin-bottom: 50px;
  }

  .error h1 {
    text-transform: none;
    font-size: 24px;
    line-height: 33px;
    margin-bottom: 35px;
  }

  .error p {
    font-size: 20px;
    line-height: 33px;
  }

  .error a {
    color: #7A4347;
    text-decoration: underline;
  }

</style>
