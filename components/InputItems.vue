<template>
  <div class="items" :class="{items_visible: enabled}">
    <div
      @click="$emit('item-click', item)"
      v-for="(item, index) in items"
      :key="`item_${index}`"
      class="item pointer"
      :class="{ item_visible: showItem(item) }"
    >
      <div class="flex">
        <img v-if="item.path" class="item_img" :src="imgSrc(item)" alt="" />
        <div>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItems",
  props: {
    model: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imgSrc() {
      // assets/icons/socials/facebook.svg
      return (item) => item.path ? require(`~/assets/icons/${item.path}`) : null;
    },
    showItem() {
      return (item) =>
        this.enabled &&
        item?.name.toLowerCase().includes(this.model.toLowerCase());
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/input";
</style>