<template>
  <div :dir="$dir()" class="flex flex-col h-screen">
    <HeaderSection :did-scrolled="didScrolled" />

    <main
      class="flex flex-wrap justify-center overflow-x-hidden"
      role="main"
      @scroll="onScroll($event.target.scrollTop)"
    >
      <nuxt class="min-h-100 w-full" />

      <Footer class="h-64 w-full mx-4 mt-4 py-8 border-t" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import Footer from '@/components/Footer.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { createSEOMeta } from '@/utils/seo.js';
import { initFavorites } from '@/composables/useFavorites';

export default defineComponent({
  components: { Footer, HeaderSection },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const metaTitle = root.$t('general.site_title');
    const metaDescription = root.$t('general.site_description');
    const didScrolled = ref(false);

    useMeta({
      title: metaTitle,
      titleTemplate: ` %s | ${metaTitle}`,
      meta: createSEOMeta({ title: metaTitle, description: metaDescription.value, image: '/logo.png', url: '' })
    });

    initFavorites(); // init favorites if it still not initialized from products page

    const onScroll = (scrollTop: number) => {
      if (!didScrolled.value && scrollTop > 0) {
        didScrolled.value = true;
      } else if (didScrolled.value && scrollTop === 0) {
        didScrolled.value = false;
      }
    };

    return { didScrolled, onScroll };
  }
});
</script>

<style scoped>
/* Firefox */
main {
  scrollbar-width: thin;
  scrollbar-color: #ad726f #ad726f5e; /* scroll thumb (primary color) & track (primary-light) */
}

/* Chrome/Safari/Edge */
main::-webkit-scrollbar {
  @apply w-1;
}
main::-webkit-scrollbar-track {
  @apply bg-primary-light; /* color of the tracking area */
}
main::-webkit-scrollbar-thumb {
  @apply bg-primary; /* color of the scroll thumb */
}
</style>
