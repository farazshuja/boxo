<template>
  <div class="modal" :class="{'is-active': show}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>Congratulations! Level 1 completed</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style>
  .modal-content h1 {
    font-size: 22px;
    color: #fff;
    text-align: center;
  }
</style>


