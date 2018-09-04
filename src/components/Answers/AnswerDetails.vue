<template>
  <div class="question-details"
       :class="{'colored-border' : showQuestion }">
    <h2 @click="questionClicked()">{{ text }}</h2>
    <div class="answer-body"
         v-if="showQuestion">
      <p class="short-answer"> {{ short_answer}}</p>
      <button class="more"
              @click="showLongAnswer = true"
              v-if="!showLongAnswer">{{$t('answerdetails.more')}}</button>
      <div class="long-answer"
           v-html="long_answer"
           v-if="showLongAnswer"> </div>
      <div class="media"
           v-for="media in question.answer.media"
           v-if="showLongAnswer">
        <div v-html="media.media_html_embed"
             v-if="showLongAnswer"
             :class="{'nsfw-media' : media.is_media_nsfw }"
             class="media-insert"></div>
          <div v-if="media.is_media_nsfw" class="nsfw-filter" @click="media.is_media_nsfw = false">
            <p><strong>{{$t('answerdetails.cont_warn')}}</strong></p>
            <p>{{$t('answerdetails.explicit_content')}}</p>
            <p>{{$t('answerdetails.click_dismiss')}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'AnswersDetails',
  props: ['question'],
  data () {
    return {
      showQuestion: false,
      showLongAnswer: false
    }
  },
  computed: {
    text () {
      if (this.$i18n.locale === 'de') {
        return this.question.text.de
      }
      else {
        return this.question.text.en
      }
    },
    short_answer () {
      if (this.$i18n.locale === 'de') {
        return this.question.answer.short_answer.de
      }
      else {
        return this.question.answer.short_answer.en
      }
    },
    long_answer () {
      if (this.$i18n.locale === 'de') {
        return marked(this.question.answer.long_answer.de)
      }
      else {
        return marked(this.question.answer.long_answer.en)
      }
    },
  },
  methods: {
    questionClicked () {
      this.showQuestion = !this.showQuestion
      if (this.showQuestion) {
        this.$store.dispatch('updateQuestionViews', this.question)
      }
    }
  }
}
</script>

<style>

/* TODO: THE OVERLAY MEDIA FILTER IS HACKY AS HELL ; AS SOON AS I CAN I'LL FIX THIS. I'M NOT PROUD AT ALL */
/* TODO: ALSO, ABOVE THE MEDIA IS JUST PICKING UP ONE, NEED TO MAKE IT A FOR LOOP */

.media {
  margin-top: 40px;
  padding-bottom: 174px;
}

.media-insert {
  position: absolute;
  z-index: 1;
}

.nsfw-filter {
  width:300px;
  height:174px;
  z-index: 2;
  background: url('../../assets/content-warning.jpg') no-repeat right top;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* top: -174px; */
  margin-bottom: -174px;
}

.nsfw-filter p {
  color: #ffffff;
  font-size: 0.8em;
  line-height: 1.2;
  margin: 10px 25px;
  text-align: center;
}

.question-details {
  padding-left: 25px;
  width:300px;
  border-radius: 10px;
  margin: 30px auto;
  border-left: 6px double #ffffff;
  border-right: 6px double #ffffff;

}

.colored-border {
  border-left: 6px double #0090F2;
}

.question-details h2 {
  color: #0090F2;
}

.short-answer {
  font-size: 1.2em;
  line-height: 1.5;
}

.more {
  padding:0;
  border: 0;
  background: 0;
  color: #0090F2;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-family: 'Nato Sans', sans-serif;
}

.long-answer {
  font-size: 0.9em;
}
</style>
