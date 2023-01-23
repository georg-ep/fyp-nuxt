<template>
  <div class="media">
    <div class="block">
      <div class="mb-24">Add a media log</div>
      <div class="input-block mb-24">
        <div class="input-block_heading mb-8">Media type</div>
        <Input
          :text-colour="'black'"
          :model.sync="platform1"
          :placeholder="'Select a social platform'"
          :items="items"
          :error="$v.platform1"
          :height="'40px'"
          @item-click="handleItemClick($event, 1)"
          ><template slot="leading-content"
            ><div v-if="platform1img" class="img-slot">
              <img class="img-slot_img" :src="imgSrc" alt="" /></div></template
          ><template slot="trailing-content"
            ><div class="change-slot pointer" @click="reset(1)">
              <div v-if="isFilled(1)">Change</div>
            </div></template
          ></Input
        >
      </div>
      <div class="flex mb-24">
        <div class="input-block">
          <div class="input-block_heading">Time started</div>
          <Input
            :model.sync="timeStart"
            class="time-input"
            :error="$v.timeStart"
            :type="'time'"
            :text-colour="'black'"
          />
        </div>
        <div class="input-block">
          <div class="input-block_heading">Time finished</div>
          <Input
            :model.sync="timeFinish"
            class="time-input"
            :error="$v.timeFinish"
            :type="'time'"
            :text-colour="'black'"
          />
        </div>
      </div>
      <Button
        :border-radius="'4px'"
        :height="'30px'"
        :width="'100%'"
        @click="submitLog"
        ><template slot="content">Submit Media Log</template></Button
      >
      <div
        class="notifier flex center w-100 mt-24"
        :class="{ notifier_active: notifierText }"
      >
        <div>
          {{ notifierText }}
        </div>
      </div>
    </div>
    <div class="block"><div>Record a live media log</div></div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "MediaPage",
  data() {
    return {
      platform1: "",
      platform1img: null,
      platfrom2: "",
      timeStart: "",
      timeFinish: "",
      notifierText: "",
      timeOverlap: false,
    };
  },
  validations() {
    const timeOverlap = () => this.timeOverlap === false;
    const minTime = () => this.timeStart < this.timeFinish;
    return {
      platform1: {
        required,
      },
      timeStart: {
        timeOverlap,
        required,
        minTime,
      },
      timeFinish: {
        timeOverlap,
        required,
        minTime,
      },
    };
  },
  methods: {
    validate(idx) {
      this.timeOverlap = false;
      const fields = {
        0: ["timeStart", "timeFinish", "platform1"],
      };
      fields[idx].forEach((field) => this.$v[field].$touch());
      if (this.$v.$error) return false;
      return true;
    },
    async submitLog() {
      if (!this.validate(0)) return;
      try {
        const payload = {
          user: this.$auth.user.id,
          platform: this.platform1.toLowerCase(),
          log_time: this.formatDate(this.timeStart),
          time_end: this.formatDate(this.timeFinish),
        };
        await this.$store.dispatch("logs/createMedia", payload);
        await this.$auth.fetchUser();
        this.$v.$reset();
        this.timeStart = "";
        this.timeFinish = "";
        this.reset(1);
        this.notifierText = "Media log added!";
        setTimeout(() => (this.notifierText = null), 2000);
      } catch (e) {
        this.timeOverlap = true;
        console.log(e);
      }
    },
    handleItemClick($event, idx) {
      this[`platform${idx}`] = $event.name;
      this[`platform${idx}img`] = $event.path;
    },
    reset(idx) {
      this[`platform${idx}`] = "";
      this[`platform${idx}img`] = null;
    },
  },
  computed: {
    formatDate() {
      return (time) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = time.split(":")[0];
        const min = time.split(":")[1];
        return `${year}-${month}-${day}T${hour}:${min}`;
      };
    },
    isFilled() {
      return (idx) =>
        this[`platform${idx}`] !== "" && this[`platform${idx}img`] !== null;
    },
    imgSrc() {
      return require(`~/assets/icons/${this.platform1img}`);
    },
    items() {
      return [
        { name: "Facebook", path: "socials/facebook.svg" },
        { name: "Instagram", path: "socials/instagram.svg" },
        { name: "Reddit", path: "socials/reddit.svg" },
        { name: "Snapchat", path: "socials/snapchat.svg" },
        { name: "Telegram", path: "socials/telegram.svg" },
        { name: "Tiktok", path: "socials/tiktok.svg" },
        { name: "Twitter", path: "socials/twitter.svg" },
        { name: "Whatsapp", path: "socials/whatsapp.svg" },
        { name: "YouTube", path: "socials/youtube.svg" },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/media";
</style>