<template>
  <div class="nav-bar">
    <ul class="nav-bar-items">
      <router-link :to="{name: 'home'}" tag="li" class="nav-bar-item" exact-active-class="nav-bar-item-active">
        {{$t('app.home')}}
      </router-link>
      <router-link :to="{name: 'ask'}" tag="li" class="nav-bar-item" exact-active-class="nav-bar-item-active">
        {{$t('app.ask')}}
      </router-link>
      <router-link :to="{name: 'previousAnswers'}" tag="li" class="nav-bar-item" exact-active-class="nav-bar-item-active">
        {{$t('app.answers')}}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
}
</script>

<style>

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  z-index: 10;
}

.nav-bar-items {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: #00A9F8;
  box-shadow: 0px 2px 16px 3px rgba(0, 0, 0, 0.20);
  height:55px;
  flex-direction: row;
  align-items: stretch;
}

.nav-bar-item {
  text-transform: uppercase;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 2px;
  font-size: 0.8em;
  display: flex;
  flex-grow: 1;
  flex-basis: 90px;
  align-items: flex-end;
  padding-bottom: 10px;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-bar-item-active {
  color: rgba(255,255,255, 1);
  border-bottom: 2px #ffffff solid;
}
</style>
