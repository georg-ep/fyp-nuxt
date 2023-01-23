<template>
  <div id="main-body">
    <Nav />
    <div class="flex">
      <Sidebar />
      <div class="content">
        <nuxt />
      </div>
    </div>
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