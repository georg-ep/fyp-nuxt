<template>
  <div @click="$emit('update:model', !model)" class="checkbox" :class="{checkbox_checked: model}">
    <img class="icon" :class="{icon_visible: model}" src="~/assets/icons/check.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    model: {
      type: Boolean,
      required: true,
    },
  },

}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/checkbox.scss";
</style>