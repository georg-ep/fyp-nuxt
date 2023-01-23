<template>
  <div class="slider-container">
    <slot name="label" />
    <input
      v-model="input"
      class="slider"
      type="range"
      min="1"
      max="10"
      value="5"
    />
  </div>
</template>

<script>
export default {
  name: "Slider",
  model: {
    type: String,
    required: true,
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