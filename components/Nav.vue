<template>
  <div class="nav" :style="{ position }">
    <div>
      <div class="logo">LOGO</div>
      <div>{{ date }}</div>
    </div>
    <div class="flex flex-end align-center w-100">
      <Button
        :border="'1px solid white'"
        :background="'black'"
        :text-colour="'white'"
        v-if="!user"
        class="mr-8"
        :height="'30px'"
        @click="$router.push('/auth/login/')"
        ><template slot="content">Login</template></Button
      >
      <div v-if="user" class="media-time">
        <div class="label">Daily media time</div>
        <div>{{ mediaTime }}</div>
      </div>
      <Button
        :border="'1px solid white'"
        :background="'black'"
        :text-colour="'white'"
        :height="'30px'"
        @click="buttonClick"
        ><template slot="content">{{ buttonText }}</template></Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    position: {
      type: String,
      default: "relative",
    },
  },
  data() {
    return {
      user: this.$auth.loggedIn,
      date: null,
    };
  },
  mounted() {
    // let time = Date.now();
    // setInterval(() => {
    //   time += 1;
    //   this.date = Date.now().toUTCString()
    // }, 1000);
  },
  computed: {
    mediaTime() {
      const time = this.$auth?.user?.daily_media_time;
      // let timeString = "";
      // const hours = time.split(":")[0];
      // const minutes = time.split(":")[1].split(":")[0];
      // if (hours) timeString += `${hours}h `;
      // if (Number(minutes)) timeString += `${minutes}m`;
      return time ?? "";
    },
    buttonText() {
      return this.user ? "Logout" : "Register";
    },
  },
  methods: {
    buttonClick() {
      if (this.user) return this.logout();
      this.$router.push("/auth/register/");
    },
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/auth/login/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/nav";
</style>