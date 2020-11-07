<template>
  <div :dir="$dir()" class="flex flex-col h-screen">
    <HeaderSection
      ref="header"
      v-resize
      :style="{ marginTop: `${headerMarginTop}px` }"
      class="flex items-center relative justify-between transition-all duration-500 ease-in-out transform"
      @init-size="onHeaderResize"
      @resize="onHeaderResize"
    />

    <NavBar
      :class="{ 'shadow-xl': didScrolled }"
      class="flex justify-center py-3 sm:py-5 px-4 transition-shadow ease duration-700"
    >
      <FavoritesNavigationIcon
        slot="favorites"
        :class="{ 'opacity-0 invisible': !didScrolled }"
        class="absolute end-0 transform transition-opacity delay-300 duration-1000 ease-in-out"
      />
    </NavBar>

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
import FavoritesNavigationIcon from '@/components/FavoritesNavigationIcon.vue';
import { createSEOMeta } from '@/utils/seo.js';
import { initFavorites } from '@/composables/useFavorites';

export default defineComponent({
  components: { NavBar, Footer, HeaderSection, FavoritesNavigationIcon },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const metaTitle = root.$t('general.site_title');
    const metaDescription = root.$t('general.site_description');
    const initHeaderHeight = ref(0);
    const didScrolled = ref(false);

    useMeta({
      title: metaTitle,
      titleTemplate: ` %s | ${metaTitle}`,
      meta: createSEOMeta({ title: metaTitle, description: metaDescription.value, image: '/logo.png', url: '' })
    });

    initFavorites(); // init favorites if it still not initialized from products page

    const headerMarginTop = computed(() => (didScrolled.value ? -initHeaderHeight.value : 0));

    const onScroll = (scrollTop: number) => {
      if (!didScrolled.value && scrollTop > 0) {
        didScrolled.value = true;
      } else if (didScrolled.value && scrollTop === 0) {
        didScrolled.value = false;
      }
    };

    const onHeaderResize = (height: number) => {
      initHeaderHeight.value = height;
    };

    return { didScrolled, initHeaderHeight, headerMarginTop, onScroll, onHeaderResize };
  }
});
</script>

<style></style>
