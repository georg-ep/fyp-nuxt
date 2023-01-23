<template>
  <div class="activities">
    <div class="flex space-between gap-8">
      <div class="section">
        <div class="title">Add New Activity Type</div>
        <div class="flex mb-12 align-end gap-8">
          <Input
            :model.sync="createActivity.name"
            :text-colour="'black'"
            :placeholder="'Activity Name'"
            :border="'1px solid black'"
          >
            <template slot="label"
              ><div class="tf-label">
                Enter a name for the activity
              </div></template
            ></Input
          >
          <Input
            :model.sync="createActivity.colour"
            :text-colour="'black'"
            :placeholder="'Activity Colour'"
            :border="'1px solid black'"
          >
            <template slot="label"
              ><div class="tf-label">
                Choose a colour for the activity
              </div></template
            ><template slot="trailing-content"
              ><div
                class="activity-colour"
                :class="{ 'activity-colour_active': createActivity.support }"
                :style="{ background: createActivity.colour }" /></template
          ></Input>
          <Button
            :border-radius="'2px'"
            :height="'40px'"
            class="flex_1"
            @click="createNewActivity"
            ><template slot="content">Submit</template></Button
          >
        </div>
        <div class="mb-12">Your current activites are</div>
        <div class="activity-items">
          <div
            v-for="(activity, index) in activities"
            :key="`activity_${index}`"
          >
            <div class="activity_item" :style="{ background: activity.colour }">
              {{ activity.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="section flex_1">
        <div class="title">Add an Activity for Today</div>
        <div class="flex space-between gap-8 mb-12">
          <Input
            class="flex_1"
            :model.sync="addActivity.start"
            :text-colour="'black'"
            :placeholder="'Activity Name'"
            :type="'datetime-local'"
            :border="'1px solid black'"
          >
            <template slot="label"
              ><div class="tf-label">Select a start time</div></template
            ></Input
          >
          <Input
            class="flex_1"
            :model.sync="addActivity.finish"
            :text-colour="'black'"
            :placeholder="'Activity Name'"
            :type="'datetime-local'"
            :border="'1px solid black'"
          >
            <template slot="label"
              ><div class="tf-label">Select a finish time</div></template
            ></Input
          >
        </div>
        <div class="flex align-end gap-8">
          <Input
            :model.sync="addActivity.name"
            :text-colour="'black'"
            :placeholder="'Activity Name'"
            :border="'1px solid black'"
            class="flex_1"
            :items="activities"
            @item-click="handle($event)"
          >
            <template slot="label"
              ><div class="tf-label">Search for an activity</div></template
            ></Input
          >
          <Button @click="addNewActivity" :border-radius="'2px'" :height="'40px'"
            ><template slot="content">Submit</template></Button
          >
        </div>
      </div>
    </div>
    <div class="section"><div class="title">Edit fixed activities</div></div>
  </div>
</template>

<script>
export default {
  name: "ActivitiesPage",
  data() {
    return {
      createActivity: {
        name: "",
        colour: "",
        support: false,
      },
      addActivity: {
        name: "",
        id: "",
        start: "",
        finish: "",
      },
      addedActivites: [],
      changedColours: {},
    };
  },
  watch: {
    "createActivity.colour"(val) {
      if (CSS.supports("color", val))
        return (this.createActivity.support = true);
      this.createActivity.support = false;
    },
  },
  async asyncData({ $auth }) {
    return { userActivities: $auth.user.activities };
  },
  computed: {
    activities() {
      return this.userActivities.concat(this.addedActivites);
    },
  },
  methods: {
    handle($event) {
      this.addActivity.name = $event.name;
      this.addActivity.id = $event.id;
    },
    async addNewActivity() {
      try {
        const activity = await this.$store.dispatch("activities/add", {
          user: this.$auth.user.id,
          activity: this.addActivity.id,
          start_time: this.addActivity.start,
          end_time: this.addActivity.finish,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async createNewActivity() {
      try {
        const activity = await this.$store.dispatch("activities/create", {
          name: this.createActivity.name,
          colour: this.createActivity.colour,
        });
        this.addedActivites.push(activity);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>