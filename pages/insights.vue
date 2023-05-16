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
            <div class="date-filters">
              <Input
                v-for="(filter, index) in dateFilters"
                :key="`filter_${index}`"
                class="filter flex_1"
                :model.sync="filter.text"
                :type="filter.type"
                :text-colour="'var(--text-primary)'"
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
          <div class="date-filters mt-12 mb-12">
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
              :text-colour="'var(--text-primary)'"
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
      function pad(date) {
        return String(date).padStart(2, '0');
      };
      const year = val.getFullYear();
      const month = val.getMonth() + 1;
      const day = val.getDate();
      const lte = `${year}-${pad(month)}-${pad(day + 1)}`;
      const gte = `${year}-${pad(month)}-${pad(day)}`;
      try {
        this.cycles = await this.$store.dispatch("breathing/listCycles", {
          gte,
          lte,
          ordering: "-created_at",
        });
      } catch (e) {
        console.log(e);
      }
    },
    dateFilters: {
      async handler(val) {
        const gte = val[0].text;
        const lte = val[1].text;
        this.cycles = await this.$store.dispatch("breathing/listCycles", {
          lte,
          gte,
        });

        const startDate = this.formatDate(val[0].text);
        const endDate = this.formatDate(val[1].text);

        this.dateRange =
          startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
      },
      deep: true,
    },
  },
  async asyncData({ store, route }) {
    let selectedDate = Date.now();
    function pad(val) {
      return String(val).padStart(2, '0');
    };
    let date, year, month, day, lte, gte;
    if (!route.query.selectedDate) {
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      lte = `${year}-${pad(month)}-${pad(day + 1)}`;
      gte = `${year}-${pad(month)}-${pad(day)}`;
    } else {
      const arr = route.query.selectedDate.split("-");
      selectedDate = new Date(arr[0], arr[1] - 1, arr[2]);
      const date = selectedDate;
      lte = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
      gte = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    const cycles = await store.dispatch("breathing/listCycles", {
      lte,
      gte,
      ordering: "-created_at",
    });

    return { cycles, selectedDate };
  },
  computed: {
    pad() {
      return (val) =>  String(val).padStart(2, '0');
    },
    formatDate() {
      return (date) => {
        var date = new Date(date);
        return `${date.getDate()}th ${date.toLocaleString("default", {
          month: "short",
        })}`;
      };
    },
    combinedCycles() {
      let cycles = [];
      for (const key in this.cycles) {
        for (const val in this.cycles[key]) {
          cycles = [...cycles, this.cycles[key][val]];
        }
      }
      return cycles;
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
      console.log("redrawing");
      return {
        labels: Array.from(this.combinedCycles, (el) => el.time),
        datasets: [
          {
            label: `${this.compareFilters[0].item.name} Before`,
            yAxisID: "y",
            backgroundColor: "blue",
            borderColor: "blue",
            data: Array.from(
              this.combinedCycles,
              (el) => el.mood_before[beforeType]
            ),
          },
          {
            label: `${this.compareFilters[1].item.name} After`,
            yAxisID: "y1",
            borderColor: "green",
            backgroundColor: "green",
            data: Array.from(
              this.combinedCycles,
              (el) => el.mood_after[afterType]
            ),
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