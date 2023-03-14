<template>
  <div class="time-field">
    <Input class="flex_1" :model.sync="mHours">
      <template slot="leading-content"><div class="time-field_tag">Hours</div></template>
    </Input>
    <Input class="flex_1" :model.sync="mMinutes">
      <template slot="leading-content"><div class="time-field_tag">Minutes</div></template>
    </Input>
  </div>
</template>

<script>
export default {
  name: "TimeField",
  props: {
    hours: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
  },
  computed: {
    mHours: {
      get() {
        return this.hours;
      },
      set(val) {
        this.$emit("update:hours", val);
      }
    },
    mMinutes: {
      get() {
        return this.minutes;
      },
      set(val) {
        this.$emit("update:minutes", val);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/input.scss";
</style>