<template>
  <div :dir="$dir()" class="container sm:px-4">
    <NavBar />

    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  // props: ['error'],
  // layout: 'blog' // you can set a custom layout for the error page
  components: {
    NavBar
  },
  setup() {
    const posts = ref(null);

    return { posts };
  }
});
</script>

<style></style>
