<template>
  <!--  Heart icon -->
  <nuxt-link :to="localePath('/favorites')" class="flex justify-center">
    <span class="relative cursor-pointer">
      <HeartIcon class="h-8 w-8" :is-liked="true" />

      <span class="absolute top-4/9 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-100">
        {{ favoriteProducts.length }}
      </span>
    </span>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import HeartIcon from '@/components/HeartIcon.vue';
import { Product } from '@/types';

export default defineComponent({
  components: { HeartIcon },
  setup() {
    const favoriteProducts: ComputedRef<Product[]> = require('@/composables/useFavorites').favoriteProducts$;

    return { favoriteProducts };
  }
});
</script>

<style scoped></style>
