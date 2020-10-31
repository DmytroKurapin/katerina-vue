<template>
  <div>
    {{ $t('footer.faq') }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { setMeta as setMetaOnInfoPage } from '@/composables/useMetaOnInfoPages';

export default defineComponent({
  components: {},
  head: {},
  setup() {
    setMetaOnInfoPage({ page: 'faq' });
    return {};
  }
});
</script>

<style scoped></style>
