<template>
<div class="section">
  <div class="title">2-Factor Authentication</div>
  <div class="totp">
    <div class="step">
      1. Open your authenticator
    </div>
    <div class="step">
      2. Scan the QR code below
    </div>
    <QRcode :uri="uri" />
    <div class="step">
      3. Enter the code produced by the authenticator
    </div>
    <TOTPVerification />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      uri: null,
    };
  },
  async mounted() {
    this.uri = (await this.$store.dispatch("user/secret")).uri;
  },
  layout: "auth",
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/auth.scss";
</style>
