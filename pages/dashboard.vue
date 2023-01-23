<template>
  <div class="dashboard">
    <div v-if="$auth.user.name" class="welcome">
      Welcome back, {{ $auth.user.name }}
    </div>
    <div class="flex"></div>
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