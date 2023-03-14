<template>
  <div class="settings">
    <div class="section mb-24">
      <div class="title">Settings</div>
      <Input :model.sync="username" class="mb-12">
        <template slot="label"><div class="tf-label">Username</div></template>
      </Input>
      <Input :model.sync="dob" :type="'date'" class="mb-12">
        <template slot="label"
          ><div class="tf-label">Date of Birth</div></template
        >
      </Input>
      <GenderBlock :model.sync="gender" class="mb-24" />
      <Button @click="updateSettings">Update Settings</Button>
    </div>
    <div class="section">
      <div class="title">Change Password</div>
      <Input :model.sync="oldPassword" class="mb-12">
        <template slot="label"
          ><div class="tf-label">Old Password</div></template
        >
      </Input>
      <Input :model.sync="newPassword" class="mb-24">
        <template slot="label"
          ><div class="tf-label">New Password</div></template
        >
      </Input>
      <Button @click="changePassword">Change Pasword</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  async asyncData({ $auth }) {
    await $auth.fetchUser();
    const user = $auth.user;
    const username = user.username;
    const dob = user.dob;
    const gender = user.gender;
    return { username, dob, gender };
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    async updateSettings() {
      try {
        const payload = {
          dob: this.dob,
          username: this.username,
          gender: this.gender,
        };
        await this.$store.dispatch("user/updateSettings", payload);
      } catch (e) {}
    },
    async changePassword() {
      try {
        const payload = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };
        this.$store.dispatch("user/changePassword", payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/settings";
</style>