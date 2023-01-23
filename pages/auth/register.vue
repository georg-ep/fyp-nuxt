<template>
  <div>
    <div class="title">Register</div>
    <Input
      :text-colour="'black'"
      :placeholder="'Username'"
      :model.sync="username"
      :error="$v.username"
      class="mb-12"
      ><template slot="label"
        ><div class="tf-label">Username</div></template
      ></Input
    >
    <Input
      :text-colour="'black'"
      :placeholder="'Date of Birth'"
      :type="'date'"
      :model.sync="dob"
      :error="$v.dob"
      class="mb-12"
      ><template slot="label"
        ><div class="tf-label">Date of Birth</div></template
      ></Input
    >
    <div class="tf-label">Gender</div>
    <div class="mb-12">
      <div class="flex space-between">
        <Button
          :width="'32%'"
          :background="gender === 'male' ? 'black' : 'transparent'"
          :text-colour="gender === 'male' ? 'white' : 'black'"
          :border="gender === 'male' ? 'none' : '1px solid black'"
          :font-size="'15px'"
          :height="'45px'"
          :border-radius="'2px'"
          @click="gender = 'male'"
          ><template slot="content"><div>Male</div> </template></Button
        >
        <Button
          :width="'32%'"
          :height="'45px'"
          :background="gender === 'female' ? 'black' : 'transparent'"
          :text-colour="gender === 'female' ? 'white' : 'black'"
          :border="gender === 'female' ? 'none' : '1px solid black'"
          @click="gender = 'female'"
          :font-size="'15px'"
          :border-radius="'2px'"
          ><template slot="content"><div>Female</div> </template></Button
        >
        <Button
          :width="'32%'"
          :height="'45px'"
          :background="gender === 'other' ? 'black' : 'transparent'"
          :text-colour="gender === 'other' ? 'white' : 'black'"
          :border="gender === 'other' ? 'none' : '1px solid black'"
          @click="gender = 'other'"
          :font-size="'15px'"
          :border-radius="'2px'"
          ><template slot="content"
            ><div>Prefer not to say</div>
          </template></Button
        >
      </div>
      <div
        class="gender_error"
        :class="{ gender_error_visible: !genderSubmitted }"
      >
        This field is required
      </div>
    </div>
    <Input
      :text-colour="'black'"
      :placeholder="'Password'"
      :model.sync="password"
      :error="$v.password"
      :type="inputType"
      class="mb-12"
    >
      ><template slot="label"><div class="tf-label">Password</div></template>
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
      :text-colour="'black'"
      :placeholder="'Repeat password'"
      :model.sync="repeat"
      :error="$v.repeat"
      :type="inputType"
      class="mb-12"
    >
      ><template slot="label"><div class="tf-label">Repeat Password</div></template
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
      :background="loading ? 'white' : 'black'"
      :text-colour="'white'"
      :border-radius="'4px'"
      :height="'40px'"
      :width="'100%'"
      @click="register"
      ><template slot="content"
        ><div v-if="!loading">Register</div>
        <Spinner v-else /></template
    ></Button>
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
      console.log(this.$v.$error, this.genderSubmitted);
      console.log(this.$v);
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