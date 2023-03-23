<template>
  <div class="dashboard">
    <div class="section">
      <div class="title">Welcome back</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashbordPage",
  data() {
    return {
      items: ["test", "test2", "test3", "test4", "test5"],
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/dashboard";
</style>