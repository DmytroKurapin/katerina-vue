<template>
  <button type="button" @click="$emit('toggle')">
    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <slot></slot>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  // emits: ['toggle'],
  setup() {}
});
</script>

<style scoped></style>
