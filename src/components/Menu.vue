<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <div class="navbar-item brand-logo">
        Boxo <span>v0.6</span>
      </div>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="navbar-item has-text-weight-bold">Level: {{level}}</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['level']
}
</script>


<style scoped>
  nav.navbar {
    background: rgba(100,100,100,.3);
    padding: 0 10px;
  }
  .brand-logo {
    font-size: 22px;
    font-weight: bold;
  }
  .brand-logo span {
    font-size: 14px;
    font-weight: 700;
    padding-left: 10px;
  }
</style>

