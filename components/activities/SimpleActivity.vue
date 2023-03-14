<template>
      <div>
      <div class="title">Create a Simple Activity</div>
      <Input
        :model.sync="name"
        :placeholder="'Activity Name'"
        class="mb-12"
      >
        <template slot="label"
          ><div class="tf-label">Enter a name for the activity</div></template
        ></Input
      >
      <div class="tf-label tf-label_no-format">Mood Level ({{ moodLevel }})</div>
      <Slider :model.sync="moodLevel" class="mb-12" />
      <Input
        :model.sync="notes"
        :textarea="true"
        :height="'100px'"
        class="mb-24"
        ><template slot="label"
          ><div class="tf-label">Notes</div></template
        ></Input
      >
      <Button
        :height="'40px'"
        :width="'100%'"
        @click="createNewActivity"
        ><template slot="content">Submit</template></Button
      >
    </div>
</template>

<script>
import Wrapper from "~/components/activities/NavPanel.vue";

export default {
  name: "SimpleActivity",
  components: { Wrapper },
  data() {
    return {
      name: "",
      moodLevel: 5,
      notes: "",
    };
  },
  methods: {
    createNewActivity() {
      //TODO: some shit
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>