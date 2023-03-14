<template>
  <div class="container">
    <div class="landing">
      <h1 class="mb-12">
        Enter a username to fetch posts from each social platform
      </h1>
      <div class="section-wrapper">
        <Input
          :model.sync="username"
          :height="'40px'"
          :placeholder="'Enter your twitter username'"
          ><template slot="trailing-content"
            ><div v-if="loading" class="spinner-wrapper">
              <Spinner /></div></template
          ><template slot="leading-content"
            ><div class="icon-wrapper">
              <img src="~/assets/icons/socials/twitter.svg" /></div></template
        ></Input>
        <Button class="mt-12 mb-24" @click="submit" :height="'30px'"
          >Submit</Button
        >
        <div class="post" v-for="post in posts" :key="post">
          {{ post.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      posts: null,
      loading: false,
    };
  },
  methods: {
    async submit() {
      if (!this.username) return;
      this.loading = true;
      const posts = await this.$store.dispatch("twitter/fetch", {
        username: this.username,
      });
      this.posts = posts.data;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/landing";
</style>
