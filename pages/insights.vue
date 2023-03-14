<template>
  <div class="graph-wrapper">
    <div class="section">
      <div class="filters">
        <div class="flex_1 section">
          <div class="title">Date Selection</div>
          <div class="flex space-between mt-24">
            <Button :height="'30px'" @click="updateDate('previous')">< </Button>
            <div class="flex col align-center">
              <div>{{ dateRange ? dateRange : formatDate(selectedDate) }}</div>
            </div>
            <Button :height="'30px'" @click="updateDate('next')">> </Button>
          </div>
          <ExpandField class="mt-24" :label="'Custom Dates'">
            <div class="flex">
              <Input
                v-for="(filter, index) in dateFilters"
                :key="`filter_${index}`"
                class="filter flex_1"
                :model.sync="filter.text"
                :type="filter.type"
                :text-colour="'white'"
              >
                <template #leading-content>
                  <div class="filter-label">
                    {{ filter.name }}
                  </div>
                </template>
              </Input>
            </div>
          </ExpandField>
        </div>
        <div class="flex_1 section">
          <div class="title">Compare Stats</div>
          <div class="flex mt-12 mb-12">
            <Input
              v-for="(filter, index) in compareFilters"
              :key="`filter_${index}`"
              class="filter flex_1"
              :model.sync="filter.item.name"
              :items="compareItems"
              @item-click="
                filter.item = $event;
                filter.showDropdown = false;
              "
              @click="filter.showDropdown = !filter.showDropdown"
              @hide="hideDropdown(index)"
              :type="filter.type"
              :show-dropdown="filter.showDropdown"
              :disabled="true"
              :text-colour="'white'"
            >
              <template #leading-content>
                <div class="filter-label filter-label_larger">
                  {{ filter.name }} Session
                </div>
              </template>
              <template #trailing-content>
                <img
                  class="dropdown-arrow"
                  :class="{ 'dropdown-arrow_selected': filter.showDropdown }"
                  src="~/assets/icons/chevron-down.svg"
                  alt=""
                />
              </template>
            </Input>
          </div>
        </div>
      </div>
      <LineChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InsightsPage",
  data() {
    return {
      date: new Date(),
      selectedDate: Date.now(),
      dateRange: null,
      compareItems: [{ name: "Stress" }, { name: "Anger" }, { name: "Focus" }],
      dateFilters: [
        {
          name: "Start",
          type: "date",
          text: new Date().toISOString().slice(0, 10),
          query: "start",
        },
        {
          name: "End",
          type: "date",
          text: new Date().toISOString().slice(0, 10),
          query: "end",
        },
      ],
      compareFilters: [
        {
          name: "Before",
          type: "text",
          item: { name: "Stress" },
          query: "before",
          showDropdown: false,
        },
        {
          name: "After",
          type: "text",
          item: { name: "Stress" },
          query: "after",
          showDropdown: false,
        },
      ],
    };
  },
  watch: {
    async date(val) {
      this.dateRange = null;
      this.selectedDate = val;
      const year = val.getFullYear();
      const month = val.getMonth() + 1;
      const date = val.getDate();
      const time = "T00:00:00Z";
      const lte = `${year}-${month}-${date + 1}`;
      const gte = `${year}-${month}-${date}`;
      try {
        this.cycles = (
          await this.$store.dispatch("breathing/listCycles", {
            created_at__lte: lte + time,
            created_at__gte: gte + time,
            ordering: "-created_at",
          })
        ).results;

        if (this.data?.datasets.length) {
          this.data.datasets[0].data = this.cycles.mood_before;
          this.data.datasets[1].data = this.cycles.mood_after;
        }
      } catch (e) {
        console.log(e);
      }
    },
    dateFilters: {
      async handler(val) {
        const gte = val[0].text + "T00:00:00Z";
        const lte = val[1].text + "T23:59:59Z";
        this.cycles = (
          await this.$store.dispatch("breathing/listCycles", {
            created_at__lte: lte,
            created_at__gte: gte,
          })
        ).results;

        const startDate = this.formatDate(val[0].text);
        const endDate = this.formatDate(val[1].text);

        this.dateRange =
          startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
      },
      deep: true,
    },
  },
  async asyncData({ store }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const lte = `${year}-${month}-${day + 1}` + "T23:59:59Z";
    const gte = `${year}-${month}-${day}` + "T00:00:00Z";
    const cycles = (
      await store.dispatch("breathing/listCycles", {
        created_at__lte: lte,
        created_at__gte: gte,
        ordering: "-created_at",
      })
    ).results;
    return { cycles };
  },
  computed: {
    formatDate() {
      return (date) => {
        var date = new Date(date);
        return `${date.getDate()}th ${date.toLocaleString("default", {
          month: "short",
        })}`;
      };
    },
    chartOptions() {
      return {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            grid: {
              color: "#e96f4665",
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            min: 1,
            max: 10,
            grid: {
              color: "#e96f4665",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            min: 1,
            max: 10,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    },
    chartData() {
      const beforeType = this.compareFilters[0].item.name.toLowerCase();
      const afterType = this.compareFilters[1].item.name.toLowerCase();
      return {
        labels: Array.from(this.cycles, (el) => el.time),
        datasets: [
          {
            label: `${this.compareFilters[0].item.name} Before`,
            yAxisID: "y",
            backgroundColor: "blue",
            borderColor: "blue",
            data: Array.from(this.cycles, (el) => el.mood_before[beforeType]),
          },
          {
            label: `${this.compareFilters[1].item.name} After`,
            yAxisID: "y1",
            borderColor: "green",
            backgroundColor: "green",
            data: Array.from(this.cycles, (el) => el.mood_after[afterType]),
          },
        ],
      };
    },
  },
  methods: {
    hideDropdown(index) {
      setTimeout(() => (this.compareFilters[index].showDropdown = false), 100);
    },
    updateDate(type) {
      const config = {
        previous: this.date.getDate() - 1,
        next: this.date.getDate() + 1,
      };
      this.date = new Date(this.date.setDate(config[type]));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/graph.scss";
</style>