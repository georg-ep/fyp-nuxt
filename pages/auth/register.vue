<template>
  <div class="section">
    <div class="title">Register</div>
    <Input
      :placeholder="'Username'"
      :model.sync="username"
      :error="$v.username"
      class="mb-12"
    />
    <Input
      :placeholder="'Date of Birth'"
      :type="'date'"
      :model.sync="dob"
      :error="$v.dob"
      class="mb-12"
    />
    <div class="mb-12">
      <GenderBlock :model.sync="gender" class="mb-24" />
      <div
        class="gender_error"
        :class="{ gender_error_visible: !genderSubmitted }"
      >
        This field is required
      </div>
    </div>
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
    <Button
      :background="loading ? 'var(--primary)' : 'transparent'"
      :text-colour="'white'"
      :height="'40px'"
      :width="'100%'"
      @click="register"
      ><div v-if="!loading">Register</div>
      <Spinner v-else
    /></Button>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegisterPage",
  layout: "auth",
  data() {
    return {
      username: "",
      password: "",
      repeat: "",
      dob: "",
      gender: "",
      genderSubmitted: true,
      existingUsernames: [],
      submitted: false,
      inputType: "password",
      credsExist: true,
      loading: false,
    };
  },
  auth: false,
  validations() {
    const credsExist = () => this.credsExist === true;
    const passwordMatch = () => this.repeat === this.password;
    return {
      username: { required, credsExist, minLength: minLength(8) },
      password: { required, passwordMatch },
      repeat: { required, passwordMatch },
      dob: { required },
    };
  },
  watch: {
    gender(val) {
      if (!val) return (this.genderSubmitted = false);
      this.genderSubmitted = true;
    },
    username(val) {
      if (this.submitted) {
        if (this.existingUsernames.includes(val)) {
          return (this.credsExist = false);
        }
        this.credsExist = true;
      }
    },
  },
  methods: {
    toggleInput() {
      if (this.inputType === "password") return (this.inputType = "text");
      this.inputType = "password";
    },
    async register() {
      this.$v.$touch();
      if (!this.gender) this.genderSubmitted = false;
      if (this.$v.$error || !this.genderSubmitted) return;
      const payload = {
        username: this.username,
        password: this.password,
        dob: this.dob,
        gender: this.gender,
      };
      this.loading = true;
      try {
        await this.$store.dispatch("user/register", payload);
        await this.$auth.loginWith("local", { data: payload });
        this.$router.push("/dashboard/");
      } catch (e) {
        console.log(e);
        if (e?.response?.data?.detail.includes("username")) {
          this.existingUsernames.push(this.username);
        }
        this.submitted = true;
        this.credsExist = false;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/auth";
</style>