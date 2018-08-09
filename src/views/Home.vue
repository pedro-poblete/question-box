<template>
  <section>
    <!-- TODO: REFERENCE TEXT FROM API FOR MULTILANGUAGE? -->
    <div class="container">
      <h1>Do you also have one of "those questions"?</h1>
      <p><em>Those Questions</em> is a Q&A-platform to provide you with answers
        to your questions about growing up, identity, relationships,
        and sex from people you can relate to.</p>
    </div>
    <ActionButtons />
  </section>
</template>

<script>

import ActionButtons from '../components/Home/ActionButtons.vue'

export default {
  name: 'Home',
  components: {
    'ActionButtons': ActionButtons
  }
}
</script>
