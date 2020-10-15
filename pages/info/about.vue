<template>
  <div>
    {{ $t('footer.about') }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { setMeta as setMetaOnInfoPage } from '@/composables/useMetaOnInfoPages';

export default defineComponent({
  components: {},
  head: {},
  setup() {
    setMetaOnInfoPage({ page: 'about' });
    return {};
  }
});
</script>

<style scoped></style>
