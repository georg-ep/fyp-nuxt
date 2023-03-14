<template>
      <Wrapper>
      <template #content>
      <ActivityNav :step="step" :steps="steps" @next="step++" @prev="step--" :can-proceed="canProceed" />
      <div class="title title_activity">Add an Activity Log</div>
      <div class="w-100" v-if="stepIs(step, 1)">
        <div class="tf-label tf-label_no-format mb-24">
          Choose an activity which you would like to add a log for. Some examples include exercise or sleep. Note that any custom activities (created below) will also appear here
        </div>
        <div class="pointer mb-24" @click="showChoices = !showChoices" :style="{color: 'var(--primary)'}">{{ !showChoices ? 'View' : 'Hide' }} your activities</div>
        <div class="choices" :class="{ choices_visible: showChoices }">
          <Button :font-size="'12px'" :height="'30px'" @click="selectedActivity=item" v-for="(item, index) in activities" :key="`activity_${index}`"><template slot="content">{{ item.name }}</template></Button>
        </div>
        <Input
          :model.sync="selectedActivity.name"
          :placeholder="'Start typing to view your activities ...'"
          class="flex_1 mb-24"
          :items="activities"
          @item-click="handle($event)"
        />
        <Input
          v-if="selectedActivity.hasValue"
          :model.sync="value"
          :placeholder="'Enter a value for the activity'"
          class="flex_1"
          @item-click="handle($event)"
        />
      </div>
      <div class="w-100" v-if="stepIs(step, 2)">
        <div class="tf-label tf-label_no-format mb-24">
          You can choose to add a specific date and duration to your activity
        </div>
        <div>
          <Button class="mb-12" :width="'100%'" @click="showDate = !showDate"><template slot="content"><img class="button-icon" :src="icon('date')" alt="" /> Date</template></Button>
          <Input
            :class="{animate_show: showDate}"
            :model.sync="start"
            :type="'datetime-local'"
            class="flex_1 animate mb-24"
          />
          <Button class="animate mb-12" :width="'100%'" :class="{animate_show: showDate && start}" @click="showDuration = !showDuration"><template slot="content"><img class="button-icon" :src="icon('duration')" alt="" /> Duration</template></Button>
          <TimeField
            :class="{animate_show: showDuration && showDate && start}"
            class="flex_1 animate"
            :hours.sync="duration.hours"
            :minutes.sync="duration.minutes"
           />
        </div>
      </div>
      <div class="w-100" v-if="stepIs(step, 3)">
        <div>
          <div class="tf-label tf-label_no-format mb-24">How did this activity make you feel? Combine feelings before and after the activity</div>
        </div>
        <div class="tf-label tf-label_no-format">Mood Level ({{ moodLevel }})</div>
        <Slider :model.sync="moodLevel" class="mb-12" />
      </div>
      <div class="w-100" v-if="stepIs(step, 4)">
        <div class="tf-label tf-label_no-format mb-24">Do you have any comments or notes about the activity?</div>
        <Input
          :model.sync="notes"
          :textarea="true"
          :height="'100px'"
          :placeholder="'Enter some notes about the activity ...'"
          class="mb-24"
          />
      </div>
      <div class="w-100" v-if="stepIs(step, 5)">
        <div class="title title_activity">Summary</div>
        <div class="submission_row">
          <div>Activity</div>
          <div class="submission_value">{{ selectedActivity.name }}</div>
        </div>
        <div v-if="value" class="submission_row">
          <div>Activity Value</div>
          <div class="submission_value">{{ value }}</div>
        </div>
        <div class="submission_row">
          <div>How the activity made you feel</div>
          <div class="submission_value">{{ moodLevel }} / 10</div>
        </div>
        <div v-if="showDate" class="submission_row">
          <div>Date & Time</div>
          <div class="submission_value">{{ start.split("T")[0] }} | {{ start.split("T")[1] }}</div>
        </div>
        <div v-if="showDuration" class="submission_row">
          <div>Duration</div>
          <div class="submission_value">{{ getDuration }}</div>
        </div>
        <div v-if="notes" class="submission_row no-border">
          <div>Notes</div>
          <div @click="step = 4" class="submission_value pointer">View Notes</div>
        </div>
        <Button
          @click="addNewActivity"
          :width="'100%'"
          :height="'40px'"
          ><template slot="content">Submit</template></Button
        >
      </div>
      </template>
    </Wrapper>
</template>

<script>
import Wrapper from "~/components/activities/NavPanel.vue";
import ActivityNav from "~/components/activities/ActivityNav.vue";
export default {
  name: "DailyActivity",
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
    steps: {
      type: Number,
      required: true,
    },
  },
  components: { Wrapper, ActivityNav },
  data() {
    return {
      showChoices: false,
      showDate: false,
      showDuration: false,
      selectedActivity: { name: "", hasValue: false, },
      moodLevel: 5,
      value: "",
      start: "",
      notes: "",
      duration: {
        hours: "",
        minutes: "",
      },
      step: 1,
    };
  },
  computed: {
    getDuration() {
      const { hours, minutes } = this.duration;
      return hours && minutes 
        ? `${hours}h ${minutes}m` 
        : hours 
          ? `${hours}h`
          : `${minutes}m`;
    },
    canProceed() {
      switch (this.step) {
        case 1:
        case 3:
        case 4:
          return true;
        case 2:
          return Boolean(this.selectedActivity.name.length);
      }
    },
    stepIs() {
      return (step, val) => step === val;
    },
    icon() {
      return (type) => {
        return type === "date" 
          ? this.showDate 
            ? require("~/assets/icons/cross.svg") 
            : require("~/assets/icons/add.svg") 
          : type === "duration" 
            ? this.showDuration 
              ? require("~/assets/icons/cross.svg") 
              : require("~/assets/icons/add.svg")
            : null;
      };
    },
  },
  methods: {
    handle($event) {
      this.selectedActivity = $event;
    },
    async addNewActivity() {
      
      try {
        const activity = await this.$store.dispatch("activities/add", {
          user: this.$auth.user.id,
          activity: this.selectedActivity.id,
          is_custom: this.selectedActivity.is_custom,
          start_time: this.start,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>