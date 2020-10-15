<template>
  <div>
    {{ $t('footer.terms_and_cond') }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { setMeta as setMetaOnInfoPage } from '@/composables/useMetaOnInfoPages';

export default defineComponent({
  components: {},
  setup() {
    setMetaOnInfoPage({ page: 'terms' });
    return {};
  }
});
</script>

<style scoped></style>
