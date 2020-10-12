<template>
  <div>
    <NavMenuIcon :class="isOpen ? 'fixed' : null" class="focus:outline-none z-20" @toggle="toggleIsOpen(!isOpen)">
      <path
        v-if="isOpen"
        fill-rule="evenodd"
        clip-rule="evenodd"
        :d="
          `M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1
           1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z`
        "
      />
      <path
        v-else
        fill-rule="evenodd"
        :d="
          `M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1
           0-2z`
        "
      />
    </NavMenuIcon>

    <aside
      :class="[
        `fixed z-10 flex flex-col justify-between top-0 start-0 bg-white bg-opacity-80 h-full overflow-auto
         transform ease-in-out transition-all duration-300`,
        isOpen ? 'opacity-100 ps-10 pb-20 pt-40 w-full' : 'opacity-0 w-0'
      ]"
    >
      <LanguageSwitcher class="inline-flex absolute end-0 -my-32 me-2" />

      <section>
        <article v-for="(navObj, idx) in navData" :key="navObj.link" class="flex-column text-gray-800">
          <header class="flex">
            <span
              class="flex hover:border-s-4 border-gray-800 hover:ps-5 text-3xl ease transition-all duration-300"
              @click="toggleIsOpen(false)"
            >
              <nuxt-link :to="localePath(navObj.link)">
                {{ $t(navObj.label) }}
              </nuxt-link>
            </span>
            <button
              v-if="navObj.subCategories.length > 0"
              type="button"
              class="px-2 focus:outline-none lg:hidden z-20"
              @click="expandSubcategories(idx)"
            >
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
            v-if="navObj.subCategories.length > 0"
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
              <nuxt-link :to="localePath(`${navObj.link}?s=${sub}`)">
                {{ $t(`navbar.${sub}`) }}
              </nuxt-link>
            </li>
          </ul>
        </article>
      </section>
      <section class="w-1/2 border-t-2 border-gray-800">
        <nuxt-link :to="localePath('/info/about')">
          <span
            :class="
              `flex hover:border-s-4 border-gray-800 hover:ps-5 text-gray-800 text-3xl w-full
               ease transition-all duration-300`
            "
            @click="toggleIsOpen(false)"
          >
            {{ $t('footer.about') }}
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/info/contacts')">
          <span
            :class="
              `flex hover:border-s-4 border-gray-800 hover:ps-5 text-gray-800 text-3xl w-full
               ease transition-all duration-300`
            "
            @click="toggleIsOpen(false)"
          >
            {{ $t('footer.contacts') }}
          </span>
        </nuxt-link>
      </section>
    </aside>
  </div>
</template>

<script lang="ts">
import NavMenuIcon from '@/components/NavMenuIcon.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import navDataList from '@/constatnts/navData';

export default defineComponent({
  components: { NavMenuIcon, LanguageSwitcher },
  setup(props, ctx) {
    const navData = navDataList;
    const isOpen = ref(false);
    const show = ref(false);
    const expandedCategoryIdx = ref<number | null>(null);

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
