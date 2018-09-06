<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1>{{$t('youtubeadvice.yt_title')}}</h1>
        </div>

        <div class="modal-body">
          <p>{{$t('youtubeadvice.yt_description')}}</p>
        </div>

        <div class="modal-footer">
          <button class="modal-default-button" @click="$emit('close')">
            <i class="chevron"></i>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'YoutubeAdvice'
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-color: rgba(255, 255, 255, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-container {
  width: 100%;
  box-sizing:border-box;
  padding: 10px 0;
  background-color: #eb361d;
  color: #ffffff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: all .5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .modal-container::after {
  content: " ";
  position: fixed;
  top: 80px;
  right: 10px;
  height: 70px;
  width: 70px;
  text-align: center;
  background: white;
  border-radius: 100%;
  font-size: 1.5rem;
} */

.modal-header {
  width: 250px;
  margin-top: 50px;
  margin-right: 25px;
}

.modal-header h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 1;
  margin: 0;
  text-transform: none;
  letter-spacing: 0.5px;
}

.modal-body {
  margin-top: 5px;
  margin-right: 25px;
  max-width: 250px;
}

.modal-footer {
  margin-top: 25px;
}

.modal-default-button {
  color: #ffffff;
  background: 0;
  border: 0;
}

.chevron {
  padding: 10px;
}
.chevron::before {
  border-style: solid;
  border-width: 0.25em 0.25em 0 0;
  content: '';
  display: inline-block;
  height: 1em;
  left: 0.15em;
  position: relative;
  top: 0.15em;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 1em;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: translate3d(0, -100%, 0);
  transition-duration: 1s;
}

</style>
