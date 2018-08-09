<template>
  <div class="action-buttons">

    <button
      class="button highlight-button"
      @click="asking = asking + 2">Ask A Question</button>

    <transition name="appearDown">
      <AskQuestion v-if="asking > 0" @allSent="asking = -1 "/>
    </transition>

    <transition name="fade">
      <div class='sentNotification container' v-if="asking < 0">
        <h2>Additional details sent to the server. Thank you! We'll get back in touch as soon as possible.</h2>
      </div>
    </transition>

    <button
      class="button"
      @click='changeView("/answers")'>See Previous Answers</button>

    <button
      class="button"
      @click='changeView("/volunteers")'>Meet The Volunteers</button>
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
      asking: 0
    }
  },
  methods: {
    changeView (navigationPath) {
      this.$router.push({path: navigationPath})
    }
  }
}
</script>

<style>

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

.sentNotification {
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
