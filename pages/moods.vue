<template>
  <div class="media">
    <div class="section">
      <div class="title">Create a Mood Log</div>
      <div class="flex space-between gap-10 align-center">
        <Slider :model.sync="moodLevel" class="mb-12 flex_1">
          <template slot="label"
            ><div class="tf-label no-border">Mood level</div></template
          >
        </Slider>
        <Input
          :model.sync="moodLevel"
          :border="'1px solid black'"
          :text-colour="'black'"
          class="mb-12"
          ><template slot="label"
            ><div class="tf-label">Mood Level</div></template
          ></Input
        >
        <Input
          :model.sync="datetime"
          :border="'1px solid black'"
          :text-colour="'black'"
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
        :border="'1px solid black'"
        :text-colour="'black'"
        :type="'textarea'"
        :rows="3"
        :height="'100px'"
        class="mb-12"
        ><template slot="label"
          ><div class="tf-label">Notes</div></template
        ></Input
      >
      <Button @click="submit"
        ><template slot="content">Submit</template></Button
      >
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