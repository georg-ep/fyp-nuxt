<template>
  <div class="wrapper">
    <div class="wrapper_content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavPanel",
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>