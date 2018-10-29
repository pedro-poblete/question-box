<template>
  <div class="question-form container">
    <form @submit.prevent="handleInitialSubmit">
      <label class="block" for="question">{{$t('askquestion.what_q')}}</label>
      <textarea v-model="questionText" id="question" required></textarea>
      <div class="other-fields">
        <label for="age">{{$t('askquestion.age')}} <span class="optional">{{$t('askquestion.optional')}}</span></label>
        <input id="age" type="number" min="5" max="150" steps="1" v-model="age" @keydown.enter.stop.prevent>
      </div>
      <fieldset>
        <legend>{{$t('askquestion.want_notification')}}</legend>
        <div class="checkbox-and-label">
          <input id="pushNotification" type="checkbox" name="pushNotification" value="true" v-model="pushNotification"
          :disabled="notificationStatus === 'denied' || !notificationStatus " @click="askPermission">
          <label for="pushNotification">{{$t('askquestion.mobile_device')}}</label>
        </div>
        <i18n path="askquestion.disabled_notifications" tag="p" v-if="notificationStatus === 'denied'" class="warning">
          <router-link to="/privacy#notifications">{{$t('app.privacy')}}</router-link>
        </i18n>
        <p v-if="!notificationStatus" class="warning">
          {{$t('askquestion.incompatible')}}
        </p>
        <div class="checkbox-and-label">
          <input id="emailNotification" type="checkbox" v-model="emailNotification" value="true">
          <label for="emailNotification">{{$t('askquestion.email')}}</label>
        </div>
        <input id="email" type="email" v-if="emailNotification" v-model="email" @keydown.enter.stop.prevent>
      </fieldset>
      <button type="submit" class="button highlight-button small-button">{{$t('askquestion.submit')}}</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'askQuestion',
  computed: {
    questionTextLocated () {
      if (this.$i18n.locale === 'de') {
        return { 'de': this.questionText }
      } else {
        return { 'en': this.questionText }
      }
    }
  },
  data () {
    return {
      notificationStatus: Notification.permission,
      questionText: '',
      age: '',
      pushNotification: false,
      emailNotification: false,
      email: '',
      questionId: ''
    }
  },
  methods: {
    handleInitialSubmit (event) {
      this.$store.dispatch('sendNewQuestion', { 'text': this.questionTextLocated, 'age': this.age })
        .then(response => {
          this.questionId = response

          if (this.emailNotification) {
            this.$store.dispatch('subscribeEmail', {
              'questionId': this.questionId,
              'email': this.email
            })
          }

          if (this.pushNotification) {
            this.$store.dispatch('subscribePushNotification', { 'questionId': this.questionId })
          }
        })
      this.$emit('sent')
    },
    askPermission () {
      if ('Notification' in window) {
        if (Notification.permission === 'default') {
          Notification.requestPermission()
            .then(result => { this.notificationStatus = result })
        }
      }
    }
  }
}

</script>

<style>

.question-form textarea {
  width: 270px;
  margin: auto;
  display: block;
  height: 300px;
  margin-top: 25px;
  margin-bottom: 20px;
  padding: 20px;
}

@media screen and (min-width: 450px) {

  .question-form textarea {
    width: 325px;
  }

}

.question-form label {
  margin-top: 50px;
}

.question-form fieldset {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  padding: 0;
  width: 270px;
}

@media screen and (min-width: 450px) {

  .question-form fieldset {
    width: 325px;
  }

}

.question-form legend {
  line-height: 25px;
  margin-bottom: 25px;
}

.question-form {
  margin-bottom: 50px;
  max-width: 325px;
}

.question-form input[type=number] {
  display: block;
}

.question-form input[type=email] {
  width: 250px;
  margin-top: 15px;
  margin-left: 20px;
  margin-bottom: 0;
}

@media screen and (min-width: 450px) {

  .question-form input[type=email] {
    width: 305px;
  }

}

.checkbox-and-label input[type=checkbox] {
  width: 25px;
  margin-right:25px;
  margin-left:25px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.warning {
  margin-left: 75px;
  width: 195px;
  margin-top: 0;
  color: #eb361d;
}

.warning a {
  color: #eb361d;
  text-decoration: underline;
}

@media screen and (min-width: 450px) {

  .warning {
    margin-left: 75px;
    width: 250px;
  }
}

.question-form button {
  margin-bottom: 85px;
}

.other-fields {
  margin-top: 50px;
}

.optional {
  color: #7E7F80;
}

</style>
