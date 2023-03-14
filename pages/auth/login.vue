<template>
  <div class="section">
    <div class="title">Login</div>
    <Input
      :placeholder="'Username'"
      :model.sync="username"
      :error="$v.username"
      class="mb-12"
    />
    <Input
      :placeholder="'Password'"
      :model.sync="password"
      :error="$v.password"
      class="mb-12"
    />
    <Button :height="'40px'" :width="'100%'" @click="login"
      ><div v-if="!loading">Login</div>
      <Spinner v-else
    /></Button>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "LoginPage",
  layout: "auth",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      passwords: [],
      usernames: [],
    };
  },
  validations() {
    var invalidLogin = () =>
      !this.usernames.includes(this.username) ||
      !this.passwords.includes(this.password);
    return {
      password: { required, invalidLogin },
      username: {
        required,
        invalidLogin,
      },
    };
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$error) return;
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.loading = true;
      try {
        await this.$store.dispatch("user/login", payload);
        await this.$auth.loginWith("local", { data: payload });
        this.$router.push("/dashboard/");
      } catch (e) {
        if (e?.response?.data?.detail.includes("No active account")) {
          this.usernames.push(this.username);
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