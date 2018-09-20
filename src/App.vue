<template>
  <div id="app">
    <YoutubeAdvice v-if="showModal" @close="showModal = false"> </YoutubeAdvice>
    <transition name="appearDown">
      <Tabs v-if="showNavBar"></Tabs>
    </transition>
    <header id="top-bar">
      <div class="exit-button" :class="{'animateExitButton' : !modalShown, 'pushButtonUp' : !showNavBar }">
        <img src="./assets/Youtube-icon.png" @click="modalManager()">
      </div>
    </header>
    <router-view/>
    <div
    v-if="!($route.name === 'home' || $route.name === 'ask')"
    class="back-to-top"><p @click="backToTop()">Back To Top</p></div>
    <footer>
      <ul class="navigation-footer">
        <li>
          <svg class="icon-footer" viewBox="0 0 209.3 209.3">
            <path d="M203.5 139.1c3.8-10.8 5.8-22.4 5.8-34.4s-2.1-23.6-5.8-34.4c-0.1-0.3-0.2-0.6-0.3-0.9C188.6 28.9 149.9 0 104.6 0S20.7 28.9 6.2 69.3c-0.1 0.3-0.2 0.6-0.3 0.9 -3.8 10.8-5.8 22.4-5.8 34.4s2.1 23.6 5.8 34.4c0.1 0.3 0.2 0.6 0.3 0.9 14.5 40.3 53.2 69.3 98.5 69.3s83.9-28.9 98.5-69.3C203.3 139.7 203.4 139.4 203.5 139.1zM104.6 194.3c-4 0-10.4-7.2-15.8-23.3 -2.6-7.8-4.7-16.7-6.2-26.4H126.6c-1.5 9.7-3.6 18.7-6.2 26.4C115.1 187.1 108.6 194.3 104.6 194.3zM80.9 129.5c-0.7-8-1.1-16.3-1.1-24.9s0.4-16.9 1.1-24.9h47.6c0.7 8 1.1 16.3 1.1 24.9s-0.4 16.9-1.1 24.9H80.9zM15 104.6c0-8.6 1.2-17 3.5-24.9h47.3c-0.7 8.2-1.1 16.5-1.1 24.9s0.4 16.7 1.1 24.9h-47.3C16.2 121.6 15 113.3 15 104.6zM104.6 15c4 0 10.4 7.2 15.8 23.3 2.6 7.8 4.7 16.7 6.2 26.4H82.7c1.5-9.7 3.6-18.7 6.2-26.4C94.2 22.2 100.7 15 104.6 15zM143.5 79.8h47.3c2.3 7.9 3.5 16.3 3.5 24.9s-1.2 17-3.5 24.9h-47.3c0.7-8.2 1.1-16.5 1.1-24.9S144.2 87.9 143.5 79.8zM184.9 64.8h-43.2c-2.7-18.4-7.2-34.9-13.7-46.6C153 24.9 173.6 42.1 184.9 64.8zM81.2 18.1C74.8 29.9 70.2 46.4 67.5 64.8h-43.2C35.7 42.1 56.3 24.9 81.2 18.1zM24.4 144.5h43.2c2.7 18.4 7.2 34.9 13.7 46.6C56.3 184.4 35.7 167.2 24.4 144.5zM128.1 191.2c6.4-11.7 11-28.2 13.7-46.6h43.2C173.6 167.2 153 184.4 128.1 191.2z"/>
          </svg>
          <ul class="language-list">
            <li v-for="(lang, code) in languages" :key="code">
              <a @click="setLang(code)" :class="{ 'language-is-inactive' : code !== $i18n.locale }">{{ lang }}</a>
            </li>
          </ul>
          <li>
            <svg class="icon-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 505.4 505.4">
              <path d="m437.1 233.45c14.8-10.4 24.6-27.7 24.6-47.2 0-31.9-25.8-57.7-57.7-57.7s-57.7 25.8-57.7 57.7c0 19.5 9.7 36.8 24.6 47.2-12.7 4.4-24.3 11.2-34.1 20-13.5-11.5-29.4-20.3-46.8-25.5 21.1-12.8 35.3-36.1 35.3-62.6 0-40.4-32.7-73.1-73.1-73.1s-73.1 32.8-73.1 73.1c0 26.5 14.1 49.8 35.3 62.6-17.2 5.2-32.9 13.9-46.3 25.2-9.8-8.6-21.2-15.3-33.7-19.6 14.8-10.4 24.6-27.7 24.6-47.2 0-31.9-25.8-57.7-57.7-57.7s-57.7 25.8-57.7 57.7c0 19.5 9.7 36.8 24.6 47.2-39.7 13.7-68.2 51.4-68.2 95.7v6.6c0 0.2 0.2 0.4 0.4 0.4h122.3c-0.7 5.5-1.1 11.2-1.1 16.9v6.8c0 29.4 23.8 53.2 53.2 53.2h155c29.4 0 53.2-23.8 53.2-53.2v-6.8c0-5.7-0.4-11.4-1.1-16.9h123.1c0.2 0 0.4-0.2 0.4-0.4v-6.6c-0.2-44.4-28.6-82.1-68.3-95.8zm-74.8-47.3c0-23 18.7-41.7 41.7-41.7s41.7 18.7 41.7 41.7c0 22.7-18.3 41.2-40.9 41.7h-0.8s-0.5 0-0.8 0c-22.7-0.4-40.9-18.9-40.9-41.7zm-167.4-20.8c0-31.5 25.6-57.1 57.1-57.1s57.1 25.6 57.1 57.1c0 30.4-23.9 55.3-53.8 57h-3.3-3.3c-29.9-1.7-53.8-26.6-53.8-57zm-135.6 20.8c0-23 18.7-41.7 41.7-41.7s41.7 18.7 41.7 41.7c0 22.7-18.3 41.2-40.9 41.7h-0.8s-0.5 0-0.8 0c-22.6-0.4-40.9-18.9-40.9-41.7zm66.2 134h-109.3c4.5-42.6 40.5-76 84.2-76.3h0.6s0.4 0 0.6 0c20.8 0.1 39.8 7.8 54.5 20.3-14.4 15.6-25.1 34.8-30.6 56zm241.3 39.8c0 20.5-16.7 37.2-37.2 37.2h-155c-20.5 0-37.2-16.7-37.2-37.2v-6.8c0-62.1 49.6-112.9 111.3-114.7 1.1 0.1 2.3 0.1 3.4 0.1s2.3 0 3.4-0.1c61.7 1.8 111.3 52.6 111.3 114.7v6.8zm11.9-39.8c-5.5-21.1-16-40-30.3-55.6 14.8-12.8 34-20.5 55-20.7h0.6s0.4 0 0.6 0c43.7 0.3 79.7 33.7 84.2 76.3h-110.1z"/>
            </svg>
            <router-link tag="a" :to="{ name : 'ambassadors' }" v-html="$t('app.ambassadors')"></router-link>
          </li>
          <li>
            <svg class="icon-footer" viewBox="0 0 482.9 482.9">
              <path d="M239.7 260.2c0.5 0 1 0 1.6 0 0.2 0 0.4 0 0.6 0 0.3 0 0.7 0 1 0 29.3-0.5 53-10.8 70.5-30.5 38.5-43.4 32.1-117.8 31.4-124.9 -2.5-53.3-27.7-78.8-48.5-90.7C280.8 5.2 262.7 0.4 242.5 0h-0.7c-0.1 0-0.3 0-0.4 0h-0.6c-11.1 0-32.9 1.8-53.8 13.7 -21 11.9-46.6 37.4-49.1 91.1 -0.7 7.1-7.1 81.5 31.4 124.9C186.7 249.4 210.4 259.7 239.7 260.2zM164.6 107.3c0-0.3 0.1-0.6 0.1-0.8 3.3-71.7 54.2-79.4 76-79.4h0.4c0.2 0 0.5 0 0.8 0 27 0.6 72.9 11.6 76 79.4 0 0.3 0 0.6 0.1 0.8 0.1 0.7 7.1 68.7-24.7 104.5 -12.6 14.2-29.4 21.2-51.5 21.4 -0.2 0-0.3 0-0.5 0l0 0c-0.2 0-0.3 0-0.5 0 -22-0.2-38.9-7.2-51.4-21.4C157.7 176.2 164.5 107.9 164.6 107.3z"/>
              <path d="M446.8 383.6c0-0.1 0-0.2 0-0.3 0-0.8-0.1-1.6-0.1-2.5 -0.6-19.8-1.9-66.1-45.3-80.9 -0.3-0.1-0.7-0.2-1-0.3 -45.1-11.5-82.6-37.5-83-37.8 -6.1-4.3-14.5-2.8-18.8 3.3 -4.3 6.1-2.8 14.5 3.3 18.8 1.7 1.2 41.5 28.9 91.3 41.7 23.3 8.3 25.9 33.2 26.6 56 0 0.9 0 1.7 0.1 2.5 0.1 9-0.5 22.9-2.1 30.9 -16.2 9.2-79.7 41-176.3 41 -96.2 0-160.1-31.9-176.4-41.1 -1.6-8-2.3-21.9-2.1-30.9 0-0.8 0.1-1.6 0.1-2.5 0.7-22.8 3.3-47.7 26.6-56 49.8-12.8 89.6-40.6 91.3-41.7 6.1-4.3 7.6-12.7 3.3-18.8 -4.3-6.1-12.7-7.6-18.8-3.3 -0.4 0.3-37.7 26.3-83 37.8 -0.4 0.1-0.7 0.2-1 0.3 -43.4 14.9-44.7 61.2-45.3 80.9 0 0.9 0 1.7-0.1 2.5 0 0.1 0 0.2 0 0.3 -0.1 5.2-0.2 31.9 5.1 45.3 1 2.6 2.8 4.8 5.2 6.3 3 2 74.9 47.8 195.2 47.8s192.2-45.9 195.2-47.8c2.3-1.5 4.2-3.7 5.2-6.3C447 415.5 446.9 388.8 446.8 383.6z"/>
            </svg>
            <router-link tag="a" :to="{ name : 'privacy' }">{{$t('app.privacy')}}</router-link>
          </li>
          <li>
            <svg class="icon-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <circle cx="256" cy="378.5" r="25"/>
              <path d="M256 0C114.5 0 0 114.5 0 256c0 141.5 114.5 256 256 256 141.5 0 256-114.5 256-256C512 114.5 397.5 0 256 0zM256 472c-119.4 0-216-96.6-216-216 0-119.4 96.6-216 216-216 119.4 0 216 96.6 216 216C472 375.4 375.4 472 256 472z"/><path d="M256 128.5c-44.1 0-80 35.9-80 80 0 11 9 20 20 20s20-9 20-20c0-22.1 17.9-40 40-40 22.1 0 40 17.9 40 40 0 22.1-17.9 40-40 40 -11 0-20 9-20 20v50c0 11 9 20 20 20 11 0 20-9 20-20v-32.5c34.5-8.9 60-40.3 60-77.5C336 164.4 300.1 128.5 256 128.5z"/>
            </svg>
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
  beforeCreate () {
    if ( window.localStorage.getItem('locale') ) {
      this.$i18n.locale = this.$store.state.locale
    } else {
      this.$store.dispatch('setPreferredLocale', 'en')
    }
    this.$store.dispatch('fetchQandA')
  },
  created () {
    // THIS IS NOT NECESSARILY WORKING AS INTENDED RIGHT NOW... IF THE NAVBAR IS NOT SHOWN, IT WILL NOT APPEAR WHEN YOU GO TO A DIFFERENT PAGE...
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
      return {'en': 'English', 'de': 'Deutsch'}
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
        if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
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
    color: #2c3e50;
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
    color: #00A9F8;
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
    color: #00A9F8;
  }

  footer {
    background-color: #f2988c;
    color: #ffffff;
    padding: 40px 0 40px 0;
    width:100%;
  }

  .icon-footer {
    top:0.125em;
    position:relative;
    fill: #404040;
    height: 16px;
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
    color: #606060;
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
    background-color: #2E40F5;
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
    background-color: #00A9F8;
  }

  .small-button {
    width: 125px;
    padding: 10px 5px;
    font-size:0.8em;
    margin-left: 20px;
    margin-top:36px;
  }

  .long-button {
    width: 170px;
  }

  input, textarea {
    border-color: #00A9F8;
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
    color: #00A9F8;
    box-sizing: border-box;
  }

  input::placeholder, textarea::placeholder {
    color: #92DBF9;
  }
</style>
