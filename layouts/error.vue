<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <NuxtLink to="/">
      Go to Home page
    </NuxtLink>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  props: ['error'],
  // layout: 'blog' // you can set a custom layout for the error page
  setup() {
    const posts = ref(null);

    return { posts };
  }
});
</script>
