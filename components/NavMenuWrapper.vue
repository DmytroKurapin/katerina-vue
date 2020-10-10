<template>
  <nav>
    <NavMenuSmall class="lg:hidden flex self-start" />

    <NavMenuLarge class="hidden lg:flex" />
  </nav>
</template>

<script lang="ts">
import NavMenuLarge from '@/components/NavMenuLarge.vue';
import NavMenuSmall from '@/components/NavMenuSmall.vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  components: { NavMenuSmall, NavMenuLarge },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
