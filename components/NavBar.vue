<!-- eslint-disable max-len -->

<template>
  <header class="flex justify-between px-6 sm:px-2 py-3 sm:justify-center sm:py-5">
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

    <!-- Logo -->
    <nuxt-link :to="localePath('/')">
      <img src="/logo.jpg" alt="Katerina Kurapin" class="h-8 w-auto" />
    </nuxt-link>

    <!-- hamburger menu icon for mobile-->
    <button
      type="button"
      class="px-2 hover:text-gray-500 focus:outline-none focus:text-gray-500 sm:hidden"
      @click="toggleMenu"
    >
      <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          v-if="isMenuOpened"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
        />
        <path
          v-if="!isMenuOpened"
          fill-rule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        />
      </svg>
    </button>

    <!-- Navigation menu -->
    <nav
      class="sm:flex sm:px-4 sm:flex-1 sm:items-center justify-between"
      :class="{ hidden: !isMenuOpened, block: isMenuOpened }"
    >
      <!--      <LanguageSwitcher />-->

      <ul class="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0 sm:px-0">
        <nuxt-link v-for="navObj in navData" :key="navObj.link" :to="localePath(navObj.link)">
          <li
            class="block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800 sm:text-sm sm:px-2 sm:text-gray-900 sm:hover:bg-gray-200"
          >
            {{ $t(navObj.label) }}
          </li>
        </nuxt-link>
      </ul>

      <div class="relative px-5 py-5 sm:py-0 sm:ms-4 sm:px-0">
        <div class="mt-5 sm:hidden">
          <a href="#account" class="block text-gray-400 hover:text-white">About</a>
          <a href="#support" class="mt-3 block text-gray-400 hover:text-white">FAQ</a>
          <a href="#sign-out" class="mt-3 block text-gray-400 hover:text-white">Contacts</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { NavData } from '@/types';
// import { getFavoriteProducts } from '@/composables/useFavorites';

export default defineComponent({
  setup() {
    const test = require('@/composables/useFavorites').getFavoriteProducts;

    const navData: Array<NavData> = [
      { link: '/wedding', label: 'navbar.wedding' },
      { link: '/mitzvah', label: 'navbar.mitzvah' },
      { link: '/giftcard', label: 'navbar.giftcard' }
    ];
    const isMenuOpened = ref(false);
    const favoriteCounter = computed(() => test.value.length);

    function toggleMenu() {
      isMenuOpened.value = !isMenuOpened.value;
    }

    return { isMenuOpened, navData, toggleMenu, favoriteCounter };
  }
});
</script>

<style scoped></style>
