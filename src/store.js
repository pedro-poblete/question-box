import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
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
    setPreferredLocale (state, payload) {
      state.preferred_locale = payload
    }
  },

  // TODO: ALL ACTIONS DEAL WITH PROMISES, NEED TO CREATE TESTS/CATCH ERRORS
  actions: {
    fetchQandA ({commit}) {
      axios
      .get(process.env.VUE_APP_REST_API + 'questions/')
      .then(response =>
        commit('setQandA', response.data)
      )
    },
    updateQuestionViews ({commit}, question) {
      commit('increaseNumberOfViews', question)
      axios
      .patch(process.env.VUE_APP_REST_API + 'questions/' + question.id + '/update_views')
    },
    sendNewQuestion (context, data) {
      return new Promise((resolve, reject) => {
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
      submitAdditionalInformation (context, data) {
        axios.patch(
          process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/', {
            'additional_details': data.additional_details,
            'asker_age': data.asker_age
          })
        },
        subscribeEmail (context, data) {
          axios.post(
            process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/email', {
              'email': data.email
            })
          },
        subscribePushNotification (context, data) {

          navigator.serviceWorker.ready.then(async function (registration) {

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
              applicationServerKey : convertedVapidKey
            })

          })
          .then( function (subscription) {
            axios.post(
              process.env.VUE_APP_REST_API + 'questions/' + data.questionId + '/subscribe/push', {
                subscription
              }
            )
          })
        }
      }
    })
