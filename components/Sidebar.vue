<template>
  <div class="sidebar">
    <div
      class="link"
      v-for="(link, index) in links"
      :key="`sidebar-link_${index}`"
      @click="$router.push(link.route)"
      :class="{ link_selected: selected(link) }"
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
        { name: "Breathwork", route: "/breathwork/" },
        // { name: "Mood Logs", route: "/moods/" },
        // { name: "Activities", route: "/activities/" },
        // { name: "Tools", route: "" },
        // { name: "Insights", route: "/insights/" },
        { name: "Insights", route: "/insights/" },
        { name: "History", route: "/history/" },
        { name: "Settings", route: "/settings/" },
      ],
    };
  },
  computed: {
    selected() {
      return (link) => this.$route.path.includes(link.route);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/sidebar";
</style>