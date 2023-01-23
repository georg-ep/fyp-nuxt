<template>
  <div class="sidebar">
    <div
      class="link"
      v-for="(link, index) in links"
      :key="`sidebar-link_${index}`"
      @click="$router.push(link.route)"
      :class="{link_selected: selected(link)}"
    >
      {{ link.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      links: [
        { name: "Dashboard", route: "/dashboard/" },
        { name: "Mood Logs", route: "/moods/" },
        { name: "Activity Logs", route: "/activities/" },
        { name: "Graph", route: "/graph/" },
        { name: "Calendar", route: "" },
        { name: "Settings", route: "/settings/" },
      ],
    };
  },
  computed: {
    selected() {
      return (link) => link.route === this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/sidebar";
</style>