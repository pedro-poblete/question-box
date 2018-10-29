<template>
  <section class="question-answers">
    <div class="container">
      <h2>{{$t('answerdetails.question')}}</h2>
      <h1>{{question.text}}</h1>
    </div>
    <div class="answer" v-for="answer in question.answers" :key="answer.ambassador.name">
      <div class="ambassador-card container">
        <router-link :to="'/ambassadors#'+answer.ambassador.name">
          <img :src="answer.ambassador.picture" class="ambassador-badge" alt="">
        </router-link>
        <router-link :to="'/ambassadors#'+answer.ambassador.name">
          <p>{{answer.ambassador.name}}</p>
        </router-link>
      </div>
      <div class="quote container">
        <p>
          {{answer.quote}}
        </p>
        <button class="more" @click="showAnswerOf(answer.ambassador.name)">
          <span v-if="showingAnswer.includes(answer.ambassador.name)">{{$t('answerdetails.less')}}</span>
          <span v-else>{{$t('answerdetails.more')}}</span>
        </button>
      </div>
      <div class="main-text" v-html="markdown(answer.main_text)" v-if="showingAnswer.includes(answer.ambassador.name)">
      </div>
      <div class="embed-container" v-if="answer.video && showingAnswer.includes(answer.ambassador.name)">
        <iframe :src="answer.video+'?mute=1'" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="container">
      <div class="exit-link">
        <h2 v-if="$route.query.i > 0" class="previous">
          <router-link
          :to="{ name: 'AnswerDetails', params: {id : previousQuestionId}, query: {i : $route['query']['i'] - 1 } }">
            {{$t('answerdetails.previous')}}
          </router-link>
        </h2>
        <h2 v-if="$route.query.i < numberOfQuestions -1" class="next">
          <router-link
          :to="{ name: 'AnswerDetails', params: {id : nextQuestionId}, query: {i : $route['query']['i'] + 1} }">
            {{$t('answerdetails.next')}}
          </router-link>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'

export default {
  beforeCreate () {
    this.$store.dispatch('fetchQandA')
    if (!this.$store.state.questionsAndAnswers.map(el => { el = el.id }).includes(this.$route.params.id)) {
      // ID not found, testing if exists in any other language
      let tryLocalStorage = JSON.parse(window.localStorage.getItem('questions'))
        .find(el => el.id === this.$route.params.id)

      if (tryLocalStorage) {
        // ID found. Changing locale in this component to one where answer exists.
        this.$store.dispatch('setPreferredLocale', Object.keys(tryLocalStorage.text)[0])
      } else {
        // ID not found. Pushing 404.
        this.$router.push({ name: 'Error404' })
      }
    }
  },
  name: 'AnswerDetails',
  data () {
    return {
      showingAnswer: [],
      numberOfQuestions: this.$store.state.questionsAndAnswers.length
    }
  },
  computed: {
    question () {
      return this.$store.state.questionsAndAnswers.find(el => el.id === this.$route.params.id)
    },
    locale () {
      return this.$i18n.locale
    },
    previousQuestionId () {
      if (this.$store.state.questionsAndAnswers[this.$route.query.i - 1]) {
        return this.$store.state.questionsAndAnswers[this.$route.query.i - 1].id
      } else {
        return ''
      }
    },
    nextQuestionId () {
      if (this.$store.state.questionsAndAnswers[this.$route.query.i + 1]) {
        return this.$store.state.questionsAndAnswers[this.$route.query.i + 1].id
      } else {
        return ''
      }
    }
  },
  watch: {
    locale () {
      let newQuestion = this.$store.state.questionsAndAnswers.find(el => el.id === this.$route.params.id)
      if (newQuestion && newQuestion !== this.question) {
        this.question = newQuestion
        this.numberOfQuestions = this.$store.state.questionsAndAnswers.length
      }
    },
    $route (to, from) {
      this.showingAnswer = []
    }
  },
  methods: {
    markdown (string) {
      return marked(string)
    },
    showAnswerOf (ambassador) {
      if (this.showingAnswer.includes(ambassador)) {
        this.showingAnswer = this.showingAnswer.filter(el => el !== ambassador)
      } else {
        this.showingAnswer.push(ambassador)
      }
    }
  }
}
</script>

<style>

.exit-link {
  display: flex;
  flex-direction: row;
  width:100%;
}

.exit-link a {
  color: #255F79;
}

.exit-link .previous {
  align-self: flex-start;
  margin-right: auto;
}

.exit-link .next {
  margin-left:auto;
}

.question-answers h1 {
  text-transform: none;
  font-weight: 400;
  margin-top: 25px;
  margin-bottom: 75px;
}

.question-answers h2 {
  font-size: 12px;
  color: #7E7F80;
}

.answer {
  margin-bottom: 100px;
}

.answer:last-child {
  margin-bottom: 0;
}

.ambassador-card {
  display: flex;
  align-items: center;
}

.ambassador-card p {
  font-size: 24px;
}

.ambassador-card a {
  color: inherit;
}

.ambassador-badge {
  width: 75px;
  min-width: 75px;
  min-height: 75px;
  height: 75px;
  border-radius: 50%;
  margin-right: 25px;
  position: relative;
}

.ambassador-badge::before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  min-height: 75px;
  width: 75px;
  background-color: rgb(230, 230, 230);
  border: 2px dotted rgb(200, 200, 200);
  border-radius: 50%;
}

.quote p {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
  line-height: 33px;
  position: relative;
}

.quote p::before {
  content: " “ ";
  position:absolute;
  left: -13px;
  padding: 0;
}

.quote p::after {
  content: " ” ";
  position:relative;
}

.more {
  padding:0;
  border: 0;
  background: 0;
  color: #4BC2F9;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: 'Nato Sans', sans-serif;
  font-size: 12px;
}

.main-text p, .main-text ul {
  margin-left: auto;
  margin-right: auto;
  width: 270px;
  background-color: #ffffff;
}

.main-text ul {
  padding-left: 0;
}

.main-text li {
  margin-bottom: 25px;
}

@media screen and (min-width: 450px) {
  .main-text p, .main-text ul {
    width: 325px;
  }
}

@media screen and (min-width: 570px) {
  .main-text p, .main-text ul {
    width: 480px;
  }
}

.main-text img {
  width: 100%;
  max-width: 560px;
  margin:auto;
  display:block;
}

.main-text blockquote {
  padding: 0;
  margin: 0;
}

.main-text blockquote p {
  margin: 0;
  padding: 0;
  width: auto;

}

.main-text blockquote + p {
  margin: 0 auto;
  padding: 15px 15px 15px 25px;
  top: -50px;
  position: relative;
  background-color: #ffffff;
  margin-bottom: -50px;
  box-sizing: border-box;
}

.embed-container {
  margin-top: 50px;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  max-width: 560px;
}

@media screen and (min-width: 570px) {
  .embed-container {
    padding-bottom: 371px;
  }
}

.embed-container iframe, .embed-container object, .embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
