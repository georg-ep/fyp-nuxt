<template>
  <div>
    <Input class="mb-24" :model.sync="token" :error="$v.token"
      ><template #label>Enter your one-time password</template></Input
    >
    <Button :width="'100%'" @click="verifyToken">Verify</Button>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      token: "",
      error: "",
      invalidTokens: [],
    };
  },
  validations() {
    var invalidToken = () => !this.invalidTokens.includes(this.token);
    return {
      token: {
        invalidToken,
        required,
        minLength: minLength(6),
        maxLength: maxLength(6),
      },
    };
  },
  methods: {
    async verifyToken() {
      this.$v.$touch();
      if (this.$v.$error) return;
      try {
        await this.$store.dispatch("user/verifyTotp", this.token);
        await this.$router.push("/settings/?authenticate=success");
      } catch (error) {
        this.error = "Error verifying token";
        this.invalidTokens.push(this.token);
      }
    },
  },
};
</script>

