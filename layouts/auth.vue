<template>
  <div id="main-body">
    <Nav :position="'absolute'" />
    <div class="auth-wrapper">
      <div class="auth-wrapper_content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/auth";
</style>