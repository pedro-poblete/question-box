<template>
  <div class="question-form container">
    <form @submit.prevent="handleInitialSubmit">
      <textarea placeholder="What is your question?"
                v-model="questionText"
                required
                :disabled="ask === 'done'"></textarea>
      <button type="submit"
              class="button highlight-button small-button"
              :disabled="ask === 'done'">Submit</button>
    </form>
    <FollowUpQuestions v-if="ask === 'done'" :questionId='questionId'/>
  </div>
</template>

<script>
import FollowUpQuestions from './FollowUpQuestions.vue'

export default {
  name: 'askQuestion',
  props: [ 'ask' ],
  data () {
    return {
      questionText: '',
      questionId: '',
    }
  },
  components: {
    'FollowUpQuestions': FollowUpQuestions
  },
  methods: {
    handleInitialSubmit (event) {
      this.$store.dispatch('sendNewQuestion', {'text': this.questionText} )
      .then( (response) => { this.questionId = response } )
    this.$emit('questionAsked', 'done')
  }
}
}

</script>

<style>

.question-form textarea {
  width: 260px;
  border-radius: 20px;
  border-color: #0090F2;
  border-width: 2px;
  margin: auto;
  display: block;
  height: 15em;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif;
}

.question-form fieldset {
  margin: 0;
  border: 0;
}
</style>
