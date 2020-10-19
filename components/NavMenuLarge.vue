<template>
  <ul class="px-2 pt-2 pb-5 lg:border-b-0 lg:py-0 lg:px-0 border-b border-gray-800">
    <nuxt-link v-for="navObj in navData" :key="navObj.link" :to="localePath(navObj.link)" class="relative group">
      <li :class="`block px-3 py-1 rounded menu-item-hover text-gray-900`">
        {{ $t(navObj.label) }}
      </li>
      <div
        :class="
          `z-10 invisible origin-top-right absolute w-56 rounded-md shadow-lg
           transition ease-out duration-300 transform opacity-0 translate-y-4 scale-80
           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`
        "
      >
        <div class="rounded-md bg-white shadow-xs">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <client-only>
              <nuxt-link
                v-for="sub in navObj.subCategories"
                :key="`${navObj.link}_${sub}`"
                :to="localePath(`${navObj.link}?s=${sub}`)"
                role="menuitem"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 menu-item-hover"
              >
                {{ $t(`navbar.${sub}`) }}
              </nuxt-link>
            </client-only>
          </div>
        </div>
      </div>
    </nuxt-link>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import navDataList from '@/constatnts/navData';

export default defineComponent({
  setup() {
    return { navData: navDataList };
  }
});
</script>

<style scoped>
.menu-item-hover:hover {
  @apply bg-primary-light text-gray-100;
}
</style>
