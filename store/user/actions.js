export const actions = {
  async login(context, payload) {
    return await this.$axios.$post(`/users/auth/`, payload);
  },
  async register(context, payload) {
    // axios.defaults.headers.common['Authorization']
    return await this.$axios.$post(`/users/register/`, payload);
  },
  async changePassword(context, payload) {
    return await this.$axios.$post(`/users/password/change/`, payload);
  },
  async updateSettings(context, payload) {
    return await this.$axios.$patch(`/users/update/`, payload);
  },
  async secret(context) {
    return await this.$axios.$get(`/users/totp-secret/`);
  },
  async verifyTotp(context, token) {
    return await this.$axios.$post(`/users/verify-totp-token/`, { token });
  },
  async delete(context, { password }) {
    return await this.$axios.$post(`/users/delete/`, { password: password });
  },
};
