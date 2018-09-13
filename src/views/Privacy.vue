<template>
  <section>
    <div class="container intro-privacy">
      <h1>Lorem Ipsum</h1>
      <p class="subheader">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mi ut elit rutrum blandit. Etiam nec facilisis enim, eget vestibulum turpis</h3>
      <div>
        <p>Maecenas commodo nunc id neque convallis, eget scelerisque nulla gravida. Pellentesque non viverra augue. Sed dignissim dolor mollis lectus scelerisque pretium. Nunc at consectetur augue, tristique tempus justo. Nam ut magna malesuada diam consectetur scelerisque. Proin auctor auctor nibh ut hendrerit.</p>
        <p>Duis ac sem erat. Vivamus convallis ut metus ut ullamcorper. Ut suscipit posuere viverra. Etiam ligula turpis, egestas sit amet mauris sit amet, bibendum tincidunt augue.</p>
      </div>
    </div>
    <div class="question-details added-spacing" :class="{'colored-border' : showIncognitoHelp }" >
      <h2 @click="showIncognitoHelp = !showIncognitoHelp">Proin quis quam consequat</h2>
      <div v-if="showIncognitoHelp">
        <p>Vivamus in dui eu elit malesuada interdum sed vel sapien. Etiam in facilisis mauris. Maecenas vitae eros sed ipsum varius suscipit. Pellentesque lacinia scelerisque ex eu pharetra. Integer eleifend egestas luctus. Etiam semper libero elit, sit amet posuere est commodo nec. Maecenas a vulputate risus, at fringilla odio. Donec fringilla, enim in maximus molestie, felis eros ullamcorper nisl, et lacinia dui turpis vel diam. Aenean aliquet lacus et dolor vestibulum eleifend. Curabitur quis tincidunt urna. Fusce eu sodales tellus, eu vestibulum lacus.</p>
        <p>Phasellus malesuada luctus metus, non cursus magna. Maecenas purus tortor, porttitor ac erat vitae, volutpat tincidunt urna. Sed at varius odio, ut consectetur nisl. Sed tempor est lectus, id laoreet nisl accumsan eu. Pellentesque velit elit, congue id dui sit amet, condimentum placerat orci. Pellentesque velit ipsum, finibus sed justo quis, volutpat elementum mauris. Curabitur rhoncus non sem eget pretium. Nam ac diam in justo blandit condimentum non nec lacus.</p>
      </div>
    </div>
    <div class="container">
      <h1 class="no-uppercase">
        Lipsum
      </h1>
      <div class="body-privacy">
      <h2>Curabitur feugiat risus felis</h2>
        <p>Phasellus malesuada luctus metus, non cursus magna. Maecenas purus tortor, porttitor ac erat vitae, volutpat tincidunt urna. Sed at varius odio, ut consectetur nisl. </p>
        <p>Pellentesque velit ipsum, finibus sed justo quis, volutpat elementum mauris. Curabitur rhoncus non sem eget pretium. Nam ac diam in justo blandit condimentum non nec lacus.</p>
        <button class="button small-button highlight-button">tincidunt</button>
      </div>
      <div class="body-privacy">
      <h2>Curabitur feugiat risus felis</h2>
        <p>Phasellus malesuada luctus metus, non cursus magna. Maecenas purus tortor, porttitor ac erat vitae, volutpat tincidunt urna. Sed at varius odio, ut consectetur nisl. </p>
        <p>Pellentesque velit ipsum, finibus sed justo quis, volutpat elementum mauris. Curabitur rhoncus non sem eget pretium. Nam ac diam in justo blandit condimentum non nec lacus.</p>
        <button class="button small-button highlight-button">tincidunt</button>
      </div>
      <div class="body-privacy">
      <h2>Curabitur feugiat risus felis</h2>
        <p>Phasellus malesuada luctus metus, non cursus magna. Maecenas purus tortor, porttitor ac erat vitae, volutpat tincidunt urna. Sed at varius odio, ut consectetur nisl. </p>
        <p>Pellentesque velit ipsum, finibus sed justo quis, volutpat elementum mauris. Curabitur rhoncus non sem eget pretium. Nam ac diam in justo blandit condimentum non nec lacus.</p>
        <button class="button small-button highlight-button">tincidunt</button>
      </div>

    </div>
  </section>
</template>

<script>

export default {
  name: 'Privacy',
  data () {
    return {
      showIncognitoHelp: false
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

  .added-spacing {
    margin-top: 70px;
    margin-bottom: 80px;
  }

  .no-uppercase {
    text-transform: capitalize
  }

  .body-privacy p {
    margin-top: 0;
    margin-left: 25px;
  }

  .body-privacy {
    margin-bottom: 70px;
  }

  .body-privacy:last-of-type {
    margin-bottom: 0;
  }

</style>
