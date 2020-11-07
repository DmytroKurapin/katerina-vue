<template>
  <ul class="px-2 pt-2 pb-5 lg:border-b-0 lg:py-0 lg:px-0 border-b border-gray-800">
    <li
      v-for="navObj in navData"
      :key="navObj.link"
      class="relative group block px-10 py-1 menu-item-hover text-gray-900"
    >
      <nuxt-link
        :to="localePath(navObj.link)"
        :class="{ 'pb-1 relative': true, 'active-category': currCategory === navObj.category }"
      >
        {{ $t(navObj.label) }}
      </nuxt-link>
      <div
        :class="
          `z-10 invisible origin-top-right absolute shadow-lg
           transition ease-out duration-300 transform opacity-0 translate-y-4 scale-80
           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`
        "
      >
        <div class="bg-white bg-opacity-80 shadow-xs">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <client-only>
              <nuxt-link
                v-for="sub in navObj.subCategories"
                :key="`${navObj.link}_${sub}`"
                :to="localePath(`${navObj.link}?s=${sub}`)"
                role="menuitem"
                class="block ps-4 pe-12 py-2 text-sm leading-5 text-gray-700 menu-item-hover"
              >
                {{ $t(`navbar.${sub}`) }}
              </nuxt-link>
            </client-only>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import navDataList from '@/constatnts/navData';
import { activeFilter$ } from '@/composables/useFilter';

export default defineComponent({
  setup() {
    return { navData: navDataList, currCategory: computed(() => activeFilter$.value.currCategory) };
  }
});
</script>

<style scoped>
.menu-item-hover:hover {
  @apply text-primary;
}
.active-category:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 0;
  background: #ad726f;
  border-radius: 5px;
}
</style>
