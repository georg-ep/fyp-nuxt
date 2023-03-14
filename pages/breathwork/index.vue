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
        <Button @click="$router.push(`/breathwork/${exercise.id}/`)"
          >Begin</Button
        >
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
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/breathwork.scss";
</style>