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
      <article v-for="(navObj, idx) in navData" :key="navObj.link" class="flex-column text-white">
        <header class="flex">
          <span
            class="flex hover:border-s-4 hover:ps-5 text-3xl ease transition-all duration-300"
            @click="isOpen = false"
          >
            <nuxt-link :to="localePath(navObj.link)">
              {{ $t(navObj.label) }}
            </nuxt-link>
          </span>
          <button
            type="button"
            class="px-2 hover:text-gray-500 focus:outline-none focus:text-gray-500 lg:hidden z-20"
            @click="expandSubcategories(idx)"
          >
            <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z"
              />
            </svg>
          </button>
        </header>
        <ul
          class="h-0 overflow-hidden ease transition-all duration-300"
          :class="{ [`h-${4 * 2 * navObj.subCategories.length}`]: expandedCategoryIdx === idx }"
        >
          <li
            v-for="sub in navObj.subCategories"
            :key="`${navObj.link}_${sub}`"
            class="cursor-pointer max-w-content my-1"
            @click="
              isOpen = false;
              expandSubcategories(idx);
            "
          >
            <nuxt-link :to="localePath(`${navObj.link}?f=${sub}`)">
              {{ $t(`navbar.${sub}`) }}
            </nuxt-link>
          </li>
        </ul>
      </article>
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
    const show = ref(false);
    const expandedCategoryIdx = ref<number>(null);

    const navData: Array<NavData> = [
      { link: '/wedding', label: 'navbar.wedding', subCategories: ['digital', 'physical'] },
      { link: '/batMitzvah', label: 'navbar.bat_mitzvah', subCategories: ['digital', 'physical'] },
      { link: '/barMitzvah', label: 'navbar.bar_mitzvah', subCategories: ['digital', 'physical'] },
      { link: '/giftcard', label: 'navbar.giftcard', subCategories: ['digital', 'physical'] }
    ];

    function toggleMenu(): void {
      isOpen.value = !isOpen.value;
    }

    function expandSubcategories(navItemIdx: number): void {
      expandedCategoryIdx.value = expandedCategoryIdx.value === navItemIdx ? null : navItemIdx;
    }
    //
    // function closeMenu() {
    //   this.isOpen.value = false;
    //   this.isOpen.value = false;
    // }

    return { navData, toggleMenu, isOpen, show, expandSubcategories, expandedCategoryIdx };
  }
});
</script>

<style scoped></style>
