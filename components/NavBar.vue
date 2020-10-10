<template>
  <header class="flex justify-between py-3 sm:py-5">
    <NavMenu class="flex items-center" />

    <!-- Logo -->
    <div class="inline-flex items-center justify-end flex-1 px-4">
      <nuxt-link :to="localePath('/')" class="inline-flex">
        <img src="/logo.jpg" alt="Katerina Kurapin" class="h-8 lg:h-12 w-auto" />
      </nuxt-link>
    </div>

    <div class="inline-flex flex-col">
      <LanguageSwitcher class="hidden lg:inline-flex my-1" />

      <!--  Heart icon -->
      <span class="flex justify-center">
        <span class="relative cursor-pointer">
          <svg class="h-8 w-8 fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
          </svg>
          <span
            class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 likes-counter text-gray-100"
          >
            {{ favoriteProducts.length }}
          </span>
        </span>
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import NavMenu from '@/components/NavMenuWrapper.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Product } from '@/types';

export default defineComponent({
  components: { NavMenu, LanguageSwitcher },
  setup() {
    const favoriteProducts: ComputedRef<Product[]> = require('@/composables/useFavorites').getFavoriteProducts;

    return { favoriteProducts };
  }
});
</script>

<style scoped></style>
