<template>
  <div :dir="$dir()" class="flex flex-col h-screen">
    <HeaderSection
      ref="header"
      v-resize
      :style="headerMarginTop"
      class="flex items-center relative justify-between transition-all duration-500 ease-in-out transform"
      @init-size="onHeaderResize"
      @resize="onHeaderResize"
    />

    <NavBar
      :class="{ 'shadow-xl': scrolledTop > 0 }"
      class="flex justify-center py-3 sm:py-5 px-4 transition-shadow ease duration-700"
    />

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
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import Footer from '@/components/Footer.vue';
import NavBar from '@/components/NavBar.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { createSEOMeta } from '@/utils/seo.js';
import { initFavorites } from '@/composables/useFavorites';

export default defineComponent({
  components: { NavBar, Footer, HeaderSection },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const scrolledTop = ref(0);
    const metaTitle = root.$t('general.site_title');
    const metaDescription = root.$t('general.site_description');
    const initHeaderHeight = ref(0);

    useMeta({
      title: metaTitle,
      titleTemplate: ` %s | ${metaTitle}`,
      meta: createSEOMeta({ title: metaTitle, description: metaDescription.value, image: '/logo.png', url: '' })
    });

    initFavorites(); // init favorites if it still not initialized from products page

    const onScroll = (scrollTop: number) => {
      scrolledTop.value = scrollTop;
    };

    const headerMarginTop = computed(() => {
      const marginTop = Math.min(initHeaderHeight.value, scrolledTop.value);
      return { marginTop: `-${marginTop}px` };
    });

    const onHeaderResize = (height: number) => {
      initHeaderHeight.value = height;
    };

    return { scrolledTop, initHeaderHeight, headerMarginTop, onScroll, onHeaderResize };
  }
});
</script>

<style></style>
