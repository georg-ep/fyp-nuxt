<template>
  <div id="main-body">
    <Nav />
    <div class="flex">
      <Sidebar class="sidebar" />
      <div class="content">
        <nuxt />
      </div>
    </div>
    <Snackbar />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/default";
</style>