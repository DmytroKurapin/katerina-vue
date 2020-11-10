<template>
  <span>
    <template v-for="(lang, idx) in languagesList">
      <nuxt-link
        :key="`lang_${idx}`"
        :to="switchLocalePath(lang.iso)"
        :dir="lang.iso === 'he' ? 'rtl' : null"
        class="flex"
      >
        <span :class="['flex', $i18n.locale === lang.iso ? 'items-center' : 'items-end']">
          <span v-if="$i18n.locale !== lang.iso" class="text-primary-light px-2">|</span>
          <span
            :class="{
              'underscored-label font-semibold': $i18n.locale === lang.iso
            }"
            class="relative text-sm text-gray-800 hover:text-primary"
          >
            {{ lang.label }}
          </span>
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
