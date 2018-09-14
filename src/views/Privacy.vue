<template>
  <section>
    <div class="container">
      <div class="intro-privacy">
        <h1>Privacy</h1>
        <p class="subheader">You are in control of your personal data.</p>
          <div>
            <p>In this section we will provide you with all the information you need to know about privacy and data security for using the website safely.</p>
            <p>Here you will also learn more about the features we use to make your experience using the website better, and you will be able to set them up in the way that it is more comfortable for you.</p>
            <p>If you have any further questions or problems, please do not hesitate to contact us: <a href="mailto:contact@thosequestions.de">contact@thosequestions.de</a></p>
          </div>
        </div>
        <div class="privacy-settings">
          <h2>Local Storage</h2>
          <p>In order to provide you with a better experience, we implement a technology called <em>service worker</em>, which creates a local copy of the website on your phone for using it offline. This technology not only allows you to browse the questions while offline, but also it reduces the amount of data the website consumes.</p>
          <p>If, for whatever reason, you want to delete your local storage, you can do it here. This information won't be re-downloaded until you navigate to the website again.</p>
          <button class="button small-button long-button highlight-button">Delete Storage</button>
        </div>
      </div>
        <div class="expanding-content" :class="{'colored-border' : showIncognitoHelp }" >
          <p class="privacy-tip" :class="{'expanding-title-inactive' : !showIncognitoHelp }" @click="showIncognitoHelp = !showIncognitoHelp">How to use your browser privately</p>
          <div v-if="showIncognitoHelp">
            <p class="first-text">All modern browsers have a feature called <em>Private Browsing</em>, which allows you to browse the Internet without saving any information about which sites and pages you’ve visited. This is important if for some reason you don't want people to know you've visited this or another website.</p>
            <p>Activating <em>Private Browsing</em> is different for every browser, so we have selected a series of resources that can help you achieve this: </p>
            <ul>
              <li><a href="https://support.microsoft.com/en-us/help/4026200/windows-browse-inprivate-in-microsoft-edge">Microsoft Edge:</a> InPrivate Window.</li>
              <li><a href="https://support.apple.com/en-us/HT203036">Safari:</a> Private Browsing.</li>
              <li><a href="https://blogs.opera.com/news/2014/10/how-to-open-private-window-opera-for-computers/">Opera:</a> Private Window.</li>
              <li><a href="https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history">Firefox:</a> Private Window.</li>
              <li><a href="https://support.google.com/chrome/answer/95464">Chrome:</a> Incognito Mode.</li>
            </ul>
            <p><strong>Important:</strong> Private browsing will not prevent your Internet Service Provider, the person who manages your Wi-Fi, or some other sites to track what pages you visit (we don't track anything in our servers, so you are safe here at least). Keep this in mind when using <em>Private Browsing</em> in other websites.</p>
          </div>
        </div>
        <div class="expanding-content" :class="{'colored-border' : showDataStorage }" >
          <p class="privacy-tip" :class="{'expanding-title-inactive' : !showDataStorage }" @click="showDataStorage = !showDataStorage">Data Storage</p>
          <div v-if="showDataStorage">
            <p class="first-text">First and foremost, is important that you know one thing: we <strong>do not</strong> store any data that you don't actively send (i.e. questions) in our servers. That means we are not tracking you at all.</p>
            <p>All information is stored locally in your device, and only communicated with us when you actively click the "submit" buttons, not before that.</p>
            <!-- <p>When you submit a question no meta-data is collected. In other words, we only save what you have actively included: your question(s), and, if you chose, your age and any additional details. This information is then stored in a database and can only be seen by the website administrators and ambassadors.</p> -->
          </div>
        </div>
        <div class="expanding-content" :class="{'colored-border' : showNotifications }" >
          <p class="privacy-tip" :class="{'expanding-title-inactive' : !showNotifications }" @click="showNotifications = !showNotifications">Notifications</p>
          <div v-if="showNotifications">
            <p class="first-text">Whenever you ask a question, we offer you the possibility to receive a notification once our ambassadors have given you an answer. There are two ways you can choose to receive an answer: via email or via phone notification.</p>
            <p>If you choose to receive a notification via email, we will keep a copy of your email associated to the question until the question is answered. Your email is not available for any ambassador, and it is encrypted in such a way that, even if someone gets access to the database, it won't be possible for them to crack it. Once the notification is sent, we will delete your email from our servers.</p>
            <p>When you subscribe to receive a phone notification, a subscription event is generated in our server and in your device, so whenever the question is answered, your device will automatically let you know. We do not keep any personal data about your phone other than the subscription event. It is impossible for us to track down your location, phone number, or any other personal data.</p>
            <p>In order to respect your privacy, you will have the choice to select each time what notification option you prefer, if any.</p>
          </div>
        </div>
    </section>
  </template>

<script>

export default {
  name: 'Privacy',
  data () {
    return {
      showIncognitoHelp: false,
      showDataStorage: false,
      showNotifications: false
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

  .privacy-tip {
    font-weight: bold;
    color: #00A9F8;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
  }

  </style>
