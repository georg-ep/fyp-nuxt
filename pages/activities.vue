<template>
  <div class="activities">
    <IndexActivity @select="selected = $event" class="activities_section" />
    <DailyActivity  @complete="selected = ''" :steps="steps.daily" v-if="selected === 'add-custom'" :activities="userActivities" />
    <SimpleActivity @complete="selected = ''" :steps="steps.simple" v-if="selected === 'add-simple'" />
    <CustomActivity @complete="selected = ''" :steps="steps.custom" v-if="selected === 'create-custom'" />
  </div>
</template>

<script>
import IndexActivity from "~/components/activities/IndexActivity.vue";
import DailyActivity from "~/components/activities/DailyActivity.vue";
import CustomActivity from "~/components/activities/CustomActivity.vue";
import SimpleActivity from "~/components/activities/SimpleActivity.vue";
export default {
  name: "ActivitiesPage",
  components: { DailyActivity, CustomActivity, SimpleActivity, IndexActivity },
  data() {
    return {
      addedActivites: [],
      selected: "",
      steps: {
        daily: 5,
        simple: 1,
        custom: 3,
      },
    };
  },
  async asyncData({ $auth }) {
    const user = $auth.user;
    return { userActivities: user.activities.concat(user.custom_activities) };
  },
  computed: {
    activities() {
      return this.userActivities.concat(this.addedActivites);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>