export const actions = {
  async login(context, payload) {
    return await this.$axios.$post(`/users/auth/`, payload);
  },
  async register(context, payload) {
    axios.defaults.headers.common['Authorization']
    return await this.$axios.$post(`/users/register/`, payload, { headers });
  },
  async changePassword(context, payload) {
    return await this.$axios.$post(`/users/password/change/`, payload);
  },
  async updateSettings(context, payload) {
    return await this.$axios.$patch(`/users/update/`, payload);
  },
};
