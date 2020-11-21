<template>
  <div :dir="$dir()" class="flex flex-col h-screen">
    <InformationalBlock />

    <HeaderSection :did-scrolled="didScrolled" />

    <main
      ref="mainSection"
      class="flex flex-wrap justify-center overflow-x-hidden"
      role="main"
      @scroll="onScroll($event.target.scrollTop)"
    >
      <section class="relative min-h-100 w-full px-6 sm:px-5">
        <!-- MAIN CONTENT -->
        <nuxt />

        <transition name="fade">
          <ButtonScrollTop v-show="didScrolled" @click="scrollToTop" />
        </transition>
      </section>

      <Footer class="w-full px-4 mt-4 py-8 border-t bg-primary-light" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta, watch } from '@nuxtjs/composition-api';
import Footer from '@/components/Footer.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import ButtonScrollTop from '@/components/ButtonScrollTop.vue';
import InformationalBlock from '@/components/InformationalBlock.vue';
import { createSEOMeta } from '@/utils/seo.js';
import { initFavorites } from '@/composables/useFavorites';
import { didScrolled, goTopPosition, mainSection, scrollToTop, toggleDidScrolled } from '@/composables/usePageScroll';

export default defineComponent({
  components: { InformationalBlock, Footer, HeaderSection, ButtonScrollTop },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const metaTitle = root.$t('general.site_title');
    const metaDescription = root.$t('general.site_description');

    useMeta({
      title: metaTitle,
      titleTemplate: ` %s | ${metaTitle}`,
      meta: createSEOMeta({ title: metaTitle, description: metaDescription.value, image: '/logo.png', url: '' })
    });

    initFavorites(); // init favorites if it still not initialized from products page

    const onScroll = (scrollTop: number) => {
      if (!didScrolled.value && scrollTop > 0) {
        toggleDidScrolled(true);
      } else if (didScrolled.value && scrollTop === 0) {
        toggleDidScrolled(false);
      }
    };

    // watcher on change url or query params
    watch(
      () => root.$route.fullPath,
      () => goTopPosition()
    );

    return { didScrolled, mainSection, onScroll, scrollToTop };
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
