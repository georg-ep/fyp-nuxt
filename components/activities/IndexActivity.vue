<template>
  <div class="index-activity">
    <div class="title">What would you like to do?</div>
    <div class="options">
    <Button @click="$emit('select', 'create-custom')"><template slot="content">Create a Custom Activity</template></Button>
    <Button @click="$emit('select', 'add-custom')"><template slot="content">Add a Custom Activity</template></Button>
    <Button @click="$emit('select', 'add-simple')"><template slot="content">Add a Simple Activity</template></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexActivity",
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/activities.scss";
</style>