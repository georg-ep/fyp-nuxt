<template>
  <div class="history">
    <div class="section">
      <div class="title">Your Breathwork History</div>
      <div
        v-for="(cycles, date, index1) in groupedCycles"
        :key="`$grouped_cycle_${index1}`"
        class="log"
      >
        <div
          class="log_heading"
          :class="{ log_heading_curved: !isExpanded(date) }"
          @click="handleClick(date)"
        >
          <div class="log_heading_content">
            <div>{{ date }}</div>
            <img
              :class="{ rotate: isExpanded(date) }"
              class="icon"
              src="~/assets/icons/chevron-down.svg"
              alt=""
            />
          </div>
        </div>
        <div
          v-for="(cycle, index2) in cycles"
          :key="`cycle_${index2}`"
          class="log_entry flex align-center space-between"
          :class="{
            log_entry_last: isLast(index1, index2) && isExpanded(date),
            log_entry_expanded: isExpanded(date),
          }"
        >
          <div>
            <div>
              {{ formatCompleted(cycle) }} - You completed
              {{ cycle.exercise }} for
              {{ cycle.duration }}
            </div>
            <ExpandField
              :show-arrow="false"
              :label="'Show Notes'"
              class="mt-12"
              v-if="cycle.mood_before.notes || cycle.mood_after.notes"
            >
              <div v-if="cycle.mood_before.notes">
                Notes Before - {{ cycle.mood_before.notes }}
              </div>
              <div v-if="cycle.mood_after.notes">
                Notes After - {{ cycle.mood_after.notes }}
              </div>
            </ExpandField>
          </div>
          <Button @click="toInsights(cycle)">View Logs</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPage",
  async asyncData({ store }) {
    const groupedCycles = await store.dispatch("breathing/listCycles", {
      ordering: "-created_at",
    });
    return { groupedCycles };
  },
  data() {
    return {
      expanded: [],
      notes: [],
    };
  },
  mounted() {
    setTimeout(
      () => this.expanded.push(Object.keys(this.groupedCycles)[0]),
      1000
    );
  },
  computed: {
    isExpanded() {
      return (date) => this.expanded.includes(date);
    },
    formatCompleted() {
      return (cycle) => {
        const created = cycle.created_at.split("T")[1].split(".")[0];
        const index = created.lastIndexOf(":");
        return created.slice(0, index);
      };
    },
    isLast() {
      return (index1, index2) => {
        const key = Object.keys(this.groupedCycles)[index1];
        return this.groupedCycles[key].length === index2 + 1;
      };
    },
  },
  methods: {
    toInsights(cycle) {
      const date = new Date(cycle.created_at);
      const fMonth = String(date.getMonth() + 1).padStart(2, "0");
      const fDay = String(date.getDate()).padStart(2, "0");
      this.$router.push(
        `/insights/?selectedDate=${date.getFullYear()}-${fMonth}-${fDay}`
      );
    },
    handleClick(date) {
      if (this.expanded.includes(date)) {
        this.expanded = this.expanded.filter((fDate) => fDate !== date);
      } else {
        this.expanded.push(date);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/history";
</style>