<template>
  <div class="panel_mood section">
    <!-- <div class="title">{{ title }}</div> -->
    <div class="section mb-24">
      <div class="title">How are you feeling?</div>
      <Slider class="mb-12" :label="'Stress Level'" :model.sync="stress" />
      <Slider class="mb-12" :label="'Focus Level'" :model.sync="focus" />
      <Slider class="mb-12" :label="'Anger Level'" :model.sync="anger" />
    </div>
    <div class="section mb-24">
      <div class="title">Notes</div>
      <Input
        :model.sync="notes"
        :border="'none'"
        :height="'100px'"
        :textarea="true"
        :placeholder="'Add some notes ...'"
      />
    </div>
    <ExpandField class="mb-24" v-if="!last" :label="'Add a cycle limit'">
      <Input :placeholder="'Cycles'" :model.sync="cycles">
        <template #leading-content>
          <div class="minutes">Number of Cycles</div>
        </template>
      </Input>
    </ExpandField>
    <div v-if="last" class="flex space-between mb-24">
      <div>Duration of Breathwork</div>
      <div>{{ duration }}</div>
    </div>
    <Button :width="'100%'" @click="$emit(emitMsg)">{{ buttonText }}</Button>
  </div>
</template>

<script>
export default {
  name: "MoodSection",
  props: {
    model: {
      type: Object,
      required: true,
    },
    last: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      default: "",
    },
  },
  computed: {
    cycles: {
      get() {
        return this.model.cycles;
      },
      set(val) {
        this.$emit("update:model", { ...this.model, cycles: val });
      },
    },
    title() {
      return this.last
        ? "You've completed your Breathwork, how are you feeling?"
        : "You're about to start some Breathwork, how are you feeling?";
    },
    notes: {
      get() {
        return this.model.notes;
      },
      set(val) {
        this.$emit("update:model", { ...this.model, notes: val });
      },
    },
    stress: {
      get() {
        return this.model.stress;
      },
      set(val) {
        this.$emit("update:model", { ...this.model, stress: val });
      },
    },
    anger: {
      get() {
        return this.model.anger;
      },
      set(val) {
        this.$emit("update:model", { ...this.model, anger: val });
      },
    },
    focus: {
      get() {
        return this.model.focus;
      },
      set(val) {
        this.$emit("update:model", { ...this.model, focus: val });
      },
    },
    emitMsg() {
      return this.buttonText.toLowerCase();
    },
    buttonText() {
      return this.last ? "Finish" : "Next";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/breathwork.scss";
</style>