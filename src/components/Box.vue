<template>
  <!--rect @mousedown="boxSelected()" :x="x" :y="y" stroke-width=".5" :stroke="stroke" :fill="fill" :width="width" :height="height" /-->
    <transition 
      name="fade">
        <g @mousedown="boxSelected()" :transform="'translate(' + x + ', ' + y + ')'">
          <path :class="boxClass" :d="d" :key="boxdata.id"/>
        </g>
    </transition>

</template>

<script>
/**
 * TYpes of boxes
 * 0 - empty
 * 1 - wall imoveable
 * 2 - stone
 * 3 - blue
 * 4 - orange
 * 5 - red
 * 6 - redorange
 * 7 - lightblue
 * 8 - orangeyellow
 */

/** Structure of box
 * index:  // index of the box in boxes
 * position: { row, col } // position of box in level map
 * type  // type of box
 * isFreeFalling  // attribute to track if its on motion
 */
export default {
  props: ['boxdata'],  //index of level's stage and its value
  computed: {
    x () {
      return (this.boxdata.position.col * this.width)
      return (this.boxdata.position.col * this.width) + 'px'
    },
    y () {
      return (this.boxdata.position.row * this.height)
      return (this.boxdata.position.row * this.height) + 'px'
    },
    d () {      
      let _d;      
      switch(this.boxdata.type) {
        case 1: _d = 'm.5,.5 v4 h4 v-4 m1,0 v4 h6 v-4 m1,0 v4 h7 v-4 M.5,5.5 v4 h6 v-4 m1,0 v4 h7 v-4 m1,0 v4 h4 v-4 M.5,10.5 v4 h4 v-4 m1,0 v4 h6 v-4 m1,0 v4 h7 v-4 M.5,15.5 v4 h6 v-4 m1,0 v4 h7 v-4 m1,0 v4 h4 v-4'; break;
        case 2: _d = 'M0,0 L20,0 L20,20 L0,20 L0,0'; break;
        default: _d = 'M0,0 v20 h20 v-20';
      }
      return _d;
    },
    boxClass () {
      let _class;
      switch(this.boxdata.type) {
        case 1: _class = {'wall': true}; break;
        case 2: _class = {'stone': true}; break;
        case 3: _class = {'blue': true}; break;
        case 4: _class = {'orange': true}; break;
        case 5: _class = {'red': true}; break;
        case 6: _class = {'redorange': true}; break;
        case 7: _class = {'lightblue': true}; break;
        case 8: _class = {'orangeyellow': true}; break;
        default: _class = {'box': true};
      }
      return _class;
    },
    fill () {
      let color;
      switch(this.boxdata.type) {
        case 1: color = '#c6c2aa'; break;
        case 2: color = '#a1aab4'; break;
        case 3: color = '#62d887'; break;
        case 4: color = '#fff051'; break;
        case 5: color = '#ff71e8'; break;
        default: color = '#ccc'
      }
      return color;
    },
    stroke () {
      let color;
      switch(this.boxdata.type) {
        case 1: color = '#c6c2aa'; break;
        case 2: color = '#5f676b'; break;
        case 3: color = '#0b772a'; break;
        case 4: color = '#9f9402'; break;
        case 5: color = '#9f1b89'; break;
        default: color = '#ccc'
      }
      return color;
    }
  },
  data () {
    return {
      width: 20,
      height: 20
    }
  },
  methods: {
    boxSelected() {
      this.$emit('boxSelected')
    }    
  }
}
</script>

<style>
  path.wall {
    fill: #a88960;
  }
  path.blue {
    fill: #44B3C2;
  }
  path.orange {
    fill: #F1A94E;
  }
  path.red {
    fill: #E45641;
  }
  path.redorange {
    fill: #5D4C46;
  }
  path.lightblue {
    fill: #7B8D8E;
  }
  path.stone {
    fill: #333;
    stroke: #999;
    stroke-width: .5;
  }
</style>


