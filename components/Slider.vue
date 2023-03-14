<template>
  <div class="slider-container">
    <div class="tf-label no-bg no-border mb-8">{{ label }} ({{model}})</div>
    <input
      v-model="input"
      class="slider"
      type="range"
      min="1"
      max="10"
    />
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    model: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    input: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("update:model", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/slider.scss";
</style>