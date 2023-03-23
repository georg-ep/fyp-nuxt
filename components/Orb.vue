<template>
  <div class="flex space-between w-100">
    <div class="section flex_2 flex col align-center">
      <div class="orb_container">
        <div class="orb">
          <div v-if="started" class="title instructions">
            <div class="instruction">
              {{ instruction }}
            </div>
            <div class="phase">
              {{ phaseTimer }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section ml-8">
      <div class="title">Action Panel</div>
      <div>
        <Button
          :width="'100%'"
          class="mb-24"
          :border="'1px solid var(--error)'"
          @click="showInstructions = !showInstructions"
          >Feeling Distressed?</Button
        >
      </div>
      <div>
        <Button v-if="!phase" :width="'100%'" class="mb-12" @click="start"
          >Begin</Button
        >
      </div>
      <div>
        <Button
          :width="'100%'"
          class="mb-12"
          @click="showInstructions = !showInstructions"
          >{{ instructionsText }}</Button
        >
      </div>
      <div>
        <Button
          v-if="phase"
          class="mb-24"
          :width="'100%'"
          @click="$emit('finish')"
          >Finish</Button
        >
      </div>
      <div v-if="showInstructions" class="section">
        <div class="ta-c">
          {{ exercise[`${this.phase}_notes`] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import time from "~/mixins/time.vue";
export default {
  name: "MeditatePage",
  mixins: [time],
  props: {
    exercise: {
      type: Object,
      require: true,
    },
    cycles: {
      type: Number,
      default: null,
    },
  },
  beforeDestroy() {
    this.phase = null;
  },
  data() {
    return {
      phase: "",
      phaseTimer: 0,
      totalTime: 0,
      timerInterval: null,
      showInstructions: false,
      started: false,
      cyclesCompleted: 0,
    };
  },
  watch: {
    phase(type) {
      const orb = document.getElementsByClassName("orb")[0];
      const exercise = this.exercise;
      switch (type) {
        case "inhale":
          orb.classList.add("enlarge");
          orb.style["-webkit-animation-duration"] = `${exercise.inhale}s`;
          this.restartTimer("inhale");
          this.instruction = "Inhale";
          break;
        case "hold_inhale":
          orb.classList.add("hold");
          orb.classList.remove("enlarge");
          this.restartTimer("hold_inhale");
          this.instruction = "Hold";
          break;
        case "exhale":
          orb.classList.remove("hold");
          orb.classList.add("shrink");
          orb.style["-webkit-animation-duration"] = `${exercise.exhale}s`;
          this.restartTimer("exhale");
          this.instruction = "Exhale";
          break;
        case "hold_exhale":
          orb.classList.remove("shrink");
          this.restartTimer("hold_exhale");
          this.instruction = "Hold";
          break;
        default:
          break;
      }
    },
  },
  computed: {
    instructionsText() {
      return this.showInstructions ? "Hide Instructions" : "Show Instructions";
    },
    duration() {
      return (type) => {
        const exercise = this.exercise;
        switch (type) {
          case "inhale":
            return exercise.inhale;
          case "hold_inhale":
            return exercise.inhale + exercise.hold_inhale;
          case "exhale":
            return exercise.inhale + exercise.hold_inhale + exercise.exhale;
          case "hold_exhale":
            return (
              exercise.inhale +
              exercise.hold_inhale +
              exercise.exhale +
              exercise.hold_exhale
            );
        }
      };
    },
  },
  methods: {
    start() {
      this.started = true;
      this.animate();
      setInterval(() => this.totalTime++, 1000);
      this.$emit("start");
    },
    restartTimer(duration) {
      clearInterval(this.timerInterval);
      this.phaseTimer = this.exercise[duration];
      this.timerInterval = setInterval(() => +this.phaseTimer--, 1000);
    },
    animate() {
      if (this.cycles && this.cyclesCompleted === Number(this.cycles)) {
        clearInterval(this.timerInterval);
        this.instruction = "Complete";
        this.phaseTimer = null;
        this.phase = null;
        return;
      }
      this.$nextTick(() => {
        this.phase = "inhale";
        setTimeout(
          () => (this.phase = "hold_inhale"),
          this.duration("inhale") * 1000
        );
        setTimeout(
          () => (this.phase = "exhale"),
          this.duration("hold_inhale") * 1000
        );
        setTimeout(
          () => (this.phase = "hold_exhale"),
          this.duration("exhale") * 1000
        );
        setTimeout(() => {
          this.cyclesCompleted++;
          this.animate();
        }, this.duration("hold_exhale") * 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/meditate.scss";
</style>