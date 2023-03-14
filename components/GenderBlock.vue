<template>
  <div>
    <div class="tf-label tf-label_no-format mb-12">Gender</div>
    <div class="mb-12">
      <div class="flex space-between">
        <Button
          :width="'32%'"
          :background="gender === 'male' ? 'var(--primary)' : 'transparent'"
          :text-colour="'white'"
          :font-size="'15px'"
          :height="'45px'"
          @click="gender = 'male'"
          >Male</Button
        >
        <Button
          :width="'32%'"
          :height="'45px'"
          :background="gender === 'female' ? 'var(--primary)' : 'transparent'"
          :text-colour="'white'"
          @click="gender = 'female'"
          :font-size="'15px'"
          >Female</Button
        >
        <Button
          :width="'32%'"
          :height="'45px'"
          :background="gender === 'other' ? 'var(--primary)' : 'transparent'"
          :text-colour="'white'"
          @click="gender = 'other'"
          :font-size="'15px'"
          >Prefer Not to Say</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenderBlock",
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      gender: "",
    };
  },
  mounted() {
    this.gender = this.model;
  },
  watch: {
    gender(val) {
      this.$emit("update:model", val);
    },
  },
};
</script>

<style>
</style>