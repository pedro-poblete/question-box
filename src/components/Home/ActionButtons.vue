<template>
  <div class="action-buttons">
    <transition name="fade">
      <div class='sent-notification container' v-if="asking === 'done' ">
        <h2>{{$t('actionbuttons.thank_you')}}</h2>
        <p>{{$t('actionbuttons.answer_week')}}</p>
      </div>
    </transition>

    <button
      class="button highlight-button"
      @click="changeAsking()"
      v-if="asking === 'done'">{{$t('actionbuttons.ask_another')}}</button>

      <button
        class="button highlight-button"
        @click="changeAsking()"
        v-if="asking === 'no' || asking === 'asking' ">{{$t('actionbuttons.ask_q')}}</button>

    <transition name="appearDown">
      <AskQuestion v-if="asking === 'asking'" @sent="asking = 'done' "/>
    </transition>

    <button
      class="button"
      @click='changeView("/answers")'>{{$t('actionbuttons.see_ans')}}</button>

    <button
      class="button"
      @click='changeView("/ambassadors")'>{{$t('actionbuttons.meet_vols')}}</button>
  </div>
</template>

<script>
import AskQuestion from './AskQuestion.vue'

export default {
  name: 'ActionButtons',
  components: {
    'AskQuestion': AskQuestion
  },
  data () {
    return {
      asking: 'no'
    }
  },
  mounted () {
    this.checkRoute()
  },
  methods: {
    changeView (navigationPath) {
      this.$router.push({ path: navigationPath })
    },
    changeAsking () {
      if (this.asking === 'asking') {
        this.asking = 'no'
      } else {
        this.asking = 'asking'
      }
    },
    checkRoute () {
      if (this.$route.name === 'home') {
        this.asking = 'no'
      }
      if (this.$route.name === 'ask') {
        this.asking = 'asking'
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.checkRoute()
    }
  }
}
</script>

<style>

.action-buttons {
  margin-bottom: 60px;
}

.scale-in-ver-top {
  animation: scale-in-ver-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes scale-in-ver-top {
  0% {
    transform: scaleY(0);
    transform-origin: 100% 0%;
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 100% 0%;
    opacity: 1;
  }
}

.appearDown-enter-active {
  animation: scale-in-ver-top 0.4s ease-out both;
}

.appearDown-leave-active {
  animation: scale-in-ver-top 0.4s ease-in both reverse;

}

.appearDown-enter, .appearDown-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.sent-notification {
  margin-top: 80px;
  margin-bottom: 50px;
  max-width: 350px;
}

.sent-notification h2 {
  font-size: 24px;
  line-height: 34px;
  text-transform: none;
  font-weight: 400;
  margin-bottom: 15px;
}

.sent-notification p {
  margin-top: 15px;
}

</style>
