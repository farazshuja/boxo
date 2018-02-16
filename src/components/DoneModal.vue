<template>
  <transition name="bounce">
    <div v-if="show" class="modal" :class="{'is-active': show}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1>Level completed</h1>      
        <div class="has-text-centered">
          <button v-if="clevel < 2" @click="next" class="button is-primary">Next Level?</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['show', 'clevel'],
  methods: {
    next() {
      this.$emit('nextlevel');
    }
  }
}
</script>

<style>
  .modal-content {
    background: #fff;
    padding: 10px;
  }
  .modal-content h1 {
    font-size: 22px;
    text-align: center;
  }
</style>


