<template>
  <div id="app" class="container">
    <menu-bar></menu-bar>
    <div class="app-stage-sec">
      <play-area @completed="completed"></play-area>
    </div>
    <done-modal :show="stageCompleted"></done-modal>
  </div>
</template>

<script>
import MenuBar from './components/Menu'
import PlayArea from './components/PlayArea'
import DoneModal from './components/DoneModal'

export default {
  name: 'app',
  components: {
    MenuBar,
    PlayArea,
    DoneModal
  },
  data () {
    return {
      stageCompleted: false
    }
  },
  methods: {
    completed() {
      this.stageCompleted = true;
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-stage-sec {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* custom animations */
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      /*transform: scale(0);*/
      opacity: 0;
      fill: #fff;      
    }
    50% {
      /*transform: scale(1.20);*/
      opacity: .5;
      fill: #999;
    }
    100% {
      /*transform: scale(1);*/
      opacity: 1;
      fill: #000;
    }
  }  
</style>
