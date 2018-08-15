<template>
  <section>
    <div class="container">
      <h1 v-html="$t('answers.title')"></h1>
      <p>{{$t('answers.explanation')}}</p>
      <i18n path="answers.explain_nsfw" tag="p">
        <router-link :to="{ name: 'privacy'}">{{$t('app.privacy')}}</router-link>
      </i18n>
        <input id="searchAnswer" type="text" :placeholder="$t('answers.search')" v-model='searchQuery' @keyup.enter="doSearch">
    </div>
    <article class="question-list">
      <div v-for="question in questions" :key="question.id">
        <AnswerDetails :question="question" />
      </div>
      <div v-if="questions.length == 0" class="question-details">
        <h2>{{$t('answers.no_results')}}</h2>
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
    doSearch () {
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
