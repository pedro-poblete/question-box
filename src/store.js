import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    showNSFW: false,
    modalShown: window.localStorage.getItem('modalShown'),
    locale: window.localStorage.getItem('locale'),
    // ANSWERS
    questionsAndAnswers: []
  },
  mutations: {
    SET_Q_AND_A(state, payload) {
      state.questionsAndAnswers = payload
    },
    INCREASE_NUMBER_VIEWS(state, question) {
      question.number_of_views++
    },
    CHANGE_MODAL_STATUS(state) {
      state.modalShown = !state.modalShown
    },
    SET_PREFERRED_LOCALE(state, payload) {
      state.locale = payload
    }
  },
  // TODO: ALL ACTIONS DEAL WITH PROMISES, NEED TO CREATE TESTS/CATCH ERRORS
  actions: {
    setPreferredLocale ({commit}, locale) {
      if (window.localStorage.getItem('locale') === locale) {
        commit('SET_PREFERRED_LOCALE', window.localStorage.getItem('locale'))
      } else {
        window.localStorage.setItem('locale', locale)
        commit('SET_PREFERRED_LOCALE', window.localStorage.getItem('locale'))
      }
    },
    changeModalStatus ({commit}) {
      const status = window.localStorage.getItem('modalShown')
      window.localStorage.setItem('modalShown', !status)
    },
    fetchQandA ({commit}) {
      axios
      .get(process.env.VUE_APP_REST_API + 'public/')
      .then(response => {
        if (JSON.stringify(response.data) === window.localStorage.getItem('questions')) {
          commit('SET_Q_AND_A', JSON.parse(window.localStorage.getItem('questions')))
        } else {
          window.localStorage.setItem('questions', JSON.stringify(response.data))
          commit('SET_Q_AND_A', JSON.parse(window.localStorage.getItem('questions')))
        }
      })
    },
    updateQuestionViews( {commit}, question) {
      commit('INCREASE_NUMBER_VIEWS', question)
      axios
      .patch(process.env.VUE_APP_REST_API + 'questions/' + question.id + '/update_views')
    },
    sendNewQuestion(context, data) {
      return new Promise ( (resolve, reject) => {
        axios.post(
          process.env.VUE_APP_REST_API + 'questions/', {
            'text': data.text,
            'additional_details': data.additional_details,
            'related_question': data.related_question,
            'asker_age': data.asker_age
          }
        ).then(
          response => resolve(response.data.id))
      })
    },
    submitAdditionalInformation(context, data) {
      axios.patch(
        process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/', {
          'additional_details': data.additional_details,
          'asker_age': data.asker_age
        })
    },
    subscribeEmail(context, data) {
      axios.post(
        process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/email', {
          'email': data.email
        }
      )
    },
    subscribePushNotification(context, data) {
      navigator.serviceWorker.ready.then(async function(registration) {

        function urlBase64ToUint8Array(base64String) {
          const padding = '='.repeat((4 - base64String.length % 4) % 4);
          const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

          const rawData = window.atob(base64);
          const outputArray = new Uint8Array(rawData.length);

          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
          }
          return outputArray;
        }

        const convertedVapidKey = urlBase64ToUint8Array(process.env.VUE_APP_VAPID_PUBLIC_KEY)

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        })

      })
      .then(function(subscription) {
        axios.post(
          process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/push', {
            subscription
          }
        )
      })
    }
  }
})
