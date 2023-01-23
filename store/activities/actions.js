export const actions = {
  async add(context, payload) {
    return await this.$axios.$post("/logs/activity/add/", payload);
  },
  async create(context, payload) {
    return await this.$axios.$post("/logs/activity/create/", payload);
  }
};
