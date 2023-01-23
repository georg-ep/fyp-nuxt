<template>
  <div>
    <div class="filters">
      <Button @click="updateDate('previous')"
        ><template slot="content"><</template>
      </Button>
      <div class="flex col align-center">
        <div>{{ formattedDate }}</div>
        <div class="no-results" :class="{ 'no-results_active': !moods.length }">
          No results were found
        </div>
      </div>
      <Button @click="updateDate('next')"
        ><template slot="content">></template>
      </Button>
      <!-- <Input
        v-for="(filter, index) in filters"
        :key="`filter_${index}`"
        class="filter"
        :model.sync="filter.text"
        :background="'white'"
        :border="'1px solid black'"
        :type="filter.type"
        :text-colour="'black'"
        ><template slot="label"
          ><div class="tf-label">{{ filter.name }}</div></template
        ></Input
      > -->
    </div>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      date: new Date(),
      formattedDate: new Date().toLocaleDateString(),
      filters: [
        {
          name: "Start Date",
          type: "date",
          text: "",
          query: "start",
        },
        {
          name: "End Date",
          type: "date",
          text: "",
          query: "end",
        },
      ],
    };
  },
  watch: {
    async date(val) {
      this.formattedDate = val.toLocaleDateString();
      const year = val.getFullYear();
      const month = val.getMonth() + 1;
      const date = val.getDate();
      const time = "T00:00:00Z";
      const lte = `${year}-${month}-${date + 1}`;
      const gte = `${year}-${month}-${date}`;
      try {
        this.moods = (
          await this.$store.dispatch("logs/listMood", {
            datetime__lte: lte + time,
            datetime__gte: gte + time,
          })
        ).results;

        if (this.data?.datasets.length) this.data.datasets[0].data = this.moods;
      } catch (e) {
        console.log(e);
      }
    },
    filters: {
      handler(filters) {
        let query = {};
        filters.forEach((filter) => {
          query = { ...this.$route.query, [filter.query]: filter.text };
          console.log(query);
        });
        this.$router.push({ query });
      },
      deep: true,
    },
  },
  async asyncData({ store }) {
    const moods = (await store.dispatch("logs/listMood")).results;
    return { moods };
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            min: 0,
            max: 10,
            title: {
              display: true,
              text: "Mood Level",
            },
          },
        },
      };
    },
    chartData() {
      return {
        labels: Array.from(this.moods, (el) => el.log_time),
        datasets: [
          {
            label: "Moods",
            backgroundColor: "#f87979",
            data: Array.from(this.moods, (el) => el.level),
          },
        ],
      };
    },
  },
  methods: {
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