<!-- eslint-disable max-len -->

<template>
  <nav>
    <!-- hamburger menu icon for screens up to lg-->
    <NavMenuIcon class="px-2 focus:outline-none lg:hidden z-20" @toggle="toggleIsOpen(!isOpen)">
      <path
        v-if="isOpen"
        fill="#fff"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
      />
      <path
        v-else
        fill-rule="evenodd"
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </NavMenuIcon>

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
      class="flex flex-col justify-between top-0 right-0 w-full bg-primary-dark fixed h-full overflow-auto z-10 transform ease transition-all duration-300 ps-10 py-20"
      :class="{ 'translate-x-full': !isOpen }"
    >
      <section>
        <article v-for="(navObj, idx) in navData" :key="navObj.link" class="flex-column text-white">
          <header class="flex">
            <span
              class="flex hover:border-s-4 hover:ps-5 text-3xl ease transition-all duration-300"
              @click="toggleIsOpen(false)"
            >
              <nuxt-link :to="localePath(navObj.link)">
                {{ $t(navObj.label) }}
              </nuxt-link>
            </span>
            <button type="button" class="px-2 focus:outline-none lg:hidden z-20" @click="expandSubcategories(idx)">
              <svg
                class="h-6 w-6 fill-current transform ease duration-300"
                :class="expandedCategoryIdx === idx ? 'rotate-0' : closedSubcategoriesClass"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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
                toggleIsOpen(false);
                expandSubcategories(idx);
              "
            >
              <nuxt-link :to="localePath(`${navObj.link}?f=${sub}`)">
                {{ $t(`navbar.${sub}`) }}
              </nuxt-link>
            </li>
          </ul>
        </article>
      </section>
      <section class="w-1/2 border-t-2">
        <nuxt-link :to="localePath('/about')">
          <span
            class="flex hover:border-s-4 hover:ps-5 text-white text-3xl w-full ease transition-all duration-300"
            @click="toggleIsOpen(false)"
          >
            About
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/contacts')">
          <span
            class="flex hover:border-s-4 hover:ps-5 text-white text-3xl w-full ease transition-all duration-300"
            @click="toggleIsOpen(false)"
          >
            Contacts
          </span>
        </nuxt-link>
      </section>
    </aside>
  </nav>
</template>

<script lang="ts">
import NavMenuIcon from '@/components/NavMenuIcon.vue';
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import { NavData } from '@/types';

export default defineComponent({
  components: {
    NavMenuIcon
  },
  setup(props, ctx) {
    const isOpen = ref(false);
    const show = ref(false);
    const expandedCategoryIdx = ref<number | null>(null);

    const navData: Array<NavData> = [
      { link: '/wedding', label: 'navbar.wedding', subCategories: ['digital', 'physical'] },
      { link: '/batMitzvah', label: 'navbar.bat_mitzvah', subCategories: ['digital', 'physical'] },
      { link: '/barMitzvah', label: 'navbar.bar_mitzvah', subCategories: ['digital', 'physical'] },
      { link: '/giftcard', label: 'navbar.giftcard', subCategories: ['digital', 'physical'] }
    ];

    const closedSubcategoriesClass = computed(() => {
      const isRtl = ctx.root.$dir() === 'rtl';
      return isRtl ? 'rotate-90' : '-rotate-90';
    });

    function expandSubcategories(navItemIdx: number): void {
      expandedCategoryIdx.value = expandedCategoryIdx.value === navItemIdx ? null : navItemIdx;
    }

    function toggleIsOpen(flag: boolean) {
      isOpen.value = flag;
    }

    return { navData, isOpen, show, expandSubcategories, expandedCategoryIdx, closedSubcategoriesClass, toggleIsOpen };
  }
});
</script>

<style scoped></style>
