<template>  
  <svg @mousemove="mouseMoving" @mouseup="mouseReleased" id="svg-stage" viewBox="0 0 280 280">
    <box 
      v-for="bd in boxes" 
      v-if="bd.type != 0"
      :boxdata="bd" 
      @boxSelected="boxSelected(bd)"
      :key="bd.id"></box>
  </svg> 
</template>

<script>
import Stages from '../data/Stages.js'
import Engine from '../data/Engine.js'
import Box from './Box'


export default {
  props: ['clevel'],
  components: {
    Box
  },
  data () {
    return {
      level: null,
      boxes: [],
      selectedBox: null,
      mouseClickedX: null
    }
  },
  watch: {
    'level.boxes'(newVal, oldVal) {
      if(this.level.boxes === 0) {
        this.$emit('completed')
      }
    },
    'clevel'(newVal, oldVal) {
     let level = Engine.getLevel(Stages, this.clevel);
     let boxes = Engine.getBoxes(level);
    
      this.level = level;
      this.boxes = boxes;
    }
  },
  methods: {
    boxSelected(bd) {
      this.selectedBox = bd;
    },
    mouseMoving(event) {      
      if(this.selectedBox) {
        if(this.mouseClickedX == null) {
          this.mouseClickedX = event.clientX;
        }
        //track if the difference is more than 10 then step left/right
        let diff = event.clientX - this.mouseClickedX;
        if(this.mouseClickedX && (Math.abs(diff) > 40)) {                    
          if(diff > 0) {
            Engine.stepRight(this.level, this.boxes, this.selectedBox);
          }          
          else {
            Engine.stepLeft(this.level, this.boxes, this.selectedBox);
          }
          this.mouseClickedX = null;
        }                  
      }
    },
    mouseReleased() {
      this.selectedBox = null;
      this.mouseClickedX = null;
    }
  },  
  created () {     
     let level = Engine.getLevel(Stages, this.clevel);
     let boxes = Engine.getBoxes(level);
    
      this.level = level;
      this.boxes = boxes;
  }
}
</script>

<style>
  #svg-stage {
    width: 80%;
  }

  @media screen and (max-width: 1366px){
    #svg-stage {
      width: 70%;
    }
  }
  @media screen and (max-width: 1024px){
    #svg-stage {
      width: 90%;
    }
  }
  @media screen and (max-width: 768px){
    #svg-stage {
      width: 100%;
    }
  }
</style>


