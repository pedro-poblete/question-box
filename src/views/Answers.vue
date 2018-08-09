<template>
  <section>
    <div class="container">
      <h1>Questions + Answers Page Title</h1>
      <p>Explanation?<br />
        + clarify NSFW title handling (blur/default)</p>
        <input id="searchAnswer" type="text" placeholder="search" v-model='searchQuery' @keyup.enter="doSearch">
    </div>
    <article class="question-list">
      <div v-for="question in questions">
        <AnswerDetails :question="question" :key="question.id" a/>
      </div>
      <div v-if="questions.length == 0" class="question-details">
        <h2>No results available for your search. Please try a searching for something different.</h2>
      </div>
    </article>
  </section>
</template>

<script>
import AnswerDetails from '../components/Answers/AnswerDetails.vue'

export default {
  beforeCreate () {
    this.$store.dispatch('fetchQandA')
  },
  name: 'Answers',
  components: {
    'AnswerDetails': AnswerDetails
  },
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    questions () {
      return this.$store.state.questionsAndAnswers
    },
    showNSFW () {
      return this.$store.state.showNSFW
    }
  },
  methods: {
    doSearch() {
      this.$store.dispatch('searchQuery', this.searchQuery)
    }
  }
}
</script>

<style>
#searchAnswer {
  border-color: #0090F2;
  border-radius: 20px;
  border-width: 2px;
  font-size: 1.5em;
  padding: 10px;
  width: 200px;
  margin: 25px 0 25px 0;
  font-family: 'Noto Sans', sans-serif;
}

</style>
