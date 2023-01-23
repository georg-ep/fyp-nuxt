<template>
  <div class="timeline" :class="{ timeline_active: logs.length }">
    <div class="timeline_log flex" v-for="log in logs" :key="`item-${log.id}`">
      <div v-if="isMediaLog(log)" class="timeline_item">
        <div>{{ log.log_time }}</div>
        <div class="central-item flex align-center center">
          <img class="platform" :src="iconSrc(log)" alt="" />
          <div class="ml-8">{{ log.time_spend }}</div>
        </div>
        <div>{{ log.time_end }}</div>
        <div class="info-wrapper"><div class="info">Click for Info</div></div>
      </div>
      <div class="timeline_item" v-else>
        <div>{{ log.log_time }}</div>
        <div class="flex center central-item">
          <div class="indicator" :style="{ background: log.indicator }" />
        </div>
        <div class="feeling">
          {{ logText(log) }}
        </div>
        <div class="info-wrapper"><div class="info">Click for Info</div></div>
      </div>
      <div class="divider" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    logs() {
      const timeline = document.querySelectorAll(".timeline");
      timeline[0].classList.remove("timeline_active");
      setTimeout(() => this.showTimeline(), 200);
    },
  },
  mounted() {
    this.showTimeline();
  },
  methods: {
    showTimeline() {
      if (this.logs.length) {
        const timeline = document.querySelectorAll(".timeline");
        timeline[0].classList.add("timeline_active");
        setTimeout(() => {
          const events = document.querySelectorAll(".timeline_item");
          events.forEach((event, index) =>
            setTimeout(
              () => event.classList.add("timeline_item_active"),
              100 * index
            )
          );
          const dividers = document.querySelectorAll(".divider");
          dividers.forEach((divider, index) =>
            setTimeout(
              () => divider.classList.add("divider_active"),
              100 * index
            )
          );
        }, 200);
      }
    },
  },
  computed: {
    iconSrc() {
      return (log) => require(`~/assets/icons/socials/${log.platform}.svg`);
    },
    logText() {
      return (log) => `${log.feeling_type}`;
    },
    isMediaLog() {
      return (log) => log.log_type === "MediaLog";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/dashboard";
</style>