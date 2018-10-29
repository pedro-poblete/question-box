<template>
<section>
  <div class="container">
    <h1 v-html="$t('answers.title')"></h1>
    <p>{{$t('answers.explanation')}}</p>
    <p>{{$t('answers.different_languages')}}</p>
    <input id="searchAnswer" type="text" :placeholder="$t('answers.search')" v-model='searchQuery'>
  </div>
  <ul class="question-list container">
    <li v-for="(question, index) in questions" :key="question.id">
      <router-link :to="{ name: 'AnswerDetails', params: {id: question.id}, query: {i : index} }">{{question.text}}</router-link>
    </li>
  </ul>
  <div v-if="questions.length == 0" class="expanding-content">
    <h2 v-if="searchQuery">{{$t('answers.no_results')}}</h2>
    <h2 v-else>{{$t('answers.empty_state')}}</h2>
  </div>

</section>
</template>

<script>

export default {
  beforeCreate () {
    this.$store.dispatch('fetchQandA')
  },
  name: 'Answers',
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    questions () {
      return this.$store.state.questionsAndAnswers.filter(question => {
        let searchSpace = JSON.stringify(question).toLowerCase()
        let allKeywords = true
        // OR SEARCH
        // let searchSpace = JSON.stringify(question).toLowerCase()
        // for (var keyword of this.searchQuery.toLowerCase().split(" ")) {
        //   if (searchSpace.includes( keyword ) ) {
        //     return true
        //   }
        for (var keyword of this.searchQuery.toLowerCase().split(' ')) {
          if (!searchSpace.includes(keyword)) {
            allKeywords = false
          }
        }
        return allKeywords
      })
    }
  }
}
</script>

<style>
#searchAnswer {
  margin-top: 30px;
  margin-bottom: 0px;
}

.question-list {
  margin-top: 50px;
}

.question-list li {
  font-size: 24px;
  line-height: 33px;
  margin-top: 25px;
  margin-bottom: 25px;
  color: #4BC2F9;
}

</style>
