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
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import NavBar from '@/components/NavBar.vue';
import { createSEOMeta } from '@/utils/seo.js';

export default defineComponent({
  components: { NavBar },
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
    const didScrolled = ref(false);

    const onScroll = (scrollTop: number) => {
      if (scrollTop && !didScrolled.value) {
        didScrolled.value = true;
      } else if (!scrollTop && didScrolled.value) {
        didScrolled.value = false;
      }
    };

    return { title, description, onScroll, didScrolled };
  }
});
</script>

<style></style>
