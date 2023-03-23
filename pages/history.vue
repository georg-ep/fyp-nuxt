<template>
  <div class="history">
    <div class="title">Your Breathwork History</div>
    <div v-for="(cycle, index) in cycles" :key="`$cycle_${index}`" class="log">
      <!-- <div class="title">{{ cycle.title }}</div> -->
      <div v-if="!combine(index)" class="log_heading">
        <div class="description">{{ cycle.date }}</div>
      </div>
      <div class="log_entry" :class="{ log_entry_last: isLast(index) }">
        <div>{{ cycle.breathing_exercise.name }}</div>
        <div>{{ cycle.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPage",
  async asyncData({ store }) {
    const cycles = (await store.dispatch("breathing/listCycles", { ordering: "-created_at" })).results;
    console.log(cycles[0]);
    return { cycles };
  },
  computed: {
    isLast() {
      return (index) =>
        index + 1 >= this.cycles.length ||
        this.cycles[index].date !== this.cycles[index + 1].date;
    },
    combine() {
      return (index) =>
        index - 1 >= 0 &&
        this.cycles[index].date === this.cycles[index - 1].date;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/history";
</style>