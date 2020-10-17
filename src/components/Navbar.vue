<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Main' }">
          <span class="nav-title">Smoothie / Recipe</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons add">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 20px;
}

@media (max-width: 380px) {
  span {
    font-size: 2em;
  }
}
</style>