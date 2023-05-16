<template>
  <div class="flex justify-center col align-center">
    <div class="spinner-wrapper mb-24" v-if="!uri">
      <Spinner />
    </div>
    <qrcode-vue v-else class="mb-24" :value="uri" :size="size" level="H" />
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: {
    uri: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      size: 300,
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style scoped>
.spinner-wrapper {
  height: 304.5px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
