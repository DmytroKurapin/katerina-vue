<template>
  <div :dir="$dir()" class="flex flex-col xl:container h-screen">
    <NavBar
      :class="{ 'shadow-xl': didScrolled }"
      class="flex justify-between py-3 sm:py-5 px-4 transition-shadow ease duration-700"
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
import { defineComponent, reactive, ref, useMeta } from '@nuxtjs/composition-api';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { createSEOMeta } from '@/utils/seo.js';
import { initFavorites } from '@/composables/useFavorites';

export default defineComponent({
  components: { NavBar, Footer },
  head() {},
  setup(props, ctx) {
    const metaTitle = reactive(ctx.root.$t('general.site_title'));
    const metaDescription = ref(ctx.root.$t('general.site_description'));
    const didScrolled = ref(false);

    useMeta({
      title: metaTitle,
      titleTemplate: ` %s | ${metaTitle}`,
      meta: createSEOMeta({ title: metaTitle, description: metaDescription.value, image: '/logo.png', url: '' })
    });

    initFavorites(); // init favorites if it still not initialized from products page

    const onScroll = (scrollTop: number) => {
      if (scrollTop && !didScrolled.value) {
        didScrolled.value = true;
      } else if (!scrollTop && didScrolled.value) {
        didScrolled.value = false;
      }
    };

    return { onScroll, didScrolled };
  }
});
</script>

<style></style>
