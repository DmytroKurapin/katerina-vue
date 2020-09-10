<!-- eslint-disable max-len -->

<template>
  <nav>
    <!-- hamburger menu icon for screens up to lg-->
    <button
      type="button"
      class="px-2 hover:text-gray-500 focus:outline-none focus:text-gray-500 lg:hidden z-20"
      @click="toggleMenu"
    >
      <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          v-if="isOpen"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
        />
        <path
          v-else
          fill-rule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        />
      </svg>
    </button>
    <!--      <LanguageSwitcher />-->

    <ul class="hidden px-2 pt-2 pb-5 lg:flex lg:border-b-0 lg:py-0 lg:px-0 border-b border-gray-800">
      <nuxt-link v-for="navObj in navData" :key="navObj.link" :to="localePath(navObj.link)">
        <li
          class="block px-3 py-1 rounded text-white hover:bg-gray-800 sm:text-sm sm:px-2 sm:text-gray-900 sm:hover:bg-gray-200"
        >
          {{ $t(navObj.label) }}
        </li>
      </nuxt-link>
    </ul>

    <aside
      class="flex flex-col justify-center top-0 right-0 w-full bg-primary-dark fixed h-full overflow-auto z-10 transform ease transition-all duration-300 ps-10"
      :class="{ 'translate-x-full': !isOpen }"
    >
      <nuxt-link v-for="navObj in navData" :key="navObj.link" :to="localePath(navObj.link)">
        <span
          class="flex hover:border-s-4 hover:ps-5 text-white text-3xl w-full ease transition-all duration-300"
          @click="isOpen = false"
        >
          {{ $t(navObj.label) }}
        </span>
      </nuxt-link>
      <span class="h-8 w-1/2 border-t-2"> </span>
      <nuxt-link :to="localePath('/about')">
        <span
          class="flex hover:border-s-4 hover:ps-5 text-white text-3xl w-full ease transition-all duration-300"
          @click="isOpen = false"
        >
          About
        </span>
      </nuxt-link>
      <nuxt-link :to="localePath('/contacts')">
        <span
          class="flex hover:border-s-4 hover:ps-5 text-white text-3xl w-full ease transition-all duration-300"
          @click="isOpen = false"
        >
          Contacts
        </span>
      </nuxt-link>
    </aside>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { NavData } from '@/types';

export default defineComponent({
  setup() {
    const isOpen = ref(false);

    const navData: Array<NavData> = [
      { link: '/wedding', label: 'navbar.wedding' },
      { link: '/batMitzvah', label: 'navbar.bat_mitzvah' },
      { link: '/barMitzvah', label: 'navbar.bar_mitzvah' },
      { link: '/giftcard', label: 'navbar.giftcard' }
    ];

    function toggleMenu() {
      isOpen.value = !isOpen.value;
    }

    return { navData, toggleMenu, isOpen };
  }
});
</script>

<style scoped></style>
