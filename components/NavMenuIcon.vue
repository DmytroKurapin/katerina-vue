<template>
  <button type="button" @click="$emit('toggle')">
    <slot />
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
