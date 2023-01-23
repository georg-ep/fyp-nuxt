export const actions = {
  async createMood(context, payload) {
    return await this.$axios.$post("/logs/mood/create/", payload);
  },
  async listMood(context, query) {
    const params = new URLSearchParams(query).toString();
    return await this.$axios.$get(`/logs/mood/list/?${params}`);
  },
};
