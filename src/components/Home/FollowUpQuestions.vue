<template>
  <div class="question-form container follow-up">
    <transition name="appearDown">
    <div v-if="!additionalInfoSent">
    <h2>{{$t('followupquestions.thanks')}}</h2>
    <p class="small">{{$t('followupquestions.answer_soon')}}</p>
    <form @submit.prevent="handleFinalSubmit">
      <fieldset id="notifications">
        <legend>{{$t('followupquestions.want_notification')}}</legend>
        <div class="yes-no-buttons">
          <input type="button"
                 :value="$t('followupquestions.yes')"
                 class="button small-button highlight-button"
                 @click="showNotificationOptions(true)">
          <input type="button"
                 :value="$t('followupquestions.no')"
                 class="button small-button"
                 @click="showNotificationOptions(false)">
         </div>
      </fieldset>
        <label for="email"
               v-if="showNotification">{{$t('followupquestions.email_notif')}}</label>
      <input id="email"
             type="email"
             :placeholder="$t('followupquestions.enter_email')"
             v-if="showNotification"
             v-model="email"
             @keydown.enter.stop.prevent>
      <div class="checkbox-and-label" v-if="showNotification">
        <input id="pushNotification"
               type="checkbox"
               name="pushNotification"
               value="true"
               v-model="askedPermission"
               @click="askPermission()"
               v-if="!askedPermission">
        <label for="pushNotification"
               v-if="!askedPermission">{{$t('followupquestions.push_notif')}}</label>
        <p class="small" v-if="askedPermission">{{permissionResponse}}</P>
      </div>
      <fieldset id="extraInformation">
        <legend>{{$t('followupquestions.more_info')}}</legend>
        <label for="age">{{$t('followupquestions.age')}}</label>
        <input id="age"
               type="number"
               min="5"
               max="150"
               steps="1"
               v-model="age"
               @keydown.enter.stop.prevent>
        <textarea :placeholder="$t('followupquestions.additional_details')"
                  v-model="additionalInformation"></textarea>
        <textarea id="extraQ1"
                  :placeholder="$t('followupquestions.extra_question')"
                  v-model="additionalQuestion"></textarea>
      </fieldset>
      <button type="submit"
              class="button highlight-button small-button">{{$t('followupquestions.done')}}</button>
      <i18n path="followupquestions.privacy_reminder" tag="p">
        <router-link :to="{ name: 'privacy'}">{{$t('app.privacy')}}</router-link>
      </i18n>
    </form>
    </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'FollowUpQuestions',
  props: ['questionId'],
  data () {
    return {
      showNotification: false,
      additionalQuestion: '',
      additionalInformation: '',
      additionalInfoSent: false,
      askedPermission: false,
      permissionResponse: '',
      email : '',
      subscription : '',
      age : ''
    }
  },
  computed: {
    questionTextLocated () {
      if (this.$i18n.locale === 'de') {
        return { 'de': this.additionalQuestion }
      } else {
        return { 'en': this.additionalQuestion }
      }
    },
  },
  methods: {
    // TODO: ADD i18n support
    askPermission() {
      if (!"Notification" in window) {
        this.permissionResponse = "This browser does not support system notifications, try with your email."
      }
      else if (Notification.permission === "granted") {
        this.$store.dispatch('subscribePushNotification', {'questionId' : this.questionId})
        this.permissionResponse = "Subscription sent!"
      } else if (Notification.permission === "default") {
        Notification.requestPermission()
        this.askPermission()
      } else if (Notification.permission === "denied") {
        this.permissionResponse = "You've previously rejected system notifications.  You'll have to enabled them manually."
      }
    },
    showNotificationOptions (choice) {
      this.showNotification = choice
      if (!choice) {
        let nextElement = document.getElementById('extraInformation')
        nextElement.scrollIntoView()
      }
    },
    handleFinalSubmit () {
      this.$store.dispatch('submitAdditionalInformation', {
        'questionId': this.questionId,
        'additional_details': this.additionalInformation,
        'asker_age': this.age
      })
      if (this.additionalQuestion) {
        this.$store.dispatch('sendNewQuestion', {
          'text': this.questionTextLocated,
          'additional_details': this.additionalInformation,
          'related_question': this.questionId,
          'asker_age': this.age
        })
      }
      if (email) {
        this.$store.dispatch('subscribeEmail', {
          'questionId' : this.questionId,
          'email' : this.email
        })
      }

      this.additionalInfoSent = true
      this.$emit('additionalDetails')
    }
  }
}

</script>

<style>

.follow-up {
  margin-top: 75px;
  margin-bottom: 75px;
}

.follow-up form fieldset {
  margin-top: 40px;
  padding: 0;
}

.yes-no-buttons {
  display:flex;
  justify-content: center;
}

.yes-no-buttons input[type=button]{
  width: 75px;
  margin: 20px;
  display:inline-block;
  line-height: normal;
}

.checkbox-and-label {
  display:flex;
  flex-direction: row;
  margin-top:25px;
  margin-bottom:10px;
}

.checkbox-and-label input {
  margin-right:10px;
}

.follow-up #email {
  margin-top: 5px;
  width:100%;
  font-family: 'Noto Sans', sans-serif;
}

#extraInformation legend {
  margin-bottom: 25px;
  font-size: 1.3em;
}

#extraInformation input[type=number] {
  display:inline-block;
  font-family: 'Noto Sans', sans-serif;
}

.small {
  line-height: 2;
  font-size: 0.8em;
}

</style>
