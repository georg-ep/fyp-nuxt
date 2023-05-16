<template>
  <div class="section">
    <div class="title">Login</div>
    <Input
      :placeholder="'Email'"
      :model.sync="email"
      :error="$v.email"
      class="mb-12"
    />
    <Input
      :placeholder="'Password'"
      :model.sync="password"
      :error="$v.password"
      class="mb-12"
    />
    <Button class="mb-12" :height="'40px'" :width="'100%'" @click="login"
      ><div v-if="!loading">Login</div>
      <Spinner v-else
    /></Button>
    <Button :height="'40px'" :width="'100%'" :border="'1px solid orange'" @click="$router.push('/auth/register/')"
      >Register for a new account</Button
    >
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "LoginPage",
  layout: "auth",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      passwords: [],
      emails: [],
    };
  },
  validations() {
    var invalidLogin = () =>
      !this.emails.includes(this.email) ||
      !this.passwords.includes(this.password);
    return {
      password: { required, invalidLogin },
      email: {
        required,
        invalidLogin,
        email,
      },
    };
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$error) return;
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      try {
        await this.$store.dispatch("user/login", payload);
        await this.$auth.loginWith("local", { data: payload });
        if (this.$auth.user.totp_enabled) {
          return this.$router.push("/auth/authenticate/");
        }
        this.$router.push("/settings/");
      } catch (e) {
        if (e?.response?.data?.detail.includes("No active account")) {
          this.emails.push(this.email);
          this.passwords.push(this.password);
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/auth";
</style>