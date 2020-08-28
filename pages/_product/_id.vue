<template>
  <div>{{ $route.params }}</div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const posts = ref(null);

    return { posts };
  }
});
</script>

<style scoped></style>
