<template>
  <div class="breathwork">
    <div class="title">Choose a type of Breathwork</div>
    <div
      class="tile"
      v-for="(exercise, index) in exercises"
      :key="`exercise_${index}`"
    >
      <div class="flex align-center space-between">
        <div>
          <div class="title">
            {{ exercise.name }}
          </div>
          <div class="desc">{{ exercise.description }}</div>
        </div>
        <div class="flex col button-wrapper">
          <Button
            class="mb-8"
            @click="$router.push(`/breathwork/${exercise.id}/`)"
            >Begin</Button
          >
          <Button
            v-if="exercise.reference"
            @click="open(exercise.reference)"
            :border="'1px solid var(--info)'"
            >More Info</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeditationPage",
  async asyncData({ store }) {
    const exercises = (await store.dispatch("breathing/list")).results;
    return { exercises };
  },
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/breathwork.scss";
</style>