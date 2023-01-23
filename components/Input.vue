<template>
  <div class="dropdown-wrapper">
    <slot name="label" />
    <div class="input-wrapper" :style="wrapperStyles">
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
      />
      <slot name="trailing-content" />
    </div>
    <InputItems
      @item-click="$emit('item-click', $event)"
      :items="items"
      :model="model"
      :enabled="focus && Boolean(items.length) && Boolean(this.model.length)"
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
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    textColour: {
      type: String,
      default: "white",
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
      default: "none",
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
    activeErr() {
      return (err) => !this.error[err] && this.error.$error;
    },
    getText() {
      return (err) => {
        const length = this.error.$params?.minLength?.min;
        const msgs = {
          required: "This field is required",
          invalidLogin: "No active account found with credentials",
          credsExist: "A user with these credentials already exists",
          passwordMatch: "These passwords do not match",
          minLength: `This field must be at least ${length} characters long`,
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
        // "border-radius": "2px",
        border: this.hasError ? "1px solid var(--tf-error)" : this.border,
      };
      return styles;
    },
    styles() {
      const activeDropdown = this.model && this.items.length;
      const styles = {
        // "border-radius": activeDropdown ? "4px 4px 0 0" : "4px",
        background: this.background,
        color: this.textColour,
        resize: "none",
      };
      if (this.textarea) {
        styles["padding-top"] = "6px";
      }
      return styles;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/input";
</style>