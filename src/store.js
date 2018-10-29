import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    modalShown: JSON.parse(window.localStorage.getItem('modalShown')),
    locale: window.localStorage.getItem('locale'),
    questionsAndAnswers: [],
    ambassadors: []
  },
  mutations: {
    SET_Q_AND_A (state) {
      let questionsAndAnswers = JSON
        .parse(window.localStorage.getItem('questions'))
        .filter(question => {
          return Object.keys(question.text).includes(state.locale)
        })
        .map(question => {
          return {
            id: question.id,
            text: question.text[state.locale],
            date_asked: question.date_asked,
            number_of_views: question.number_of_views,
            answers: question.answers
          }
        })
      questionsAndAnswers.forEach(question => {
        question.answers.forEach(answer => {
          answer.quote = answer.quote[state.locale]
          answer.main_text = answer.main_text[state.locale]
          answer.ambassador = state.ambassadors.find(ambassador => {
            return ambassador.name === answer.ambassador
          })
        })
      })
      state.questionsAndAnswers = questionsAndAnswers.sort((a, b) => a.date_asked - b.date_asked)
    },
    INCREASE_NUMBER_VIEWS (state, question) {
      question.number_of_views++
    },
    CHANGE_MODAL_STATUS (state) {
      state.modalShown = !state.modalShown
      window.localStorage.setItem('modalShown', state.modalShown)
    },
    SET_PREFERRED_LOCALE (state, payload) {
      state.locale = payload
    },
    SET_AMBASSADORS (state) {
      state.ambassadors = JSON
        .parse(window.localStorage.getItem('ambassadors'))
        .map(ambassador => {
          return {
            name: ambassador.name,
            age: ambassador.age,
            picture: ambassador.picture,
            location: ambassador.location[state.locale],
            bio: ambassador.bio[state.locale]
          }
        })
    }
  },
  // TODO: ALL ACTIONS DEAL WITH PROMISES, NEED TO CATCH ERRORS
  actions: {
    setPreferredLocale ({ commit }, locale) {
      if (window.localStorage.getItem('locale') === locale) {
        commit('SET_PREFERRED_LOCALE', window.localStorage.getItem('locale'))
      } else {
        window.localStorage.setItem('locale', locale)
        commit('SET_PREFERRED_LOCALE', window.localStorage.getItem('locale'))
      }
      if (this.state.questionsAndAnswers[0]) {
        commit('SET_Q_AND_A')
      }
      if (this.state.ambassadors[0]) {
        commit('SET_AMBASSADORS')
      }
    },
    changeModalStatus ({ commit }) {
      commit('CHANGE_MODAL_STATUS')
    },
    fetchQandA ({ commit }) {
      axios
        .get(process.env.VUE_APP_REST_API + 'questions/')
        .then(response => {
          window.localStorage.setItem('questions', JSON.stringify(response.data))
        })
        .catch(error => {
          console.log('API is offline. ' + error)
        })
        .then(() => {
          commit('SET_Q_AND_A')
        })
    },
    fetchAmbassadors ({ commit }) {
      axios
        .get(process.env.VUE_APP_REST_API + 'users/ambassadors')
        .then(response => {
          window.localStorage.setItem('ambassadors', JSON.stringify(response.data))
        }).catch(error => {
          console.log('API is offline. ' + error)
        })
        .then(() => {
          commit('SET_AMBASSADORS')
        })
    },
    updateQuestionViews ({ commit }, question) {
      commit('INCREASE_NUMBER_VIEWS', question)
      axios
        .patch(process.env.VUE_APP_REST_API + 'questions/' + question.id + '/update_views')
    },
    sendNewQuestion (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(
          process.env.VUE_APP_REST_API + 'questions/', {
            'text': data.text,
            'asker_age': data.age
          }
        ).then(
          response => resolve(response.data.id))
      })
    },
    subscribeEmail (context, data) {
      axios.post(
        process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/email', {
          'email': data.email
        }
      )
    },
    subscribePushNotification (context, data) {
      navigator.serviceWorker.ready
        .then(async function (registration) {
          function urlBase64ToUint8Array (base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4)
            const base64 = (base64String + padding)
              // eslint-disable-next-line
              .replace(/\-/g, '+')
              .replace(/_/g, '/')

            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)

            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i)
            }
            return outputArray
          }

          const convertedVapidKey = urlBase64ToUint8Array(process.env.VUE_APP_VAPID_PUBLIC_KEY)

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          })
        })
        .then(function (subscription) {
          axios.post(
            process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/push', {
              subscription
            }
          )
        })
    }
  }
})
