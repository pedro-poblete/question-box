import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    // USER DATA QUESTION: SHOULD I USE LOCALSTORAGE OR SESSIONSTORAGE?
    token: localStorage.getItem('user-token') || '',
    age: '',
    emailNotification: false,
    email: '',
    pushNotification: false,
    showNSFW: false,
    modalShown: false,
    preferred_locale: 'en',
    // ANSWERS
    questionsAndAnswers: []
  },
  mutations: {
    setQandA (state, payload) {
      state.questionsAndAnswers = payload
    },
    increaseNumberOfViews (state, question) {
      question.number_of_views++
    },
    changeModalStatus (state) {
      state.modalShown = !state.modalShown
    },
    updateEmailNotification (state, payload) {
      state.emailNotification = payload
    },
    updateEmail (state, payload) {
      state.email = payload
    },
    updatePushNotification (state, payload) {
      state.pushNotification = payload
    },
    updateAge (state, payload) {
      state.age = payload
    },
    setPreferredLocale (state, payload) {
      state.preferred_locale = payload
    }
  },
  // TODO: ADD ADDITIONAL DETAILS FOR QUESTION BLAAAAAA

  // TODO: ALL ACTIONS DEAL WITH PROMISES, NEED TO CREATE TESTS/CATCH ERRORS
  actions: {
    fetchQandA ({commit}) {
      axios
        .get(process.env.VUE_APP_REST_API + 'public/')
        .then(response =>
          commit('setQandA', response.data)
        )
    },
    updateQuestionViews ({commit}, question) {
      commit('increaseNumberOfViews', question)
      axios
        .patch(process.env.VUE_APP_REST_API + 'public/' + question.id + '/update_views')
    },
    sendNewQuestion (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(
          process.env.VUE_APP_REST_API + 'public/', {
            'text': data.text,
            'additional_details': data.additional_details,
            'related_question': data.related_question,
            'asker_age': data.asker_age
          }
        ).then(
          response => resolve(response.data.id))
      })
    },
    submitAdditionalInformation (context, data) {
      axios.patch(
        process.env.VUE_APP_REST_API + 'public/' + data.questionId + '/', {
          'additional_details': data.additional_details,
          'asker_age': data.asker_age
      })
    }
  }
})
