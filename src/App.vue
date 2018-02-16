<template>
  <div id="app" class="container">
    <menu-bar :level="currentLevel"></menu-bar>
    <div class="app-stage-sec">
      <play-area :clevel="currentLevel" @completed="completed"></play-area>
    </div>
    <done-modal :show="stageCompleted" :clevel="currentLevel" @nextlevel="nextLevel"></done-modal>
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
      stageCompleted: false,
      currentLevel: 1
    }
  },
  methods: {
    completed() {
      this.stageCompleted = true;
    },
    nextLevel() {
      this.stageCompleted = false;
      this.currentLevel++;
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
  .fade-enter-active {
    animation: fade-in .3s;
  }
  .fade-leave-active {
    animation: fade-in .3s reverse;
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
      fill: #fff;      
    }
    50% {
      opacity: .5;
      fill: #999;
    }
    100% {
      opacity: 1;
      fill: #000;
    }
  }
  .bounce-enter-active {
  animation: bounce-in .7s;
}
.bounce-leave-active {
  animation: bounce-in .7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.20);
  }
  100% {
    transform: scale(1);
  }
}
</style>
