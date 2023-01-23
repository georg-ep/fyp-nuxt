<template>
  <div>
    <div class="tf-label mb-12 no-border">Gender</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "GenderBlock",
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      gender: "",
    };
  },
  mounted() {
    this.gender = this.model;
  },
  watch: {
    gender(val) {
      this.$emit("update:model", val);
    }
  },
};
</script>

<style>
</style>