<template>
  <nav>
    <ul class="flex px-2 pt-2 pb-5 text-lg border-b border-gray-800 lg:border-b-0 lg:py-0 lg:px-0">
      <li v-for="navObj in navData" :key="navObj.link" class="relative px-10 py-1 text-gray-900 group menu-item-hover">
        <nuxt-link
          :to="localePath(navObj.link)"
          :class="{ 'pb-1 relative': true, 'underscored-label': currCategory === navObj.category }"
        >
          {{ $t(navObj.label) }}
        </nuxt-link>
        <div
          :class="
            `z-10 invisible origin-top-right absolute shadow-lg start-0
           transition ease-out duration-300 transform opacity-0 translate-y-4 scale-80
           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`
          "
        >
          <div class="shadow-xs">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu" class="whitespace-no-wrap">
              <client-only>
                <nuxt-link
                  v-for="sub in navObj.subCategories"
                  :key="`${navObj.link}_${sub}`"
                  :to="localePath(`${navObj.link}?s=${sub}`)"
                  role="menuitem"
                  class="py-2 mb-px text-sm leading-4 text-gray-700 bg-white menu-item-hover bg-opacity-95 pe-16 ps-10"
                >
                  {{ $t(`navbar.${sub}`) }}
                </nuxt-link>
              </client-only>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <slot />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import navDataList from '@/constants/navData';
import { activeFilter$ } from '@/composables/useFilter';

export default defineComponent({
  setup() {
    return { navData: navDataList, currCategory: computed(() => activeFilter$.value.currCategory) };
  }
});
</script>

<style scoped>
.menu-item-hover {
  @apply block;
}
.menu-item-hover:hover {
  @apply text-primary;
}
</style>
