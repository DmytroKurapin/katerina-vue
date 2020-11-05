<template>
  <span>
    <template v-for="(lang, idx) in languagesList">
      <nuxt-link
        :key="`lang_${idx}`"
        :to="switchLocalePath(lang.iso)"
        :class="[
          $i18n.locale == lang.iso ? 'bg-gray-300' : 'bg-white',
          idx === 0 ? 'rounded-s-md' : 'rounded-e-md',
          `px-2 py-0 border border-gray-300 text-sm font-bold text-gray-800 hover:text-gray-500 focus:border-blue-300`
        ]"
      >
        <span :dir="lang.iso === 'he' ? 'rtl' : null">
          {{ lang.label }}
        </span>
      </nuxt-link>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const languagesList = [
      { label: "עב'", iso: 'he' },
      { label: 'EN', iso: 'en' }
    ];
    return { languagesList };
  }
});
</script>

<style scoped>
.menu-item-hover:hover {
  @apply bg-primary-light text-gray-100;
}
</style>
