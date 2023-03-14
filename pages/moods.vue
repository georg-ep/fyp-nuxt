<template>
  <div class="media">
    <div class="section">
      <div class="title">Create a Mood Log</div>
      <div class="flex space-between gap-10 align-center">
        <div class="flex_1">
          <div class="tf-label tf-label_no-format mb-12">
            Mood level ({{ moodLevel }})
          </div>
          <Slider :model.sync="moodLevel" class="mb-12 flex_1" />
        </div>
        <Button v-if="!showDate" @click="showDate = true"
          >Add Date & Time</Button
        >
        <Input
          v-if="showDate"
          :model.sync="datetime"
          :type="'datetime-local'"
          class="mb-12 flex_1"
          ><template slot="label"
            ><div class="tf-label">
              Date & time (Leaving blank will take current date & time)
            </div></template
          ></Input
        >
      </div>
      <Input
        :model.sync="notes"
        :textarea="true"
        :height="'100px'"
        class="mb-12"
        ><template slot="label"
          ><div class="tf-label">Notes</div></template
        ></Input
      >
      <Button @click="submit">Submit</Button>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "MediaPage",
  data() {
    return {
      moodLevel: "5",
      notes: "",
      datetime: null,
      showDate: false,
    };
  },
  methods: {
    async submit() {
      try {
        const payload = {
          level: this.moodLevel,
          notes: this.notes,
          datetime: this.datetime,
          user: this.$auth.user.id,
        };
        await this.$store.dispatch("logs/createMood", payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/media";
</style>