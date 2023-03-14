<template>
    <Wrapper :steps="steps" :can-proceed="proceed">
      <!-- pass #content="props" for object of passed props -->
      <template #content>
      <ActivityNav :step="step" :steps="steps" @next="step++" @prev="step--" :can-proceed="canProceed" />
      <div class="title title_activity">Create a Custom Activity</div>
      <div v-if="stepIs(1)">
        <div class="mb-12">
          <div>Create a name for your activity</div>
        </div>
        <div class="tf-label tf-label_no-format tf-label_no-pad mb-24">
          This will be the name for your activity, some examples could include
          social media (you can even create one for each, IE Instagram, twitter),
          visit to go and see your grandparents or meditation
        </div>
        <Input
          :model.sync="name"
          :placeholder="'Activity Name'"
          class="mb-12"
        />
      </div>
      <div v-if="stepIs(2)">
        <div class="flex space-between align-center mb-24">
          <div>
            <div>Does the activity require a value</div>
          </div>
          <Checkbox :model.sync="hasValue" />
        </div>
        <div class="tf-label tf-label_no-format tf-label_no-pad mb-24">
          Should the activity include an input field for the entries you make for
          this activity. This is useful when keeping track of activites, for
          example how many glasses of water your drank
        </div>
      </div>
      <div class="w-100" v-if="stepIs(3)">
        <div class="title title_activity">Summary</div>
        <div class="submission_row">
          <div>Name of Activity</div>
          <div class="submission_value">{{ name }}</div>
        </div>
        <div class="submission_row no-border">
          <div>Does the activity have a value?</div>
          <div class="submission_value">{{ hasValue }}</div>
        </div>
        <Button
          :width="'100%'"
          :height="'40px'"
          class="mt-24"
          @click="createNewActivity"
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
  name: "CustomActivity",
  components: { Wrapper, ActivityNav },
  props: {
    steps: {
      type: Number, 
      required: true,
    },
  },
  data() {
    return {
      name: "",
      hasValue: false,
      step: 1,
    };
  },
  computed: {
    canProceed() {
      switch(this.step) {
        case 1:
          return this.name.length;
        case 2:
          return true;
      }
    },
    stepIs() {
      return (val) => this.step === val;
    },
  },
  methods: {
    async createNewActivity() {
      if (this.$store.state.snackbar.show) return;
      try {
        await this.$store.dispatch("activities/create", {
          name: this.name,
          user: this.$auth.user.id,
          has_value: this.hasValue,
        });
        await this.$store.commit("setSnackbar", {
          show: true,
          type: "success",
          text: `Create an activity called '${this.name}'`,
        });
        this.$emit("complete");
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          type: "error",
          text: e?.response?.data?.detail,
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>