<template>
  <div id="app">
    <YoutubeAdvice v-if="showModal" @close="showModal = false"> </YoutubeAdvice>
    <transition name="appearDown">
      <Tabs v-if="showNavBar"></Tabs>
    </transition>
    <header id="top-bar">
      <div class="exit-button" :class="{'animateExitButton' : !modalShown, 'pushButtonUp' : !showNavBar }">
        <img src="./assets/Youtube-icon.png" @click="modalManager()" alt="YouTube Button">
      </div>
    </header>
    <router-view/>
    <div
    v-if="!($route.name === 'home' || $route.name === 'ask')"
    class="back-to-top"><p @click="backToTop()">Back To Top</p></div>
    <footer>
      <ul class="navigation-footer">
        <li>
          <img src="./assets/footer_language.png" class="footer-icon" alt="Language Selection Icon">
          <ul class="language-list">
            <li v-for="(lang, code) in languages" :key="code">
              <a @click="setLang(code)" :class="{ 'language-is-inactive' : code !== $i18n.locale }">{{ lang }}</a>
            </li>
          </ul>
          <li>
            <img src="./assets/footer_ambassador.png" class="footer-icon" alt="Ambassadors Icon">
            <router-link tag="a" :to="{ name : 'ambassadors' }" v-html="$t('app.ambassadors')"></router-link>
          </li>
          <li>
            <img src="./assets/footer_privacy.png" class="footer-icon" alt="Privacy Icon">
            <router-link tag="a" :to="{ name : 'privacy' }">{{$t('app.privacy')}}</router-link>
          </li>
          <li>
            <img src="./assets/footer_about.png" class="footer-icon" alt="About Icon">
            <router-link tag="a" :to="{ name : 'about' }" v-html="$t('app.about')"></router-link>
          </li>
        </ul>
      </footer>
    </div>
  </template>

<script>
import YoutubeAdvice from './components/Global/YoutubeAdvice.vue'
import Tabs from './components/Global/Tabs.vue'

export default {
  name: 'MainApp',
  components: {
    'YoutubeAdvice': YoutubeAdvice,
    'Tabs': Tabs
  },
  beforeMount () {
    if (window.localStorage.getItem('locale')) {
      this.$i18n.locale = this.$store.state.locale
    } else {
      this.$store.dispatch('setPreferredLocale', 'en')
    }
    this.$store.dispatch('fetchQandA')
    this.$store.dispatch('fetchAmbassadors')
  },
  created () {
    // NOTE: THIS IS NOT NECESSARILY WORKING AS INTENDED RIGHT NOW... IF THE NAVBAR IS NOT SHOWN, IT WILL NOT APPEAR WHEN YOU GO TO A DIFFERENT PAGE...
    window.addEventListener('scroll', this.handleScroll)
    if (this.$route.name === 'home' || this.$route.name === 'ask') {
      this.showNavBar = false
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      showModal: false,
      scrollTop: 0,
      showNavBar: true
    }
  },
  computed: {
    modalShown () {
      return this.$store.state.modalShown
    },
    languages () {
      return { 'en': 'English', 'de': 'Deutsch' }
    }
    // TODO: THIS IS REAAAAAALLY BAD, AS IT ONLY SUPPORTS TWO LANGUAGES ONLY.
  },
  methods: {
    modalManager () {
      if (!this.modalShown) {
        this.$store.dispatch('changeModalStatus')
        this.showModal = true
      } else {
        window.location.href = 'https://www.youtube.com'
      }
    },
    backToTop () {
      var timerHandle = setInterval(function () {
        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
          window.scrollBy(0, -50)
        } else {
          clearInterval(timerHandle)
        }
      }, 10)
    },
    setLang (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setPreferredLocale', lang)
    },
    handleScroll () {
      if (window.scrollY < this.scrollTop) {
        this.showNavBar = true
      }
      if (window.scrollY > this.scrollTop && window.scrollY > 50) {
        this.showNavBar = false
      }
      this.scrollTop = window.scrollY
    }
  }
}
</script>

<style>

  /* GENERAL  */
  body {
    margin: 0;
    font-size: 16px;
  }

  #app {
    font-family: 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #112434;
  }
  #top-bar {
    display:flex;
    flex-direction: row-reverse;
    width:100%;
    margin-top:75px;
    margin-bottom:5px;
  }

  .exit-button {
    width: 30px;
    height: 30px;
    padding: 10px;
    margin-top: 15px;
    right: 10px;
    z-index: 9999;
    position: fixed;
    transition: margin 0.5s;
  }

  .exit-button img {
    width: 30px;
    height: 30px;
  }

  .pushButtonUp {
    margin-top: -50px;
  }

  .exit-button::after {
    content: " ";
    z-index: -1000;
    position: fixed;
    margin-top: -6px;
    margin-left: -36px;
    height: 40px;
    width: 40px;
    text-align: center;
    background: white;
    border-width: 1px;
    border-color: #eb361d;
    border-style: solid;
    border-radius: 100%;
    font-size: 1.5rem;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
  }

  .animateExitButton {
    animation-name: stretch;
    animation-duration: 0.9s;
    animation-iteration-count: 6;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
  }

  @keyframes stretch {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.6);
  }
}

  a {
    color: #4BC2F9;
    text-decoration: none;
  }

  .back-to-top {
    text-align: center;
    display: block;
    padding: 56px 20px 40px 20px;
  }

  .back-to-top p {
    line-height: 54px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 10px;
    font-weight: 600;
    color: #4BC2F9;
  }

  footer {
    background-color: #FB8A90;
    color: #ffffff;
    padding: 40px 0 40px 0;
    width:100%;
  }

  .footer-icon {
    top:3px;
    position:relative;
    height: 17px;
    display: inline-block;
    margin-right:30px;
  }

  footer a {
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    font-weight: bold;
    color: #ffffff;
  }

  .language-is-inactive {
    text-decoration: underline;
    color: #7A4347;
  }

  .navigation-footer {
    list-style: none;
    padding: 0;
    margin: auto;
    width: 250px;
  }

  .navigation-footer li {
    line-height: 48px;
  }

  .language-list {
    list-style: none;
    padding: 0;
    display: inline-block;
  }

  .language-list li {
    display: inline-block;
  }

  .language-list li:first-of-type {
    margin-right:10px;
  }

  .container {
    margin: 0 auto;
    width: 270px;
  }

  @media screen and (min-width: 450px) {

    .container {
      width: 325px;
    }

}

@media screen and (min-width: 570px) {

  .container {
    width: 480px;
  }

}

  h1 {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 34px;
  }

  h2 {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
  }

  p {
    line-height:25px;
    font-size: 16px;
    margin-top: 25px;
    margin-bottom: 25px;
  }

  /* Home */

  .action-buttons {
    margin-top:3em;
  }

  .action-buttons a {
    text-decoration: none;
  }

  .button {
    background-color: #255F79;
    display:block;
    margin:auto;
    margin-bottom:2em;
    width: 290px;
    padding:25px 20px;
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 15px;
    border:0;
    color: #ffffff;
  }

  @media screen and (min-width: 450px) {

    .button {
      width: 350px;
    }

}

  .highlight-button {
    background-color: #4BC2F9;
  }

  .small-button {
    width: 125px;
    padding: 10px 5px;
    font-size:0.8em;
    margin-left: 20px;
    margin-top:36px;
    letter-spacing: 2px;
  }

  .long-button {
    width: 170px;
  }

  .small {
    line-height: 2;
    font-size: 0.8em;
  }

  input, textarea {
    border-color: #4BC2F9;
    border-radius: 20px;
    border-style:solid;
    border-width: 2px;
    font-size: 20px;
    letter-spacing: 2px;
    line-height: 33px;
    font-weight: 600;
    padding: 10px;
    width: 200px;
    margin: 25px 0 25px 0;
    font-family: 'Noto Sans', sans-serif;
    color: #4BC2F9;
    box-sizing: border-box;
  }

  input::placeholder, textarea::placeholder {
    color: #92DBF9;
  }
</style>
