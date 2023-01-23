<template>
  <div
    @click="handleClick"
    :style="styles"
    class="button-wrapper pointer"
    :class="{ disabled }"
  >
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    border: {
      type: String,
      default: "none",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "black",
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    borderRadius: {
      type: String,
      default: "0",
    },
    textColour: {
      type: String,
      default: "white",
    },
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "35px",
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) this.$emit("click");
    },
  },
  computed: {
    styles() {
      const styles = {
        border: this.border,
        background: this.background,
        height: this.height,
        "font-size": this.fontSize,
        color: this.textColour,
        width: this.width,
        "border-radius": this.borderRadius,
      };
      if (this.disabled) {
        styles.color = "black";
        styles.border = "1px solid gray";
        styles.background = "gray";
      }
      return styles;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/button.scss";
</style>