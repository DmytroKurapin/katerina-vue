<template>
  <div>
    Main Page
  </div>
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

<style></style>
