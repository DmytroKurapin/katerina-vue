<template>
  <svg
    :class="isLiked ? 'text-primary' : 'text-primary-light'"
    class="cursor-pointer fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    @click="$emit('click')"
  >
    <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
