<template>
  <section>
    <div class="container">
      <div class="intro-privacy">
        <h1>{{$t('privacy.title')}}</h1>
        <p class="subheader">{{$t('privacy.subheader')}}</p>
        <div>
          <p>{{$t('privacy.intro1')}}</p>
          <p>{{$t('privacy.intro2')}}</p>
          <i18n path="privacy.intro3" tag="p">
            <a :href="'mailto:'+$t('privacy.contact_email')">{{$t('privacy.contact_email')}}</a>
          </i18n>
        </div>
      </div>
      <div class="privacy-settings">
        <h2>{{$t('privacy.local_storage')}}</h2>
        <p v-html="$t('privacy.ls_description1')"></p>
        <p>{{$t('privacy.ls_description2')}}</p>
        <button class="button small-button long-button"
        :class="buttonClass"
        @click="manageDeletion()">
        <span v-if="!deleteButtonActive && !confirmDelete">{{$t('privacy.delete_ls')}}</span>
        <span v-else-if="deleteButtonActive && !confirmDelete">{{$t('privacy.delete_ls_check')}}</span>
        <span v-else-if="deleteButtonActive && confirmDelete">{{$t('privacy.delete_ls_ok')}}</span>
      </button>
      <p v-html="$t('privacy.storage_deleted')" v-if="deleteButtonActive && confirmDelete"></p>
    </div>
  </div>
  <div class="expanding-content" :class="{'colored-border' : showIncognitoHelp }" >
    <p class="privacy-tip" :class="{'expanding-title-inactive' : !showIncognitoHelp }" @click="showIncognitoHelp = !showIncognitoHelp">{{$t('privacy.incognito_title')}}</p>
    <div v-if="showIncognitoHelp">
      <p class="first-text" v-html="$t('privacy.incognito_intro')"></p>
      <p v-html="$t('privacy.incognito_instructions')"></p>
      <ul>
        <li><a href="https://support.microsoft.com/en-us/help/4026200/windows-browse-inprivate-in-microsoft-edge">{{$t('privacy.edge')}}:</a> {{$t('privacy.edge_name')}}</li>
        <li><a href="https://support.apple.com/en-us/HT203036">{{$t('privacy.safari')}}:</a>{{$t('privacy.safari_name')}}</li>
        <li><a href="https://blogs.opera.com/news/2014/10/how-to-open-private-window-opera-for-computers/">{{$t('privacy.opera')}}:</a> {{$t('privacy.opera_name')}}</li>
        <li><a href="https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history">{{$t('privacy.firefox')}}:</a> {{$t('privacy.firefox_name')}}</li>
        <li><a href="https://support.google.com/chrome/answer/95464">{{$t('privacy.chrome')}}:</a> {{$t('privacy.chrome_name')}}</li>
      </ul>
      <p v-html="$t('privacy.incognito_warning')"></p>
    </div>
  </div>
  <div class="expanding-content" :class="{'colored-border' : showDataStorage }" >
    <p class="privacy-tip" :class="{'expanding-title-inactive' : !showDataStorage }" @click="showDataStorage = !showDataStorage">{{$t('privacy.data_storage')}}</p>
    <div v-if="showDataStorage">
      <p class="first-text" v-html="$t('privacy.ds_intro')"></p>
      <p>{{$t('privacy.ds_body1')}}</p>
      <p>{{$t('privacy.ds_body2')}}</p>
    </div>
  </div>
  <div id="notifications" class="expanding-content" :class="{'colored-border' : showNotifications }" >
    <p class="privacy-tip" :class="{'expanding-title-inactive' : !showNotifications }" @click="showNotifications = !showNotifications">{{$t('privacy.notifications_title')}}</p>
    <div v-if="showNotifications">
      <p class="first-text">{{$t('privacy.notifications_intro')}}</p>
      <p>{{$t('privacy.notifications_email')}}</p>
      <p>{{$t('privacy.notifications_push')}}</p>
      <p v-html="$t('privacy.notifications_push_warning')"></p>
      <p>{{$t('privacy.notifications_outro')}}</p>
    </div>
  </div>
  <div class="expanding-content" :class="{'colored-border' : showEnablePush }" >
    <p class="privacy-tip" :class="{'expanding-title-inactive' : !showNotifications }" @click="showEnablePush = !showEnablePush">{{$t('privacy.enable_push_title')}}</p>
    <div v-if="showEnablePush">
      <p class="first-text">{{$t('privacy.enable_push_intro')}}</p>
      <p>{{$t('privacy.enable_push_body')}}</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/114662">{{$t('privacy.chrome_web_preferences')}}</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/push-notifications-firefox">{{$t('privacy.firefox_web_preferences')}}</a></li>
      </ul>
    </div>
  </div>
  <div class="expanding-content" :class="{'colored-border' : showExitButtonExplanation }" >
    <p class="privacy-tip" :class="{'expanding-title-inactive' : !showExitButtonExplanation }" @click="showExitButtonExplanation = !showExitButtonExplanation">{{$t('youtubeadvice.yt_title')}}</p>
    <div v-if="showExitButtonExplanation">
      <p class="first-text">{{$t('youtubeadvice.yt_description')}}</p>
      <p v-html="$t('youtubeadvice.yt_important')"></p>
    </div>
  </div>
</section>
</template>

<script>

export default {
  name: 'Privacy',

  created () {
    if (this.$route.hash === '#notifications') {
      this.showEnablePush = true
    }
  },
  data () {
    return {
      showIncognitoHelp: false,
      showDataStorage: false,
      showNotifications: false,
      showEnablePush: false,
      showExitButtonExplanation: false,
      buttonClass: 'red-button',
      deleteButtonActive: false,
      confirmDelete: false
    }
  },
  methods: {
    manageDeletion () {
      if (!this.deleteButtonActive && !this.confirmDelete) {
        this.deleteButtonActive = true
        this.buttonClass = 'orange-button'
      } else if (this.deleteButtonActive && !this.confirmDelete) {
        this.confirmDelete = true
        this.buttonClass = 'highlight-button'
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister()
          }
        })
        window.localStorage.clear()
      }
    }
  }
}

</script>

  <style>
  .subheader {
    font-size: 20px;
    line-height: 30px;
    padding-bottom: 5px;
  }

  .privacy-settings p {
    margin-top: 0;
    margin-left: 25px;
  }

  .privacy-settings {
    margin: 75px auto;
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

  .red-button {
    background-color: #EB361D;
  }

  .orange-button {
    background-color: #F67012;
  }

  .colored-border {
    border-left: 3px solid #4BC2F9;
    margin-bottom: 75px !important;
  }

  .expanding-content h2 {
    color: #4BC2F9;
    text-transform: none;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0;
  }

  .first-text {
    font-size: 20px;
    line-height: 30px;
  }

  .expanding-title-inactive::before {
    content: " • ";
    color: #4BC2F9;
    position: absolute;
    left: 5px;
  }

  .privacy-tip {
    font-weight: bold;
    color: #4BC2F9;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
  }

  </style>
