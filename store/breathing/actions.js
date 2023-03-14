export const actions = {
  async list(context) {
    return await this.$axios.$get(`/logs/breathing_exercises/all/`);
  },
  async specific(context, { id }) {
    return await this.$axios.$get(`/logs/breathing_exercises/${id}/`);
  },
  async submit(context, payload) {
    return await this.$axios.$post(`/logs/breathing_cycle/create/`, payload);
  },
  async listCycles(context, query) {
    const params = new URLSearchParams(query).toString();
    return await this.$axios.$get(`/logs/breathing_cycle/list/?${params}`);
  },
};
