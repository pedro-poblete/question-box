<template>
  <div class="question-form container follow-up">
    <h2>Thank you for your question</h2>
    <p class="small"> We will answer your question within a week.</p>
    <form @submit.prevent="handleFinalSubmit">
      <fieldset id="notifications">
        <legend>Do you want a notification when your question is answered?</legend>
        <div class="yes-no-buttons">
          <input type="button"
                 value="Yes"
                 class="button small-button highlight-button"
                 @click="showNotificationOptions(true)"
                 :disabled="additonalInfoSent">
          <input type="button"
                 value="No"
                 class="button small-button"
                 @click="showNotificationOptions(false)"
                 :disabled="additonalInfoSent">
         </div>
      </fieldset>
      <div class="checkbox-and-label">
        <input id="emailNotification"
               type="checkbox"
               name="emailNotification"
               value="true"
               v-if="showNotification"
               v-model="emailNotification"
               :disabled="additonalInfoSent">
        <label for="emailNotification"
               v-if="showNotification">I want to receive an email notification</label>
      </div>
      <input id="email"
             type="email"
             placeholder="Please enter your email"
             v-if="emailNotification"
             v-model="email"
             :disabled="additonalInfoSent">
      <div class="checkbox-and-label" v-if="showNotification">
        <input id="pushNotification"
               type="checkbox"
               name="pushNotification"
               value="true"
               v-model="pushNotification"
               :disabled="additonalInfoSent">
        <label for="pushNotification">I want to receive a notification in my phone</label>
      </div>
      <fieldset id="extraInformation">
        <legend>More information to answer question better. Communicate not obligatory</legend>
        <label for="birthday">Enter your date of birth. This will help us better answer your question</label>
        <input id="birthday"
               type="date"
               v-model="birthday"
               :disabled="additonalInfoSent">
        <textarea placeholder="Is there anything else you'll like to share with us that you may or may not want to be reflected in the answer directly?"
                  v-model="additionalInformation"
                  :disabled="additonalInfoSent"></textarea>
        <textarea id="extraQ1"
                  placeholder="If you have an additional question, you can ask it here. We will try to answer it as well in a week's time."
                  v-model="additionalQuestion"
                  :disabled="additonalInfoSent"></textarea>
      </fieldset>
      <button type="submit"
              class="button highlight-button small-button"
              :disabled="additonalInfoSent">Done</button>
    </form>
    <p>You can always <a href=''>visit the privacy page</a> to change your notification settings.</p>
    <h2 v-if="additonalInfoSent">Additional details sent to the server. Thank you! We'll get back in touch as soon as possible.</h2>
  </div>
</template>

<script>

export default {
  name: 'FollowUpQuestions',
  props: ['questionId'],
  data () {
    return {
      showNotification: false,
      // ADDITIONAL QUESTION AND INFORMATION TO BE ADDED TO THE STATE LATER
      additionalQuestion: '',
      additionalInformation: '',
      additonalInfoSent: false
    }
  },
  computed: {
    emailNotification: {
      get () {
        return this.$store.state.emailNotification
      },
      set (state, payload) {
        this.$store.commit('updateEmailNotification', state)
      }
    },
    email: {
      get () {
        return this.$store.state.email
      },
      set (state, payload) {
        this.$store.commit('updateEmail', state)
      }
    },
    pushNotification: {
      get () {
        return this.$store.state.pushNotification
      },
      set (state, payload) {
        this.$store.commit('updatePushNotification', state)
      }
    },
    birthday: {
      get () {
        return this.$store.state.birthday
      },
      set (state, payload) {
        this.$store.commit('updateBirthday', state)
      }
    },
  },
  methods: {
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
                            'additional_details': this.additionalInformation } )
      if (this.additionalQuestion) {
        this.$store.dispatch('sendNewQuestion', {
                                                'text': this.additionalQuestion,
                                                'additional_details': this.additionalInformation,
                                                'related_question': this.questionId
                                              })
      }
      this.additonalInfoSent = true
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
  margin-left: 25px;
  margin-top: 5px;
  font-family: 'Noto Sans', sans-serif;
}

#extraInformation legend {
  margin-bottom: 25px;
  font-size: 1.3em;
}

#extraInformation input[type=date] {
  margin-top: 10px;
  display:block;
  font-family: 'Noto Sans', sans-serif;
}

.small {
  line-height: 2;
  font-size: 0.8em;
}

</style>
