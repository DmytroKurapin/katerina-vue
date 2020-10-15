<template>
  <div>
    {{ $t('footer.contacts') }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { setMeta as setMetaOnInfoPage } from '@/composables/useMetaOnInfoPages';

export default defineComponent({
  components: {},
  setup() {
    setMetaOnInfoPage({ page: 'contacts' });
    return {};
  }
});
</script>

<style scoped></style>
