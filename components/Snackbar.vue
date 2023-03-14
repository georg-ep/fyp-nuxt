<template>
  <div :class="{ snackbar_visible: showSnackbar }" :style="{background: colour}" class="snackbar">
    {{ snackbarData.text }}
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  watch: {
    showSnackbar(_) {
      setTimeout(() => this.$store.commit("setSnackbar", {
        show: false,
        text: "",
        type: "",
      }), 5000);
    },
  },
  computed: {
    showSnackbar() {
      return this.$store.state.snackbar.show;
    },
    snackbarData() {
      return this.$store.state.snackbar;
    },
    colour() {
      const config = {
        success: "var(--success)",
        error: "var(--error)",
      };
      return config[this.snackbarData.type];
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/snackbar.scss";
</style>