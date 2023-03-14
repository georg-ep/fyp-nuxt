<template>
  <div class="expand-field">
    <div @click="expanded = !expanded" class="dropdown mb-12">
      <div>{{ label }}</div>
      <img :class="{chevron_rotated: expanded}" class="chevron" src="~/assets/icons/chevron-down.svg" alt="" />
    </div>
    <div class="content" :class="{content_expanded: expanded}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpandField",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/input.scss";
</style>