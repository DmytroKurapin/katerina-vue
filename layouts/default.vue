<template>
  <div :dir="$dir()" class="lg:container px-4">
    <NavBar />

    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import NavBar from '@/components/NavBar.vue';
import { createSEOMeta } from '@/utils/seo.js';

export default defineComponent({
  components: {
    NavBar
  },
  head() {
    const { title, description } = this;
    return {
      titleTemplate: `%s | ${title}`,
      meta: createSEOMeta({ title, description, image: '/logo.png', url: '' })
    };
  },
  setup(props, ctx) {
    const title = ref(ctx.root.$t('general.site_title'));
    const description = ref(ctx.root.$t('general.site_description'));

    return { title, description };
  }
});
</script>

<style></style>
