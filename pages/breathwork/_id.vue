<template>
  <div class="breathwork_wrapper">
    <NavPanel>
      <template #content>
        <MoodSection @next="step++" v-if="stepIs(1)" :model.sync="before" />

        <Orb
          v-if="stepIs(2)"
          @finish="finish()"
          @start="start()"
          :exercise="exercise"
        />

        <MoodSection
          @finish="submit()"
          v-if="stepIs(3)"
          :last="true"
          :duration="formatTime(duration)"
          :model.sync="after"
        />
      </template>
    </NavPanel>
  </div>
</template>

<script>
import NavPanel from "~/components/activities/NavPanel.vue";
import MoodSection from "~/components/panel-section/Mood.vue";
import time from "~/mixins/time.vue";
export default {
  name: "MeditationPage",
  components: {
    NavPanel,
    MoodSection,
  },
  mixins: [time],
  data() {
    return {
      startTime: null,
      finishTime: null,
      duation: null,
      before: {
        stress: 5,
        focus: 5,
        anger: 5,
        notes: "",
      },
      after: {
        stress: 5,
        focus: 5,
        anger: 5,
        notes: "",
      },
      step: 1,
    };
  },
  async asyncData({ store, route }) {
    const exercise = await store.dispatch("breathing/specific", {
      id: route.params.id,
    });
    console.log(exercise);
    return { exercise };
  },
  computed: {
    stepIs() {
      return (step) => this.step === step;
    },
  },
  methods: {
    start() {
      this.startTime = Date.now() / 1000;
    },
    finish() {
      this.finishTime = Date.now() / 1000;
      this.step++;
      this.duration = Math.floor(this.finishTime - this.startTime);
    },
    async submit() {
      // const body = document.getElementById("main-body");
      // body.style.background = "rgba(#000, 0.1)";
      // body.style.color = "black";
      try {
        await this.$store.dispatch("breathing/submit", {
          mood_before: this.before,
          mood_after: this.after,
          breathing_exercise: this.exercise.id,
          duration: this.formatTime(this.duration),
        });
        await this.$store.commit("setSnackbar", {
          show: true,
          type: "success",
          text: "Successfully added a Breathwork practice",
        });
        this.$router.push("/breathwork/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/breathwork.scss";
</style>