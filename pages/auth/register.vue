<template>
  <div class="section">
    <div class="title">Register</div>
    <Input
      :placeholder="'Email'"
      :model.sync="email"
      :error="$v.email"
      class="mb-12"
    />
    <Input
      :placeholder="'Date of Birth'"
      :type="'date'"
      :model.sync="dob"
      :error="$v.dob"
      class="mb-12"
    />
    <Input
      :placeholder="'Password'"
      :model.sync="password"
      :error="$v.password"
      :type="inputType"
      class="mb-12"
    >
      >
      <template slot="trailing-content"
        ><div class="tf-image-wrapper">
          <img
            class="tf-image pointer"
            @click="toggleInput"
            src="~/assets/icons/eye.svg"
            alt=""
          /></div></template
    ></Input>
    <Input
      :placeholder="'Repeat password'"
      :model.sync="repeat"
      :error="$v.repeat"
      :type="inputType"
      class="mb-12"
    >
      ><template slot="trailing-content"
        ><div class="tf-image-wrapper">
          <img
            class="tf-image pointer"
            @click="toggleInput"
            src="~/assets/icons/eye.svg"
            alt=""
          /></div></template
    ></Input>
    <div class="flex space-between mb-8 mt-24">
      Enable 2FA?
      <Checkbox :model.sync="twoFA" />
    </div>
    <div class="note">
      You will need access to a mobile device with an authenticator application
    </div>
    <a
      target="_blank"
      href="https://computing.which.co.uk/hc/en-gb/articles/360006153539-How-to-set-up-an-authenticator-app-for-two-factor-authentication#:~:text=When%20you%20set%20up%20an,then%20saved%20to%20your%20phone."
      class="note_link"
      >Click here to get started</a
    >
    <div
      class="flex align-center space-between mb-8 mt-24 privacy"
      :class="{ privacy_error: $v.privacy.$error }"
    >
      <div class="note_heading">
        I have read and agree to the <a class="note_link">Privacy Policy</a>
      </div>
      <Checkbox :error="$v.privacy.$error" :model.sync="privacy" />
    </div>
    <Button
      :background="loading ? 'var(--primary)' : 'transparent'"
      :height="'40px'"
      :width="'100%'"
      @click="register"
      class="mt-24"
      ><div v-if="!loading">Register</div>
      <Spinner v-else
    /></Button>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "RegisterPage",
  layout: "auth",
  data() {
    return {
      email: "",
      password: "",
      repeat: "",
      dob: "",
      privacy: false,
      existingEmails: [],
      submitted: false,
      inputType: "password",
      credsExist: true,
      invalidPassword: true,
      twoFA: false,
      loading: false,
    };
  },
  auth: false,
  validations() {
    const credsExist = () => this.credsExist === true;
    const passwordMatch = () => this.repeat === this.password;
    const privacy = () => this.privacy === true;
    const validPassword = () => this.invalidPassword === true;
    return {
      email: { required, credsExist, email },
      password: { required, passwordMatch, validPassword },
      repeat: { required, passwordMatch },
      dob: { required },
      privacy: { privacy },
    };
  },
  watch: {
    email(val) {
      if (this.submitted && this.existingEmails.includes(val)) {
        return (this.credsExist = false);
      }
      this.credsExist = true;
    },
    password(val) {
      this.invalidPassword = true;
    },
  },
  methods: {
    toggleInput() {
      if (this.inputType === "password") return (this.inputType = "text");
      this.inputType = "password";
    },
    async register() {
      this.$v.$touch();
      if (this.$v.$error) return;
      await this.$auth.logout();
      const payload = {
        email: this.email,
        password: this.password,
        confirm_password: this.repeat,
        dob: this.dob,
        totp_enabled: this.twoFA,
      };
      this.loading = true;
      try {
        await this.$store.dispatch("user/register", payload);
        await this.$auth.loginWith("local", { data: payload });
        await this.$auth.fetchUser();
        if (this.$auth.user.totp_enabled) {
          return this.$router.push("/auth/authenticate/");
        }
        this.$router.push("/settings/?authenticate=success");
      } catch (e) {
        console.log(e);
        if (e?.response?.data?.detail?.includes("email")) {
          this.existingEmails.push(this.email);
          this.credsExist = false;
        }
        if (e?.response?.data?.detail?.toLowerCase().includes("password")) {
          this.invalidPassword = false;
        }
        this.submitted = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/auth";
</style>