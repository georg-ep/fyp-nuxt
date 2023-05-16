<template>
  <div class="dropdown-wrapper">
    <div v-if="$slots.label" class="tf-label" :class="{'tf-label_error': hasError}">
      <slot name="label" />
    </div>
    <div
      @click="$emit('click')"
      @focusout="$emit('hide')"
      tabindex="0"
      class="input-wrapper"
      :style="wrapperStyles"
    >
      <slot name="leading-content" />
      <input
        v-if="!textarea"
        :id="_uid"
        v-model="input"
        :style="styles"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
      />
      <textarea
        :id="id"
        v-model="input"
        :style="styles"
        :placeholder="placeholder"
        :rows="rows"
        v-else
      ></textarea>
      <slot name="trailing-content" />
    </div>
    <InputItems
      @item-click="$emit('item-click', $event)"
      :items="items"
      :model="model"
      :show-dropdown="showDropdown"
      :enabled="isEnabled"
    />
    <div class="errors">
      <div
        v-for="(err, i) in errorKeys"
        :key="`error_${i}`"
        class="errors_error"
        :class="{ errors_error_active: activeErr(err) }"
      >
        <div>
          {{ getText(err) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    model: {
      type: [String, Boolean],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    showDropdown: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "auto",
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    textColour: {
      type: String,
      default: "var(--text-primary)",
    },
    height: {
      type: String,
      default: "40px",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    border: {
      type: String,
      default: "1px solid var(--primary)",
    },
    background: {
      type: String,
      default: "white",
    },
    error: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      id: null,
      focus: false,
    };
  },
  mounted() {
    if (this.items.length) {
      const field = document.getElementById(this._uid);
      field.addEventListener("focusin", (e) => (this.focus = true));
      field.addEventListener("focusout", (e) =>
        setTimeout(() => (this.focus = false), 100)
      );
    }
  },
  computed: {
    isEnabled() {
      return (
        (this.showDropdown || this.focus) &&
        Boolean(this.items.length) &&
        Boolean(this.model.length)
      );
    },
    activeErr() {
      return (err) => !this.error[err] && this.error.$error;
    },
    getText() {
      return (err) => {
        const length = this.error.$params?.minLength?.min;
        const msgs = {
          required: "This field is required",
          invalidLogin: "No active account found with credentials",
          credsExist: "This email is registered to another account",
          invalidDeletePassword: "This password is not the same as your current password",
          invalidOldPassword: "This password is not the same as your current password",
          invalidToken: "This token is invalid",
          passwordMatch: "These passwords do not match",
          minLength: `This field must be at least ${length} characters long`,
          email: `This is not a valid email format`,
          maxLength: `This field must be at most ${length} characters long`,
          timeOverlap: `This field overlaps with an existing media log`,
          minTime: `The start time must be less than the finish time`,
        };
        return msgs[err];
      };
    },
    errorKeys() {
      return this.error && Object.keys(this.error.$params);
    },
    hasError() {
      return this.error && this.error.$error;
    },
    input: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
    wrapperStyles() {
      const styles = {
        height: this.height,
        width: this.width,
        border: this.hasError ? "1px solid var(--tf-error)" : this.border,
      };
      return styles;
    },
    styles() {
      const styles = {
        background: this.background,
        color: this.textColour,
        resize: "none",
      };
      if (this.textarea) styles["padding-top"] = "20px";
      return styles;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/input";
</style>