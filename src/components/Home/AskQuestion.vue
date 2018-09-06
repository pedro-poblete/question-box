<template>
  <div class="question-form container">
    <form @submit.prevent="handleInitialSubmit">
      <textarea :placeholder="$t('askquestion.what_q')"
                v-model="questionText"
                required
                :disabled="asked"></textarea>
      <button type="submit"
              class="button highlight-button small-button"
              :disabled="asked">{{$t('askquestion.submit')}}</button>
    </form>
    <transition name="appearDown">
      <FollowUpQuestions v-if="asked" :questionId='questionId' @additionalDetails="allInfoSent"/>
    </transition>
  </div>
</template>

<script>
import FollowUpQuestions from './FollowUpQuestions.vue'

export default {
  name: 'askQuestion',
  computed: {
    questionTextLocated () {
      if (this.$i18n.locale === 'de') {
        return { "de": this.questionText }
      } else {
        return { "en": this.questionText }
      }
    }
  },
  data () {
    return {
      questionText: '',
      questionId: '',
      asked: false,
      additionalInfoSent: false
    }
  },
  components: {
    'FollowUpQuestions': FollowUpQuestions
  },
  methods: {
    handleInitialSubmit (event) {
      this.$store.dispatch('sendNewQuestion', {'text': this.questionTextLocated})
        .then((response) => { this.questionId = response })
      this.asked = true
    },
    allInfoSent () {
      this.$emit('allSent')
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
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 20px;
}

.question-form fieldset {
  margin: 0;
  border: 0;
}

.question-form {
  margin-bottom: 50px;
}
</style>
