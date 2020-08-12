<template>
  <div class="nav">
    <nuxt-link to="/">
      Katerina Kurapin
    </nuxt-link>

    <nav>
      <nuxt-link v-for="navObj in navData" :key="navObj.link" to="/wedding">
        {{ navObj.label }}
      </nuxt-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { NavData } from '@/types';

export default defineComponent({
  setup() {
    const navData: Array<NavData> = [
      { link: '/wedding', label: 'חתונה' },
      { link: '/mitzvah', label: 'בר\\בת מצווה' },
      { link: '/giftcard', label: 'שובר מתנה' }
    ];
    const posts = ref(null);

    return { posts, navData };
  }
});
</script>

<style scoped></style>
