<template>
    <div class="wrapper_nav">
      <div @click="change('prev')" :class="{wrapper_nav_item_disabled: stepIs(1)}" class="wrapper_nav_item">Back</div>
      <div @click="change('next')" :class="{wrapper_nav_item_disabled: !canProceed}" class="wrapper_nav_item">Next</div>
    </div>
</template>

<script>
export default {
  name: "ActivityNav",
  props: {
    step: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    canProceed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    stepIs() {
      return (step) => this.step === step;
    },
  },
  methods: {
    change(type) {
      const prev = type === "prev";
      const next = type === "next";
      if (next && !this.canProceed) return;
      if (prev && this.step < 2) return;
      if (next && this.step === this.steps) return;
      type === "next" ? this.$emit('next') : this.$emit('prev');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>