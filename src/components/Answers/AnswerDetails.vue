<template>
  <div class="expanding-content"
       :class="{'colored-border' : showQuestion }">
    <h2 :class="{'expanding-title-inactive' : !showQuestion }" @click="questionClicked()">{{ text }}</h2>
    <div class="answer-body"
         v-if="showQuestion">
      <p class="first-text"> {{ short_answer}}</p>
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
      } else {
        return this.question.text.en
      }
    },
    short_answer () {
      if (this.$i18n.locale === 'de') {
        return this.question.answer.short_answer.de
      } else {
        return this.question.answer.short_answer.en
      }
    },
    long_answer () {
      if (this.$i18n.locale === 'de') {
        return marked(this.question.answer.long_answer.de)
      } else {
        return marked(this.question.answer.long_answer.en)
      }
    }
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
  width: 270px;
  overflow: hidden;
}

.nsfw-filter {
  width:270px;
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

.expanding-content {
  position: relative;
  left: -13px;
  padding-left: 20px;
  width:270px;
  margin: 25px auto 0 auto;
  border-left: 3px solid #ffffff;
}

@media screen and (min-width: 450px) {

  .expanding-content {
    width: 325px;
  }

}

@media screen and (min-width: 570px) {

  .expanding-content {
    width: 480px;
  }

}

.colored-border {
  border-left: 3px solid #00A9F8;
  margin-bottom: 75px !important;
}

.expanding-content h2 {
  color: #00A9F8;
  text-transform: none;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0;
}

.expanding-title-inactive::before {
  content: " • ";
  color: #00A9F8;
  position: absolute;
  left: 5px;
}

.first-text {
  font-size: 20px;
  line-height: 30px;
}

.more {
  padding:0;
  border: 0;
  background: 0;
  color: #00A9F8;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: 'Nato Sans', sans-serif;
  font-size: 12px;
}

.long-answer p {
  font-size: 14px;
  line-height: 25px;
}
</style>
