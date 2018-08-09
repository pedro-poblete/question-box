<template>
  <div class="action-buttons">

    <button class="button highlight-button"
            @click="asking = 'yes'"
            v-if="asking === 'no'">Ask A Question</button>

    <AskQuestion v-if="!(asking === 'no')"
                 :ask="asking"
                 @questionAsked="asking = $event" />

    <button class="button"
            @click='changeView("/answers")'
            v-if="!(asking === 'yes')">See Previous Answers</button>

    <button class="button"
            @click='changeView("/volunteers")'
            v-if="!(asking === 'yes')">Meet The Volunteers</button>
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
  methods: {
    changeView (navigationPath) {
      this.$router.push({path: navigationPath})
    }
  }
}
</script>
