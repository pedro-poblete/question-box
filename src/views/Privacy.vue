<template>
  <section class="privacy">
    <div class="container">
      <h1 v-html="$t('privacy.title')"></h1>
      <h3>{{$t('privacy.subheader')}}</h3>
      <div v-html="$t('privacy.description')"></div>
    </div>
    <div class="question-details" :class="{'colored-border' : showIncognitoHelp }" >
      <h2 @click="showIncognitoHelp = !showIncognitoHelp">{{$t('privacy.incognito_title')}}</h2>
      <div v-html="$t('privacy.incognito_instructions')" v-if="showIncognitoHelp"></div>
    </div>
    <div class="container privacy-settings">
      <h2>{{$t('privacy.notifications_title')}}</h2>
      <div v-html="$t('privacy.notifications_explanation')"></div>
      <div class="notifications-options">
        <label for="emailNotification">{{$t('privacy.notifications_email')}}</label>
        <input type="checkbox"
               name="emailNotification"
               value="true"
               v-model="emailNotification">
        <input id="email"
               type="email"
               :placeholder="$t('followupquestions.enter_email')"
               v-if="emailNotification"
               v-model="email">
        <label for="pushNotification">{{$t('privacy.notifications_push')}}</label>
        <input type="checkbox"
               name="emailNotification"
               value="true"
               v-model="pushNotification">
      </div>
      <h2>{{$t('privacy.offline_data_title')}}</h2>
      <div v-html="$t('privacy.offline_data_explanation')"></div>
      <input type="button"
             :value="$t('privacy.delete_button')"
             class="button small-button"
             @click="localStorage.clear()">
      <p>SOMETHING</p>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Privacy',
  data () {
    return {
      showIncognitoHelp: false
    }
  }
}
</script>

<style>

.privacy h1 {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.privacy-settings h2 {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1em;
}

.privacy h3 {
  font-weight: 400;
  font-size: 1.3em;
}

.privacy p {
  line-height: 1.5;
}

</style>
