<!-- eslint-disable max-len -->

<template>
  <header class="flex justify-between px-6 sm:px-2 py-3 sm:py-5">
    <NavMenu class="flex lg:px-4 lg:flex-1 lg:items-center justify-between" />

    <!-- Logo -->
    <nuxt-link :to="localePath('/')">
      <img src="/logo.jpg" alt="Katerina Kurapin" class="h-8 w-auto" />
    </nuxt-link>
    <!--  Heart icon -->
    <div class="relative inline-flex">
      <svg
        class="h-8 w-8 cursor-pointer fill-current text-primary"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
      </svg>
      <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 likes-counter text-gray-100">
        {{ favoriteCounter }}
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import NavMenu from '@/components/NavMenu.vue';
// import { getFavoriteProducts } from '@/composables/useFavorites';

export default defineComponent({
  components: {
    NavMenu
  },
  setup() {
    const favoriteProducts = require('@/composables/useFavorites').getFavoriteProducts;

    const favoriteCounter = computed(() => favoriteProducts.value.length);

    return { favoriteCounter };
  }
});
</script>

<style scoped></style>
