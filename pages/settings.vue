<template>
  <div class="settings">
    <div class="section mb-24">
      <div class="title">Settings</div>
      <Input :error="$v.email" :model.sync="email" class="mb-12">
        <template #label>Email</template>
      </Input>
      <Input :model.sync="dob" :type="'date'" class="mb-12">
        <template #label>Date of Birth</template>
      </Input>
      <!-- <GenderBlock :model.sync="gender" class="mb-24" /> -->
      <div class="mb-24 section">
        <div class="flex space-between mb-8">
          Enable 2FA?
          <Checkbox :model.sync="twoFA" />
        </div>
        <div class="note">
          You will need access to a mobile device with an authenticator
          application
        </div>
        <a
          target="_blank"
          href="https://computing.which.co.uk/hc/en-gb/articles/360006153539-How-to-set-up-an-authenticator-app-for-two-factor-authentication#:~:text=When%20you%20set%20up%20an,then%20saved%20to%20your%20phone."
          class="note_link"
          >Click here to get started</a
        >
      </div>
      <Button @click="updateSettings">Update Settings</Button>
      <div class="section mt-24">
        <Input
          :placeholder="'Enter your password to delete your account'"
          :error="$v.deletePassword"
          :model.sync="deletePassword"
          class="mb-12"
        >
          <template #label>Current Password</template>
        </Input>
        <Button @click="deleteAccount">Delete Account</Button>
      </div>
    </div>
    <div class="section">
      <div class="title">Change Password</div>
      <Input
        :error="$v.oldPassword"
        :model.sync="oldPassword"
        :placeholder="'Enter your old password'"
        class="mb-12"
      >
        <template #label>Old Password</template>
      </Input>
      <Input
        :error="$v.newPassword"
        :model.sync="newPassword"
        :placeholder="'Enter a new password'"
        class="mb-24"
      >
        <template #label>New Password</template>
      </Input>
      <Button @click="changePassword">Change Pasword</Button>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "SettingsPage",
  async asyncData({ $auth }) {
    await $auth.fetchUser();
    const user = $auth.user;
    const email = user.email;
    const dob = user.dob;
    const twoFA = user.totp_enabled;
    // const gender = user.gender;
    return { email, dob, twoFA };
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      deletePassword: "",
      existingEmails: [],
      submitted: false,
      credsExist: true,
      invalidOldPassword: true,
      invalidDeletePassword: true,
    };
  },
  mounted() {
    if (this.$route.query.authenticate === "success") {
      this.$store.commit("setSnackbar", {
        show: true,
        type: "success",
        text: "Successfully authenticated",
      });
    }
  },
  watch: {
    email(val) {
      if (this.submitted) {
        if (this.existingEmails.includes(val)) {
          return (this.credsExist = false);
        }
        this.credsExist = true;
      }
    },
    deletePassword(val) {
      this.invalidDeletePassword = true;
    },
    oldPassword(val) {
      this.invalidOldPassword = true;
    },
  },
  validations() {
    const credsExist = () => this.credsExist === true;
    const invalidOldPassword = () => this.invalidOldPassword === true;
    const invalidDeletePassword = () => this.invalidDeletePassword === true;
    return {
      email: { email, credsExist },
      oldPassword: { required, invalidOldPassword },
      newPassword: { required },
      deletePassword: { invalidDeletePassword, required },
    };
  },
  methods: {
    async deleteAccount() {
      this.$v.deletePassword.$touch();
      if (this.$v.deletePassword.$error) return;
      try {
        await this.$store.dispatch("user/delete", {
          password: this.deletePassword,
        });
        await this.$auth.logout();
        await this.$router.push("/auth/login/");
      } catch (e) {
        this.invalidDeletePassword = false;
      }
    },
    async updateSettings() {
      this.$v.email.$touch();
      if (this.$v.email.$error) return;
      try {
        const payload = {
          dob: this.dob,
          email: this.email,
          totp_enabled: this.twoFA,
        };
        await this.$store.dispatch("user/updateSettings", payload);
        this.$store.commit("setSnackbar", {
          show: true,
          type: "success",
          text: "Successfully updated your settings",
        });
      } catch (e) {
        if (e?.response?.data?.detail?.includes("email")) {
          this.existingEmails.push(this.email);
        }
        this.submitted = true;
        this.credsExist = false;
      }
    },
    async changePassword() {
      this.$v.oldPassword.$touch();
      this.$v.newPassword.$touch();
      if (this.$v.oldPassword.$error || this.$v.newPassword.$error) return;
      try {
        const payload = {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        };
        await this.$store.dispatch("user/changePassword", payload);
        this.$store.commit("setSnackbar", {
          show: true,
          text: "Successfully updated your password",
          type: "success",
        });
        await this.$v.reset();
        this.oldPassword = "";
        this.newPassword = "";
        console.log("success");
      } catch (e) {
        if (e?.response?.data?.detail?.includes("old password")) {
          this.invalidOldPassword = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/settings";
@import "~/assets/scss/pages/auth";
</style>