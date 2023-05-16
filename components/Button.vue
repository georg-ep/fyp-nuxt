<template>
  <div
    @click="handleClick"
    :style="styles"
    :id="_uid"
    class="button-wrapper pointer"
    :class="{ disabled }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    border: {
      type: String,
      default: "1px solid var(--primary)",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "transparent",
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    borderRadius: {
      type: String,
      default: "2px",
    },
    textColour: {
      type: String,
      default: "var(--text-primary)",
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
  mounted() {
    const button = document.getElementById(this._uid);
    button.addEventListener("mouseenter", () =>
      this.border
        ? (button.style.background = this.border.split(" ")[2])
        : (button.style.background = "var(--primary)")
    );
    button.addEventListener(
      "mouseleave",
      () => (button.style.background = this.background)
    );
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